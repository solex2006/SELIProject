import React, {useState} from 'react'
import './style.css'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ForumIcon from '@material-ui/icons/Forum';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
export default function CourseContent(props) {
    console.log("props en Content----->" ,props)
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

   const TotalofResources=(unit)=>{
      let audios=0
      let games=0
      let images=0
      let presentations=0
      let Supplementary =0
      let videos=0
      
      if(course[unit].tools[0].checked===true && course[unit].tools[0].items!=undefined){
         audios=course[unit].tools[0].items.length;
      } if(course[unit].tools[1].checked===true && course[unit].tools[1].items!=undefined){
         games=course[unit].tools[1].items.length;
      } if(course[unit].tools[2].checked===true && course[unit].tools[2].items!=undefined){
         images=course[unit].tools[2].items.length;
      } if(course[unit].tools[3].checked===true && course[unit].tools[3].items!=undefined){
         presentations=course[unit].tools[3].items.length;
      } if(course[unit].tools[4].checked===true && course[unit].tools[4].items!=undefined){
         Supplementary=course[unit].tools[4].items.length;
      }if(course[unit].tools[5].checked===true && course[unit].tools[5].items!=undefined){
         videos=course[unit].tools[5].items.length;
      }
      return {audios, games, images, presentations, Supplementary, videos} 
   }

   const TotalofResourcesLessons=(unit, lesson)=>{
      let games=0
      let presentations=0
      let Supplementary =0
      if(course[unit].lessons[lesson].tools[1].checked===true && course[unit].lessons[lesson].tools[1].items!=undefined){
         
         games=course[unit].lessons[lesson].tools[1].items.length;

      }if(course[unit].lessons[lesson].tools[3].checked===true && course[unit].lessons[lesson].tools[3].items!=undefined){
         presentations=course[unit].lessons[lesson].tools[3].items.length;
         console.log("presentaciones",presentations)
      }if(course[unit].lessons[lesson].tools[4].checked===true && course[unit].lessons[lesson].tools[4].items!=undefined){
         Supplementary=course[unit].lessons[lesson].tools[4].items.length;
      }
      if(games===undefined){games=0} else if(presentations===undefined){presentations=0}else if(Supplementary===undefined){Supplementary=0}
      return {games, presentations, Supplementary} 

   }



    
    return (
        <div>
            {
            course.map((topic, indexUnit)=>(
            <div key={indexUnit}>

               <div> 
                  {
                     (coursePlan.guidedCoursePlan==='guided'  &&
                     (coursePlan.courseTemplate==='without' || coursePlan.courseTemplate==='spiral' 
                     || coursePlan.courseTemplate==='consistent' || coursePlan.courseTemplate==='toyBox' ) && 
                     coursePlan.courseStructure==='topic')?    

                     <div className='crnheading'>
                        <section aria-label="TOPIC 1: Introduction to ISD">
                           <div className='crnheading'><h3 id="content-topic-n" tabIndex="-1">TOPIC: {' '+(parseInt(indexUnit)+1)}: {topic.title}</h3></div>
                           <div className='descriptiontext'>{topic.mainContent}</div>
                           
                           <div className='previewcontent'>
                           <CollectionsBookmarkIcon />
                              <span className='boxResource'>Games: {TotalofResources(indexUnit).games} </span>
                              <span className='boxResource'>Presentations: {TotalofResources(indexUnit).presentations} </span>
                              <span className='boxResource'>Readings: {TotalofResources(indexUnit).Supplementary} </span>
                              <span className='boxResource'>Activities: {course[indexUnit].activities.length} </span>
                           </div>
                           
                        </section>
                     </div>
                     :
                     undefined                        
                  }
               </div>
               
                
               <div>
                  {
                     (coursePlan.guidedCoursePlan==='guided'  && coursePlan.courseTemplate==='without' && coursePlan.courseStructure==='unit')?       
                     <div>  
                        <div className='crnheading'>
                        <section aria-label="TOPIC 1: Introduction to ISD">
                           <div className='crnheading'><h3 id="content-topic-n" tabIndex="-1">UNIT: {' '+(parseInt(indexUnit)+1)}: {topic.title}</h3></div>
                           <div className='descriptiontext'>{topic.mainContent}</div>
                           <div className='previewcontent'>
                              {
                                 topic.lessons.map((lesson,index)=>(
                                    <div key={index}>
                                       <div className='crnheading' key={index}><h3 id="content-topic-n" tabIndex="-1">Lesson: {' '+(parseInt(index)+1)}: {lesson.title}</h3></div>
                                       <div className='previewcontent'>
                                       <CollectionsBookmarkIcon />
                                          <span className='boxResource'>Games: {TotalofResourcesLessons(indexUnit,index).games} </span>
                                          <span className='boxResource'>Presentations: {TotalofResourcesLessons(indexUnit,index).presentations} </span>
                                          <span className='boxResource'>Readings: {TotalofResourcesLessons(indexUnit,index).Supplementary} </span>
                                          <span className='boxResource'>Activities: {course[indexUnit].lessons[index].activities.length} </span> 
                                       </div>
                                    </div>
                                 ))
                              }
                           </div>
                        </section>
                        </div>
                     </div>
                     :
                     undefined                        
                  }
               </div>

               <div>
                  {
                     (coursePlan.guidedCoursePlan==='free'  && coursePlan.courseTemplate==='without' && (coursePlan.courseStructure==='topic' || coursePlan.courseStructure==='unit'))?       
                     <div>  
                        <div className='crnheading'>
                        <section aria-label="TOPIC 1: Introduction to ISD">
                           <div className='crnheading'><h3 id="content-topic-n" tabIndex="-1">UNIT: {' '+(parseInt(indexUnit)+1)}: {topic.title}</h3></div>
                           <div className='descriptiontext'>{topic.mainContent}</div>
                           <div className='previewcontent'>
                              {
                                 topic.lessons.map((lesson,index)=>(
                                    <div key={index}>
                                       <div className='crnheading' key={index}><h3 id="content-topic-n" tabIndex="-1">Lesson: {' '+(parseInt(index)+1)}: {lesson.title}</h3></div>
                                       <div className='previewcontent'>
                                       <CollectionsBookmarkIcon />
                                          <span className='boxResource'>Games: {TotalofResourcesLessons(indexUnit,index).games} </span>
                                          <span className='boxResource'>Presentations: {TotalofResourcesLessons(indexUnit,index).presentations} </span>
                                          <span className='boxResource'>Readings: {TotalofResourcesLessons(indexUnit,index).Supplementary} </span>
                                          <span className='boxResource'>Activities: {course[indexUnit].lessons[index].activities.length} </span> 
                                       </div>
                                    </div>
                                 ))
                              }
                           </div>
                        </section>
                        </div>
                     </div>
                     :
                     undefined                        
                  }
               </div>       
            </div>
             ))
            
        }   
       </div>
    )
}
