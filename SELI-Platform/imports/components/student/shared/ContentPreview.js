import React, {useState} from 'react'
import './style.css'
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ForumIcon from '@material-ui/icons/Forum';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
export default function CourseContent(props) {
   //console.log("props en Content----->" ,props)
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

   const TotalofResourcesFreeUnit=(unit)=>{
      //only by units
      let text=0
      let image=0
      let audio=0
      let video=0
      let activity=0
      let quiz=0

      props.program[unit].items.map((intoUnit, indexInto)=>{
         if(intoUnit.type==='text'){
            text+=1
         }else if(intoUnit.type==='image'){
            image+=1
         }else if(intoUnit.type==='video'){
            video+=1
         }else if(intoUnit.type==='audio'){
            audio+=1
         }else if(intoUnit.type==='activity'){
            activity+=1
         }else if(intoUnit.type==='quiz'){
            quiz+=1
         }
      })
      
      //console.log("TotalofResourcesFreeUnit",text,image,audio,video,activity,quiz)
    return [text, image, audio, video, activity, quiz]
    //
   }

   const TotalofResourcesFreeUnitLesson=(unit,lesson)=>{

      let text=0
      let image=0
      let audio=0
      let video=0
      let activity=0
      let quiz=0

      props.program[unit].lessons[lesson].items.map((item,indexitem)=>{  
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

   const TotalofResourcesFreeTopic=(topic)=>{
      let text=0
      let image=0
      let audio=0
      let video=0
      let activity=0
      let quiz=0
      
     // console.log("por topicos",props.program[topic])
      props.program[topic].items.map((item,indexitem)=>{  
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
                           <div className='crnheading'><h3 id="content-topic-n" tabIndex="-1">{props.language.topic}: {' '+(parseInt(indexUnit)+1)}: {topic.title}</h3></div>
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
                           <div className='crnheading'><h3 id="content-topic-n" tabIndex="-1">{props.language.unit}: {' '+(parseInt(indexUnit)+1)}: {topic.title}</h3></div>
                           <div className='descriptiontext'>{topic.mainContent}</div>
                           <div className='previewcontent'>
                              {
                                 topic.lessons.map((lesson,index)=>(
                                    <div key={index}>
                                       <div className='crnheading' key={index}><h3 id="content-topic-n" tabIndex="-1">{props.language.lesson}: {' '+(parseInt(index)+1)}: {lesson.title}</h3></div>
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
                     (coursePlan.guidedCoursePlan==='free'  && coursePlan.courseTemplate==='without' && (coursePlan.courseStructure==='unit'))?       
                     <div>  
                        <div className='crnheading'>
                        <section aria-label="units">
                           <div className='crnheading'><h3 id="content-topic-n" tabIndex="-1">{props.language.unit}: {' '+(parseInt(indexUnit)+1)}: {topic.title}</h3></div>
                           <div className='descriptiontext'>{topic.mainContent}</div>
                           <div className='previewcontent'>
                              <CollectionsBookmarkIcon />
                                 <span className='boxResource'>Readings: {TotalofResourcesFreeUnit(indexUnit)[0]} </span>
                                 <span className='boxResource'>Images: {TotalofResourcesFreeUnit(indexUnit)[1]} </span>
                                 <span className='boxResource'>Audios: {TotalofResourcesFreeUnit(indexUnit)[2]} </span>
                                 <span className='boxResource'>Videos: {TotalofResourcesFreeUnit(indexUnit)[3]} </span> 
                                 <span className='boxResource'>Activities: {TotalofResourcesFreeUnit(indexUnit)[4]} </span> 
                                 <span className='boxResource'>Quizes: {TotalofResourcesFreeUnit(indexUnit)[5]} </span> 
                           </div>
                           
                           <div className='previewcontent'>
                              {
                                 topic.lessons.map((lesson,index)=>(
                                    <div key={index}>       
                                       <div className='crnheading' key={index}><h3 id="content-topic-n" tabIndex="-1">{props.language.lesson}: {' '+(parseInt(index)+1)}: {lesson.title}</h3></div>
                                       <div className='previewcontent'>
                                       <CollectionsBookmarkIcon />
                                          <span className='boxResource'>Readings: {TotalofResourcesFreeUnitLesson(indexUnit,index)[0]} </span>
                                          <span className='boxResource'>Images: {TotalofResourcesFreeUnitLesson(indexUnit,index)[1]} </span>
                                          <span className='boxResource'>Audios: {TotalofResourcesFreeUnitLesson(indexUnit,index)[2]} </span>
                                          <span className='boxResource'>Videos: {TotalofResourcesFreeUnitLesson(indexUnit,index)[3]} </span> 
                                          <span className='boxResource'>Activities: {TotalofResourcesFreeUnitLesson(indexUnit,index)[4]} </span> 
                                          <span className='boxResource'>Quizes: {TotalofResourcesFreeUnitLesson(indexUnit,index)[5]} </span> 
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
                     (coursePlan.guidedCoursePlan==='free'  && coursePlan.courseTemplate==='without' && coursePlan.courseStructure==='topic')?       
                     <div className='crnheading'>
                        <section aria-label="TOPIC 1: Introduction to ISD">
                           <div className='crnheading'><h3 id="content-topic-n" tabIndex="-1">{props.language.topic}: {' '+(parseInt(indexUnit)+1)}: {topic.title}</h3></div>
                           <div className='descriptiontext'>{topic.mainContent}</div>
                           <div className='previewcontent'>
                           <CollectionsBookmarkIcon />
                           <span className='boxResource'>Readings: {TotalofResourcesFreeTopic(indexUnit)[0]} </span>
                           <span className='boxResource'>Images: {TotalofResourcesFreeTopic(indexUnit)[1]} </span>
                           <span className='boxResource'>Audios: {TotalofResourcesFreeTopic(indexUnit)[2]} </span>
                           <span className='boxResource'>Videos: {TotalofResourcesFreeTopic(indexUnit)[3]} </span> 
                           <span className='boxResource'>Activities: {TotalofResourcesFreeTopic(indexUnit)[4]} </span> 
                           <span className='boxResource'>Quizes: {TotalofResourcesFreeTopic(indexUnit)[5]} </span> 
                              
                           </div>
                           
                        </section>
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
