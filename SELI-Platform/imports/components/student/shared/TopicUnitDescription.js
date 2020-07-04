import React, {useState} from 'react'
import './style.css'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ForumIcon from '@material-ui/icons/Forum';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';

export default function CourseContent(props) {
    console.log("props en content" ,props)
    const [course, setCourse]=useState(props.data)
    const [coursePlan, setCoursePlan]=useState(props.coursePlan)
    const [taskNumberActivities, setTaskNumberActivities]=useState({
        quiz:0,
        activity:0,
        forum:0
    })

    const TotalofQuizTypeUnit=(unit)=>{
            let quiz=0
            let actividad=0
            let forum=0
            course[unit].lessons.map((lesson,index)=>{
                lesson.activities.map((activity,indextool)=>{
                    if(activity.type!=undefined){
                        if(activity.type=='3'){
                            quiz+=1
                         }else if (activity.type=='4'){
                            forum+=1
                         }else if(activity.type=='1'){
                            actividad+=1
                         }
                    }
                    })
            })
       
        return {quiz, actividad, forum}    
    }

    const TotalofQuizTypeTopic=(unit)=>{
            let quiz=0
            let actividad=0
            let forum=0
            
            course[unit].activities.map((activity,indextool)=>{
                if(activity.type!=undefined){
                    if(activity.type=='3'){
                        quiz+=1
                        }else if (activity.type=='4'){
                        forum+=1
                        }else if(activity.type=='1'){
                        actividad+=1
                        }
                }
            })
           
       
        return {quiz, actividad, forum} 

    }
    
    return (
        <div>
            {
            course.map((topic, indexUnit)=>(
                <div>
                    <div className='crnheading'>
                        <h3 id="content-topic-n" tabIndex="-1">{topic.title}</h3>
				    </div>
                    
                    <div>
                        <div className='crnheading'>
                            <h3 >Learning Goals</h3>
                        </div>
                        <div className='descriptiontext' >{topic.learnGols}</div>
                    </div>

               
                    <div>
                        <div className='crnheading'>
                            <h3> Prerequisites</h3>
                        </div>
                        <div className='descriptiontext'>{topic.preKnowledge}</div>
                    </div>
                    

                    <div>
                        <div className='crnheading'>
                            <h3>Content</h3>
                        </div>
                        <div className='descriptiontext'>{topic.mainContent}</div>
                    </div>

                    <div>
                    <div className='crnheading'>
                        <h3>Materials</h3>
                    </div>
                        {
                            (coursePlan.guidedCoursePlan==='guided'  && coursePlan.courseTemplate==='without' && coursePlan.courseStructure==='unit')?       
                            <div>
                                {
                                    topic.lessons.map((lesson,index)=>(
                                        <div key ={index}>
                                            <div className='crnheading'>
                                                <h3>{lesson.title}</h3>
                                            </div>
                                            <ul className='resources'>
                                                {lesson.tools.map((tool,indextool)=>(//the resources of the lesson
                                                    tool.checked===true?
                                                        <li  key={indextool}>{tool.label}</li>
                                                    :
                                                    undefined
                                                ))}
                                            </ul>
                                            <div className='crnheading'>
                                              <h3>Tasks list of {lesson.title}</h3>
                                            </div>
                                            <ul >
                                                {
                                                    topic.lessons[index].activities.map((activity,indextool)=>(
                                                        <li key={indextool}> 
                                                            {activity.activity}
                                                        </li> 
                                                    ))
                                                }
                                            </ul>  
                                        </div>      
                                    ))
                                }
                            </div>
                            :
                            undefined                        
                        }
                        {
                            (coursePlan.guidedCoursePlan==='guided'  &&
                             (coursePlan.courseTemplate==='without' || coursePlan.courseTemplate==='spiral' 
                             || coursePlan.courseTemplate==='consistent' || coursePlan.courseTemplate==='toyBox' ) && 
                             coursePlan.courseStructure==='topic')?       
                            <div>
                                { 
                                    <div>
                                        <ul className='resources'>
                                                {topic.tools.map((tool,indextool)=>(//the resources of the lesson
                                                    tool.checked===true?
                                                        <li  key={indextool}>{tool.label}</li>
                                                    :
                                                    undefined
                                                ))}
                                            </ul>
                                            <div className='crnheading'>
                                              <h3>Tasks list of {topic.title}</h3>
                                            </div>
                                            <ul >
                                                {
                                                    topic.activities.map((activity,indextool)=>(
                                                        <li  key={indextool}> 
                                                            {activity.activity}
                                                        </li> 
                                                    ))
                                                }
                                        </ul>

                                    </div> 
                                }
                            </div>
                            :
                            undefined                        
                        }
                    </div>


                    <div>
                    
                        <div>
                            <div id='topic-n-readings' className='crnheading'>
                                <h3>SuplemantaryMaterial </h3>
                            </div>
                            {
                                (coursePlan.guidedCoursePlan==='guided'  && coursePlan.courseTemplate==='without' && coursePlan.courseStructure==='unit')?       
                                <div>
                                    {
                                        topic.lessons.map((lesson,index)=>(
                                            lesson.tools[4].checked===true?
                                            <ul className='resources' key={index}>
                                                {lesson.tools[4].items.map((item,index)=>(
                                                        <li key={index}>{item.title}</li>    
                                                ))} 
                                            </ul>
                                            :
                                            undefined
                                        ))
                                    }
                                </div>
                                :
                                undefined                        
                            }
                            {
                                (coursePlan.guidedCoursePlan==='guided'  &&
                                (coursePlan.courseTemplate==='without' || coursePlan.courseTemplate==='spiral' 
                                || coursePlan.courseTemplate==='consistent' || coursePlan.courseTemplate==='toyBox' ) && 
                                coursePlan.courseStructure==='topic')?       
                                <div>
                                    { 
                                            topic.tools[4].checked===true?
                                                <ul className='resources'>
                                                    {topic.tools[4].items.map((item,index)=>(
                                                            <li key={index}>{item.title}</li>    
                                                    ))} 
                                                </ul>
                                            :
                                            undefined
                                    }
                                </div>
                                :
                                undefined                        
                            }
                        </div>
                    </div>


                    <div>
                        <div className='crnheading'>
                            <h3 id="topic-n-assess" tabIndex="-1">
                                Assessment Methods
                            </h3>
                        </div>
                        <ul className='resources'>
                            <li >
                                <MenuBookIcon/>
                                {" "}
                                Total of Quiz tasks:{" "} 
                                {
                                    (coursePlan.guidedCoursePlan==='guided'  &&
                                     coursePlan.courseTemplate==='without' &&
                                     coursePlan.courseStructure==='unit')? 
                                     TotalofQuizTypeUnit(indexUnit).quiz
                                     :
                                     TotalofQuizTypeTopic(indexUnit).quiz
                                      
                                }
                              
                            </li>
                            <li >
                                <AssignmentOutlinedIcon/>
                                {" "}
                                Total of Activities:{" "} 
                                {
                                    (coursePlan.guidedCoursePlan==='guided'  &&
                                     coursePlan.courseTemplate==='without' &&
                                     coursePlan.courseStructure==='unit')? 
                                     TotalofQuizTypeUnit(indexUnit).actividad
                                     :
                                     TotalofQuizTypeTopic(indexUnit).actividad
                                      
                                }
                            </li>
                            <li >
                                <ForumIcon/>
                                {" "}
                                Total of Forums: {" "}
                                {
                                    (coursePlan.guidedCoursePlan==='guided'  &&
                                     coursePlan.courseTemplate==='without' &&
                                     coursePlan.courseStructure==='unit')? 
                                     TotalofQuizTypeUnit(indexUnit).forum
                                     :
                                     TotalofQuizTypeTopic(indexUnit).forum
                                      
                                }
                            </li>
                        </ul>
                    </div>
                    
                       
                </div>
             ))
            
        }   
        </div>
    )
}
