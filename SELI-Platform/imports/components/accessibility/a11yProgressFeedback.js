import React, {useState, useEffect, useCallback} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';

//props{
//	a11yFields: {name: string, is_a11y: boolean}
//}

export default function A11YProgressFeedback(props){
	const a11yCOLOR = {
		fail : '#ff9800',
		poor: '#ffc107',
		average: '#fbc02d',
		good: '#9ccc65',
		valid: '#66bb6a',
	};
	const [progressColor, setProgressColor] = React.useState({color: a11yCOLOR.fail});
	const [progressText, setProgressText] = React.useState('0');
	const [progressPercent, setProgressPercent] = React.useState(0);
	const [a, setReuseprogress] = React.useState(0);
	



	useEffect(() => {
		//console.log("propiedades----->", props.item.accessibility.isA11Y, props.a11yFields)
		updateProgress()

			 /*  if(props.item.accessibility.dataField!=undefined){
				if(props.item.accessibility.dataField.longDescription!="" && props.item.accessibility.dataField.shortDescription!=""){				
					let propsCopy={ ...props };
						propsCopy.item.accessibility.isA11Y[1].is_a11y=true
						propsCopy.item.accessibility.isA11Y[0].is_a11y=true
						console.log("propiedadesX2----->", propsCopy.item.accessibility, propsCopy.item.accessibility.isA11Y[0].is_a11y, propsCopy.item.accessibility.isA11Y[1].is_a11y)
						ReuseProgress(propsCopy) 
					
				} else if (props.item.accessibility.dataField.longDescription!=""){
					let propsCopy={ ...props };
						propsCopy.item.accessibility.isA11Y[0].is_a11y=true
						propsCopy.item.accessibility.isA11Y[1].is_a11y=false
						//console.log("propiedadesX2----->", propsCopy.item.accessibility, propsCopy.item.accessibility.isA11Y[0].is_a11y, propsCopy.item.accessibility.isA11Y[1].is_a11y)
						ReuseProgress(propsCopy)

				}else if (props.item.accessibility.dataField.shortDescription!=""){
					let propsCopy={ ...props };
						propsCopy.item.accessibility.isA11Y[0].is_a11y=false
						propsCopy.item.accessibility.isA11Y[1].is_a11y=true
						//console.log("propiedadesX2----->", propsCopy.item.accessibility, propsCopy.item.accessibility.isA11Y[0].is_a11y, propsCopy.item.accessibility.isA11Y[1].is_a11y)
						ReuseProgress(propsCopy)

				}
			}   */
 
	
		

	
	},[props.a11yFields]);




	function ReuseProgress(){
		//console.log("propiedadescambiadaswwww----->", copy.item.accessibility)
		if (props.item.accessibility.isA11Y!=undefined){
			let max = props.item.accessibility.isA11Y.length;
			let a11y = props.item.accessibility.isA11Y.filter( el => el.is_a11y ).length;
			let a11yPercentage = a11y * 100 / max;
			setProgressPercent(a11yPercentage);
			setProgressText(a11y + '/' + max);
			props.getAccessibilityPercentage(a11yPercentage)
			if (a11yPercentage < 20){
				setProgressColor({color: a11yCOLOR.fail});
			}
			else if (a11yPercentage < 40 ){
				setProgressColor({color: a11yCOLOR.poor});
			}
			else if (a11yPercentage < 60 ){
				setProgressColor({color: a11yCOLOR.average});
			}
			else if (a11yPercentage < 80 ){
				setProgressColor({color: a11yCOLOR.good});
			}
			else{
				setProgressColor({color: a11yCOLOR.valid});
			}

		}
	}

	function updateProgress(){
			console.log("update progres bar", props.a11yFields)
			let a11y =0
			let a11yPercentage =0
		let max =props.a11yFields.length;
		if(max===16){
			a11y = props.a11yFields.filter( el => el.is_a11y ).length;
			a11yPercentage = a11y * 100 / (max-1);
			setProgressPercent(a11yPercentage);
			console.log("a11y",a11y, max-1,a11yPercentage)
			setProgressText(a11y + '/' + (max-1));
		}else{
			 a11y = props.a11yFields.filter( el => el.is_a11y ).length;
			 a11yPercentage = a11y * 100 / max;
			setProgressPercent(a11yPercentage);
			setProgressText(a11y + '/' + max);
			console.log("el texto",progressText)
		}
		


		props.getAccessibilityPercentage(a11yPercentage)
		if (a11yPercentage < 20){
			setProgressColor({color: a11yCOLOR.fail});
		}
		else if (a11yPercentage < 40 ){
			setProgressColor({color: a11yCOLOR.poor});
		}
		else if (a11yPercentage < 60 ){
			setProgressColor({color: a11yCOLOR.average});
		}
		else if (a11yPercentage < 80 ){
			setProgressColor({color: a11yCOLOR.good});
		}
		else{
			setProgressColor({color: a11yCOLOR.valid});
		}
	}

	
	return(
		<React.Fragment>
			<Tooltip  title={'Accessibility progress ' + progressText} placement='right-start'>
			<div className='accessibility-percentage-container'>
				
				<CircularProgress style={progressColor}
					//color={progressColor}
					variant='static'
					value={progressPercent}
					thickness={7.5}
					size={80}
					className='accessibility-progress'
				/>
				<p className='accessibility-percentage-value'>{progressText}</p>
			</div>
			</Tooltip>
		</React.Fragment>
	);
}
