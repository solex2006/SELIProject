const {google} = require('googleapis');
const keys = require('./keys');
const oauth2Client = new google.auth.OAuth2(
	keys.google.clientID, // CLIENT_ID
	keys.google.clientSecret, // CLIENT_SECRET
	"http://localhost:5000/oauth2callback"); // Callback URL
const fitness = google.fitness('v1');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const bodyParser = require("body-parser");
const jwtDecode = require('jwt-decode');
const async = require('async');
const dateFormat = require('dateformat');
const moment = require('moment');
const _ = require('lodash');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
var Profile = require('./model/user');
var stepdata = require('./model/stepdata');
var sleepdata = require('./model/sleepdata');
var caloriesdata = require('./model/caloriesdata');
var courseName = require('./model/courseName');
var StudyG = require('./model/studygoal');
var HealthG = require('./model/healthgoal');
var main = require('./model/main');
var courses = require('./model/courses');
var activities = require('./model/activities');
var date= dateFormat(new Date(), 'isoDateTime');
var cors = require('cors');
const { count } = require('./model/main');
const { update, values } = require('lodash');
var StartTime = parseInt(moment().unix() * 1000000000);
var endTime = parseInt(moment().set({ "hour": 0, "minute": 0, "second": 0}).unix() * 1000000000);
const scopes = [
	'profile',
	"email",
	'https://www.googleapis.com/auth/fitness.activity.read',
];
var url = 'mongodb://mongodb:27017/newdb';
mongoose.connect(url, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});
app.use(cors());
app.use(bodyParser.json());

app.get('/user', (req, res, done) => {
	if (checkCredentials(oauth2Client)) {
		var Token = req.query.ex;
		var data = jwtDecode(Token);
		Sub = data.sub;
		res.redirect("http://localhost:3000/Deshboard");
		googlefit(res, data);
		getRoutes(data);
		postRoute(data);
	} else {
		var url = oauth2Client.generateAuthUrl({
	    	access_type: 'offline', // Offline, otherwise we won't get a token
			scope: scopes // Fitness Scopes-
	  	}); res.redirect(url);
	}
});
app.get('/oauth2callback', (req, res) => {
	// The appropriate code gets returned by OAuth2
	var code = req.query.code;
	oauth2Client.getToken(code, (err, token) => {
		oauth2Client.setCredentials(token);
		res.redirect('/user?ex='+ token.id_token);
	});
});
//posting Route
function postRoute(data) {
	app.post('/courseName', (req, res, next) => {
		res.app.set('bodyname', req.body)
		res.app.set('courseid', req.body.id)
		app.get("/studentData", (req, res, next) => {
			var myData = {retrievedData : app.get('bodyname')};
			var myid = {retData : app.get('courseid')};
			var courseid = myid.retData;
			var values = myData.retrievedData;
			StudyG.findOne({uid: data.sub, "courseId": courseid}).sort({"StartDate":-1})
			.then(doc=>{
				var stDate = doc.StartDate;
				var start = moment(stDate);
				var end = moment(date);
				var total_day = end.diff(start, "days");
				var dataVal = {
					doc,
					total_day,
					values
				};
				res.json(dataVal);
				
			})
			.catch(err =>console.log(err));
		});
		app.post('/studyPlan', (req, res, next) => {
			var myid = {retData : app.get('courseid')};
			var courseid = myid.retData;
			new StudyG  ({
				uid: data.sub,
				courseId: courseid,
				StartDate: new Date(Date.now()).toISOString(),
				activity: req.body.activity,
				progress: req.body.progress,
				duration: req.body.duration,
				timeline: req.body.timeline,
			}).save();
		});
		});
	app.post('/healthPlan', (req, res, next) => {
		new HealthG  ({
			uid: data.sub,
			StartDate: new Date(Date.now()).toISOString(),
			Walk_g: req.body.walk,
			Sleep_g: req.body.sleep,
			Calories_g: req.body.calories,
		}).save();
	});
}
//Get Routes
app.get('/test', (req, res)=> {
	console.log('working')
});
function getRoutes(data) {
	app.get("/activity", (req, res, next) => {
		main.findOne({'emails.address': data.email})
		.populate('profile.courses.courseId')
		.populate('profile.courses.toResolve.activityId')
		.exec()
		.then ( doc =>{
			var val =[];
			len = doc.profile.courses.courseId.length;

			for (i=0; i<len; i++){
				var title = (doc.profile.courses.courseId[i].title);
				var id = (doc.profile.courses.courseId[i].id);
				var progress = (doc.profile.courses.progress[i]);
				var duration = (doc.profile.courses.courseId[i].duration);
				var count = 0;
				var fscount = 0;
				var sc = doc.profile.courses.toResolve[i];
				var lens = doc.profile.courses.toResolve[i].length;
				var datas = [];
				for (j=0; j<lens; j++){
					var dj= sc[j].resolved;
					datas.push(dj);
					if (datas[j] == true) {
						count +=1;
					}else{fscount +=1;}
				}
				var task_complate = count;
				var task_incomplate = fscount;
				obj = {
					title,
					id,
					progress,
					duration,
					task_complate,
					task_incomplate
				};
				val.push(obj);
			}
			res.json(val);
		})
		.catch(err =>
			console.log(err));
	});
	app.get("/fitdata", (req, res, next) => {
		Promise.all([
			stepdata.findOne({uid: data.sub}).sort({"StartDate":-1}),
			sleepdata.findOne({uid: data.sub}).sort({"StartDate":-1}),
			caloriesdata.findOne({uid: data.sub}).sort({"StartDate":-1})
		])
		.then(doc => {
			doc !== null?res.json(doc): res.json(0)
		})
		.catch(err =>console.log(err));
	});
	app.get("/healthgoal", (req, res, next) => {
		HealthG.findOne({uid:data.sub}).sort({"StartDate":'-1'})
		.exec()
		.then(doc=>{
			doc !== null?res.json(doc): res.json(0)
		})
		.catch(err =>
			console.log(err)
		);
	});
}
//Steps Data
function googlefit(res, data) {
	var totalStep;
	var Sleep;
	var Cal = 0;
	var types = "derived:com.google.";
	var src = "com.google.android.gms";
	const step= types+"step_count.delta:"+src+":estimated_steps";
	const calories = types+"calories.expended:"+src+":merge_calories_expended";
	const sleep = types+"activity.segment:"+src+":merge_activity_segments";
	fitness.users.dataSources.datasets.get({ userId: "me", auth: oauth2Client, dataSourceId: step, datasetId: StartTime + "-" + endTime}, function(err, _fitness) {
		if (err) {
			console.log("An error occured", err);
			return;
		}
		totalStep = 0;
		async.each(_fitness.data.point, function(item, callback) {
			totalStep += item.value[0].intVal;
			callback();
		});
		new stepdata({
			uid: data.sub,
			StartDate: date,
			Step: totalStep
		}).save();
	});
	//Sleep Data

	fitness.users.dataSources.datasets.get({ userId: "me", auth: oauth2Client, dataSourceId: sleep, datasetId: StartTime + "-" + endTime}, function(err, _fitness, Sleep) {
		if (err) {
			console.log("An error occured", err);
			return;
		}
		var num = 0;
		async.each(_fitness.data.point, function(item, callback) {
				// 0 - 29 SLEEP_AWAKE
				// 30 - 109 SLEEP
			if (item.value[0].intVal >= 30 && item.value[0].intVal <= 109){
				num += (((item.endTimeNanos)-(item.startTimeNanos))/1000000000)/3600;
				Sleep =  Math.round(num);
			}
			callback();
		});
		new sleepdata({
			uid: data.sub,
			StartDate: date,
			Sleep: Sleep
		}).save();
	});
 // calories Data
	fitness.users.dataSources.datasets.get({ userId: "me", auth: oauth2Client, dataSourceId: calories, datasetId: StartTime + "-" + endTime}, function(err, _fitness) {
		if (err) {
			console.log("An error occured", err);
			return;
		}
		async.each(_fitness.data.point, function(item, callback) {
			Cal += item.value[0].fpVal;
			Cal = Math.round(Cal);
			callback();
		});
		new caloriesdata({
			uid: data.sub,
			StartDate: date,
			Calories: Cal
		}).save();
	});
}
function checkCredentials(client) {
	// Check if credentials object is empty.
	if (!_.isEmpty(client.credentials)) {
		return true;
	} else {
		return false;
	}
}
http.listen(PORT, () => {
  console.log(`This app is listening on port ${PORT}`);
});
