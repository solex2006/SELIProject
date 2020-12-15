import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Courses } from '../../../lib/CourseCollection';
import 
{ 
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Menu,
    AppBar,
    Toolbar,
    Typography
} from '@material-ui/core';
import BounceLoader from 'react-spinners/BounceLoader';

export default class TeacherDashboard extends React.Component {
    constructor(props) {
        super();

        this.state = {
            title: "",
            menuOptions: {
                courses: [ 
                    { _id: "1", title: "ALL COURSES" } 
                ],
                time: [
                    { _id: "1", title: "ANY TIME" },
                    { _id: "2", title: "Past 24 hours" },
                    { _id: "3", title: "Past week" },
                    { _id: "4", title: "Past month" }, 
                    { _id: "5", title: "Past year"}
                ]
            },
            selectedMenuOption: {
                selectedCourse: 0,
                selectedTime: 0
            },
            openMenuOption: {
                openCourseMenu: false,
                openTimeMenu: false
            },
            iframeUrl: '',
            loading: true
        }
    }

    componentDidMount(){
        document.title="Teacher Dashboard"
        this.setState({loading: true});
        this.loadCourses();
        this.generateDashboardUrl();
        this.setState({loading: false});
    }

    generateDashboardUrl(){
        let iframeUrl;
        let user = this.props.user;
        if (user) {
            let jwt = require("jsonwebtoken");
            let METABASE_SITE_URL = Meteor.settings.public.METABASE_DOMAIN;
            let METABASE_SECRET_KEY = Meteor.settings.public.METABASE_KEY;
            let token;
            let payload;
            let selectedMenuOption = this.state.selectedMenuOption;

            if(selectedMenuOption.selectedCourse === 0){
                payload = {
                    resource: { dashboard: 2 },
                    params: {
                    "id": Meteor.userId()
                    },
                    exp: Math.round(Date.now() / 1000) + (10 * 60)
                };
            }
            else{
                payload = {
                    resource: { dashboard: 3 },
                    params: {
                        "teacher_id": Meteor.userId(),
                        "course_id": this.state.menuOptions.courses[selectedMenuOption.selectedCourse]._id
                    },
                    exp: Math.round(Date.now() / 1000) + (10 * 60)
                };
            }
            
            token = jwt.sign(payload, METABASE_SECRET_KEY);
            iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#bordered=true&titled=true";
            this.setState({ iframeUrl : iframeUrl });
        }
    }

    loadCourses(){
        Array.prototype.insert = function ( index, item ) {
            this.splice( index, 0, item );
        };
        Tracker.autorun(() => {
            let username = this.props.user.username;
            let myCourses = Courses.find({ createdBy: username }).fetch();
            myCourses.insert(0, this.state.menuOptions.courses[0]);
            let menuOptions = this.state.menuOptions;
            menuOptions.courses = myCourses;
            this.setState({ menuOptions: menuOptions });
        });
    }

    handleClickListItem(event, menuIndex){
        let openMenuOption = this.state.openMenuOption;
        switch(menuIndex){
            case 0:
                openMenuOption.openCourseMenu = !openMenuOption.openCourseMenu;
                openMenuOption.openTimeMenu = false;
                break;
            case 1:
                openMenuOption.openTimeMenu = !openMenuOption.openTimeMenu;
                openMenuOption.openCourseMenu = false;
                break;
            default:
                break;
        }
        this.setState({ openMenuOption: openMenuOption });
    }

    handleMenuItemClick(event, index, menuIndex){
        let openMenuOption = this.state.openMenuOption;
        let selectedMenuOption = this.state.selectedMenuOption;
        openMenuOption.openCourseMenu = false;
        openMenuOption.openTimeMenu = false;
        switch(menuIndex){
            case 0:
                selectedMenuOption.selectedCourse = index;
                break;
            case 1:
                selectedMenuOption.selectedTime = index;
                break;
            default:
                break;
        }
        this.setState(
        {
            openMenuOption: openMenuOption,
            selectedMenuOption: selectedMenuOption
        }, () => 
        {
            this.generateDashboardUrl();
        });
    }

    handleMenuClose(){
        let openMenuOption = this.state.openMenuOption;
        openMenuOption.openCourseMenu = false;
        openMenuOption.openTimeMenu = false;
        this.setState({ openMenuOption: openMenuOption });
    }

    isMenuOpen(menuIndex){
        let open = false;
        switch(menuIndex){
            case 0:
                open = this.state.openMenuOption.openCourseMenu;
                break;
            case 1:
                open = this.state.openMenuOption.openTimeMenu;
                break;
            default:
                open = false;
                break;
        }
        return open;
    }

    getSelectedIndex(menuIndex){
        let selectedIndex = 0;
        switch(menuIndex){
            case 0:
                selectedIndex = this.state.selectedMenuOption.selectedCourse;
                break;
            case 1:
                selectedIndex = this.state.selectedMenuOption.selectedTime;
                break;
            default:
                break;
        }
        return selectedIndex;
    }

    getMenuItems(menuIndex){
        let items = [];
        switch(menuIndex){
            case 0:
                items = this.state.menuOptions.courses;
                break;
            case 1:
                items = this.state.menuOptions.time;
                break;
            default:
                break;
        }
        return items;
    }

    getFilterList(menuId, menuIndex){
        return (
            <List>
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls={menuId}
                    onClick={event => this.handleClickListItem(event, menuIndex)}
                >
                <ListItemText primary=
                    {this.getMenuItems(menuIndex)[this.getSelectedIndex(menuIndex)].title}
                />
                </ListItem>
                <Menu
                    id={menuId}
                    keepMounted
                    open={this.isMenuOpen(menuIndex)}
                    onClose={this.handleMenuClose.bind(this)}
                >
                        {this.getMenuItems(menuIndex).map((course, index) => (
                    <MenuItem
                        key={course._id}
                        onClick={(event) => this.handleMenuItemClick(event, index, menuIndex)}
                        selected={index ===  this.getSelectedIndex(menuIndex) }
                    >
                        {course.title}
                    </MenuItem>
                    ))}
                </Menu>
            </List>
        );
    }

    render() {
        return (
        <div className="metabase-main-container">
        {
        this.state.loading ?
            <div className="loading-library-container">
                <div className="loading-library-row">
                    <div className="loading-library-container">
                        <BounceLoader color={getComputedStyle(document.documentElement).getPropertyValue('--primary')}/>
                    </div>
                    <p className="loading-library-text">LOADING TEACHER DASHBOARD</p>
                </div>
            </div>
        :
            <React.Fragment>
                <div>
                    <AppBar position="static" className="metabase-appbar">
                        <Toolbar className="metabase-toolbar">
                            <Typography tabIndex='0' variant="h6">
                                Filter by:
                            </Typography>
                            { this.getFilterList("course-menu", 0) }
                        </Toolbar>
                    </AppBar>
                    <iframe className="metabase-main-frame" src={this.state.iframeUrl}></iframe>
                </div>
            </React.Fragment>
        }
        </div>
        );
    }
}