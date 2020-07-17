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
    
   

    const TotaloFreeTopic=(topico)=>{
          // console.log("props en TotaloFreeTopic", props) 
      let text=0
      let image=0
      let audio=0
      let video=0
      let activity=0
      let quiz=0
      
      props.program[topico].items.map((item,indexitem)=>{  
            if(item.type==='text'){
               text+=1
            }else if(item.type==='image'){
               image+=1
            }else if(item.type==='video'){
               video+=1
            }else if(item.type==='audio'){
               audio+=1
            }else if(item.type==='activity'){
               activity+=1
            }else if(item.type==='quiz'){
               quiz+=1
            }
         })
      return [text, image, audio, video, activity, quiz]    
    }

    const TotaloFreeUnit=(unit)=>{
    // console.log("props en TotaloFreeTopic", props) 
    let text=0
    let image=0
    let audio=0
    let video=0
    let activity=0
    let quiz=0

    props.program[unit].items.map((item,indexitem)=>{  
        if(item.type==='text'){
           text+=1
        }else if(item.type==='image'){
           image+=1
        }else if(item.type==='video'){
           video+=1
        }else if(item.type==='audio'){
           audio+=1
        }else if(item.type==='activity'){
           activity+=1
        }else if(item.type==='quiz'){
           quiz+=1
        }
    })
    
    props.program[unit].lessons.map((lesson,index)=>{
        lesson.items.map((item,indexitem)=>{  
            if(item.type==='text'){
               text+=1
            }else if(item.type==='image'){
               image+=1
            }else if(item.type==='video'){
               video+=1
            }else if(item.type==='audio'){
               audio+=1
            }else if(item.type==='activity'){
               activity+=1
            }else if(item.type==='quiz'){
               quiz+=1
            }
        })
    })
    
    //console.log("TotaloFreeUnit",[text, image, audio, video, activity, quiz])
    return [text, image, audio, video, activity, quiz]    
  }

 

    return (
        <div>
            {
            course.map((topic, indexUnit)=>(
                <div>
                    <div className='crnheading'>
                        <h3 id="content-topic-n" tabIndex="-1">{topic.title}</h3>
                    </div>
                    {
                        coursePlan.guidedCoursePlan!='free' ?
                        <div>
                             
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
                        </div>
                        
                        :
                        undefined
                    }
                   
                    
                    {
                        coursePlan.guidedCoursePlan!='free' ?
                        <div>
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
                        </div>
                        :
                        undefined
                    }

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
                                     coursePlan.courseTemplate==='without'   &&
                                     coursePlan.courseStructure==='unit')? 
                                     TotalofQuizTypeUnit(indexUnit).quiz
                                     :
                                    (coursePlan.guidedCoursePlan==='free'    &&
                                     coursePlan.courseTemplate==='without'   &&
                                     coursePlan.courseStructure==='topic')?
                                     TotaloFreeTopic(indexUnit)[5]
                                     :
                                     (coursePlan.guidedCoursePlan==='free'   &&
                                     coursePlan.courseTemplate==='without'   &&
                                     coursePlan.courseStructure==='unit')?
                                     TotaloFreeUnit(indexUnit) [5]
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
                                    (coursePlan.guidedCoursePlan==='free'  &&
                                     coursePlan.courseTemplate==='without' &&
                                     coursePlan.courseStructure==='topic')?
                                     TotaloFreeTopic(indexUnit)[4]
                                     :
                                     (coursePlan.guidedCoursePlan==='free'   &&
                                     coursePlan.courseTemplate==='without'   &&
                                     coursePlan.courseStructure==='unit')?
                                     TotaloFreeUnit(indexUnit)[4]
                                     :
                                     TotalofQuizTypeTopic(indexUnit).actividad
                                      
                                }
                            </li>

                            {
                                (coursePlan.guidedCoursePlan!='free')? 
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
                                    :
                                    undefined
                            }
                            {
                                (coursePlan.guidedCoursePlan==='free'   &&
                                coursePlan.courseTemplate==='without'   &&
                                (coursePlan.courseStructure==='topic'))? 
                                <li >
                                    <ForumIcon/>
                                    {" "}
                                    Total of Readings: {" "} {TotaloFreeTopic(indexUnit)[0]}
                                </li>

                                :
                                undefined
                            }
                            {
                                (coursePlan.guidedCoursePlan==='free'   &&
                                coursePlan.courseTemplate==='without'   &&
                                (coursePlan.courseStructure==='unit'))? 
                                <li >
                                    <ForumIcon/>
                                    {" "}
                                    Total of Readings: {" "} {TotaloFreeUnit(indexUnit)[0]}
                                </li>

                                :
                                undefined
                            }
                        </ul>
                    </div>
                </div>
            
            ))
            
        }   
        </div>
    )
}
