import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ProgressBar from './ProgressBar'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const useStyles =theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
  },
});



 class CourseAccessibilityReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseInformation: this.props.courseInformation,
      Disabilities:{},
      unidLessonGreen:{},
      unidLessonRed:{},
      unidLessonIncomplete:{},
    
      GreenReport:{},
      RedReport:{},
      IncompleteReport:{},

      contentWithoutAccessibilitie:0,
      contentWithAccessibilitie:0,
      
      longDescription:0, //general counts
      shortDescription:0,
      captionsEmbedded:0,
      seizures:0,
      audioDescription:0,
      signLanguage:0,

      longDescription_a11y:0, //true counts
      shortDescription_a11y:0,
      captionsEmbedded_a11y:0,
      seizures_a11y:0,
      audioDescription_a11y:0,
      signLanguage_a11y:0,

      longDescriptionIncomplete:0, //incomplete counts
      shortDescriptionIncomplete:0,
      captionsEmbeddedIncomplete:0,
      seizuresIncomplete:0,
      audioDescriptionIncomplete:0,
      signLanguageIncomplete:0,
      emptyLessons:0,

      percentagesTopics:{},
      percentagesTopicsR:{}
    }
    // preserve the initial state in a new object
    this.baseState = this.state 
  }

  reset=()=>{
    this.state.longDescription=0,  this.state.shortDescription=0, this.state.captionsEmbedded=0, this.state.seizures=0, this.state.audioDescription=0, this.state.signLanguage=0
    this.state.longDescription_a11y=0,  this.state.shortDescription_a11y=0, this.state.captionsEmbedded_a11y=0, this.state.seizures_a11y=0, this.state.audioDescription_a11y=0, this.state.signLanguage_a11y=0
    this.state.longDescriptionIncomplete=0,  this.state.shortDescriptionIncomplete=0, this.state.captionsEmbeddedIncomplete=0, this.state.seizuresIncomplete=0, this.state.audioDescriptionIncomplete=0, this.state.signLanguageIncomplete=0
  }
  getAccessibilitiePercentages=()=>{
    //we do a map de the units and lessons 
    this.state.courseInformation.program.map((Unid,index)=>{//unid,name --->Nombre de la unidad
      console.log("UNIDAD:",(index+1))
      this.reset()
      Unid.lessons.map((lesson,indexlesson)=>{
        if(lesson.items.length===0){
          this.state.emptyLessons++
        }else{
          lesson.items.map((item,indexitem)=>{
            item.attributes.accessibility.percentage===0?
            this.incompleteOptions(item)
            :
            <div>
              {//here save where accesibilitie is available
                item.attributes.accessibility.isA11Y.map((disabilitie,indexDisabilitie)=>{
                  if(disabilitie.name==='longDescription'){
                    this.state.longDescription++
                    if(disabilitie.is_a11y===true){
                      this.state.longDescription_a11y++
                    }  
                  }else if(disabilitie.name==='shortDescription'){
                    if(disabilitie.is_a11y===true){
                      this.state.shortDescription_a11y++
                    }
                    this.state.shortDescription++
                  }else if(disabilitie.name==='captionsEmbedded'){
                    if(disabilitie.is_a11y===true){
                      this.state.captionsEmbedded_a11y++
                    }
                    this.state.captionsEmbedded++
                  }else if(disabilitie.name==='seizures'){
                    if(disabilitie.is_a11y===true){
                      this.state.seizures_a11y++
                    }
                    this.state.seizures++
                  }else if(disabilitie.name==='audioDescription'){
                    if(disabilitie.is_a11y===true){
                      this.state.audioDescription_a11y++
                    }
                    this.state.audioDescription++
                  }else if(disabilitie.name==='signLanguage'){
                    if(disabilitie.is_a11y===true){
                      this.state.signLanguage_a11y++
                    }
                    this.state.signLanguage++
                  }
                  //console.log(disabilitie)
                })
              }
              {this.state.contentWithAccessibilitie++ /*content with accesibilitie configurations*/ }
            </div>
          })
        }   
      })
      //here make the calculation of percentages by unit
      this.percentages(Unid.name)
    })
    this.totalpercentages()
  }
  incompleteOptions=(attribute)=>{
    console.log("atribute--->", attribute)
    this.state.contentWithoutAccessibilitie++
    if(attribute.type==='image'){
      this.state.shortDescriptionIncomplete++
    }else if(attribute.type==='video'){
      this.state.shortDescriptionIncomplete++
      this.state.longDescriptionIncomplete++
      this.state.captionsEmbeddedIncomplete++
      this.state.audioDescriptionIncomplete++
      this.state.signLanguageIncomplete++
      this.state.seizuresIncomplete++
    }else if(attribute.type==='audio'){
      this.state.shortDescriptionIncomplete++
      this.state.longDescriptionIncomplete++
    }
    

  }

  percentages=(unidname)=>{
    //for green status in the report for videocontent
    let shortD=((this.state.shortDescription_a11y*100)/(this.state.shortDescription+this.state.shortDescriptionIncomplete))
    let longD=((this.state.longDescription_a11y*100)/(this.state.longDescription+this.state.longDescriptionIncomplete))
    let signL=((this.state.signLanguage_a11y*100)/(this.state.signLanguage+this.state.signLanguageIncomplete))
    let seizures=((this.state.seizures_a11y*100)/(this.state.seizures+this.state.seizuresIncomplete))
    let audioD=((this.state.audioDescription_a11y*100)/(this.state.audioDescription+this.state.audioDescriptionIncomplete))
    let captions=((this.state.captionsEmbedded_a11y*100)/(this.state.captionsEmbedded+this.state.captionsEmbeddedIncomplete))
    //let unid={unidname:[shortD,longD]}
    

    //if video is not available then we put 100% in th eother option exept for shirt and long description
    if (Number.isNaN(longD)===true && Number.isNaN(signL)===true && Number.isNaN(seizures)===true && Number.isNaN(audioD)===true && Number.isNaN(captions)===true ){
      //only short description image
     let longD=100; let captions=100; let seizures=100; let audioD=100; let signL=100;
     Object.assign(this.state.unidLessonGreen,{[unidname]: [shortD]}) 
    }else if (Number.isNaN(signL)===true && Number.isNaN(seizures)===true && Number.isNaN(audioD)===true && Number.isNaN(captions)===true){
      let captions=100; let seizures=100; let audioD=100; let signL=100;
      Object.assign(this.state.unidLessonGreen,{[unidname]: [shortD,longD]}) 
    }else{
      Object.assign(this.state.unidLessonGreen,{[unidname]: [shortD,longD,signL,seizures,audioD,captions]}) 
    }
    


    //for red status in the report
    let shortDRed=(((this.state.shortDescription-this.state.shortDescription_a11y)*100)/(this.state.shortDescription+this.state.shortDescriptionIncomplete))
    let longDRed=(((this.state.longDescription-this.state.longDescription_a11y)*100)/(this.state.longDescription+this.state.longDescriptionIncomplete))
    let signLRed=(((this.state.signLanguage-this.state.signLanguage_a11y)*100)/(this.state.signLanguage+this.state.signLanguageIncomplete))
    let seizuresRed=(((this.state.seizures-this.state.seizures_a11y)*100)/(this.state.seizures+this.state.seizures))
    let audioDRed=(((this.state.audioDescription-this.state.audioDescription_a11y)*100)/(this.state.audioDescription+this.state.audioDescriptionIncomplete))
    let captionsRed=(((this.state.captionsEmbedded-this.state.captionsEmbedded_a11y)*100)/(this.state.captionsEmbedded+this.state.captionsEmbeddedIncomplete))
    
    
    //if video is not available then we put 100% in th eother option exept for shirt and long description
    if (Number.isNaN(longDRed)===true && Number.isNaN(signLRed)===true && Number.isNaN(seizuresRed)===true && Number.isNaN(audioDRed)===true && Number.isNaN(captionsRed)===true ){
      //only short description image
     let longDRed=0; let captionsRed=0; let seizuresRed=0; let audioDRed=0; let signLRed=0;
     Object.assign(this.state.unidLessonRed,{[unidname]: [shortDRed]})
    }else if (Number.isNaN(signLRed)===true && Number.isNaN(seizuresRed)===true && Number.isNaN(audioDRed)===true && Number.isNaN(captionsRed)===true){
      let captionsRed=0; let seizuresRed=0; let audioDRed=0; let signLRed=0;
      Object.assign(this.state.unidLessonRed,{[unidname]: [shortDRed,longDRed]})
    }else{
      Object.assign(this.state.unidLessonRed,{[unidname]: [shortDRed,longDRed,signLRed,seizuresRed,audioDRed,captionsRed]})
    }


    //for Incomplete status in the report
    let shortDInc=(((this.state.shortDescriptionIncomplete)*100)/(this.state.shortDescription+this.state.shortDescriptionIncomplete))
    let longDInc=(((this.state.longDescriptionIncomplete)*100)/(this.state.longDescription+this.state.longDescriptionIncomplete))
    let signLInc=(((this.state.signLanguageIncomplete)*100)/(this.state.signLanguage+this.state.signLanguageIncomplete))
    let seizuresInc=(((this.state.seizuresIncomplete)*100)/(this.state.seizures+this.state.seizures))
    let audioDInc=(((this.state.audioDescriptionIncomplete)*100)/(this.state.audioDescription+this.state.audioDescriptionIncomplete))
    let captionsInc=(((this.state.captionsEmbeddedIncomplete)*100)/(this.state.captionsEmbedded+this.state.captionsEmbeddedIncomplete))
    
    if (Number.isNaN(longDInc)===true && Number.isNaN(signLInc)===true && Number.isNaN(seizuresInc)===true && Number.isNaN(audioDInc)===true && Number.isNaN(captionsInc)===true ){
      //only short description image
     let longDInc=100; let captionsInc=100; let seizuresInc=100; let audioDInc=100; let signLInc=100;
     Object.assign(this.state.unidLessonIncomplete,{[unidname]: [shortDInc]})
    }else if (Number.isNaN(signL)===true && Number.isNaN(seizures)===true && Number.isNaN(audioD)===true && Number.isNaN(captions)===true){
      let captionsInc=100; let seizuresInc=100; let audioDInc=100; let signLInc=100;
      Object.assign(this.state.unidLessonIncomplete,{[unidname]: [shortDInc,longDInc]})
    }else{
      Object.assign(this.state.unidLessonIncomplete,{[unidname]: [shortDInc,longDInc,signLInc,seizuresInc,audioDInc,captionsInc]})
    }

    
  }

  

  totalpercentages=()=>{
    let FinalGreenReport=this.state.unidLessonGreen
    let FinalRedReport=this.state.unidLessonRed
    let FinalIncompleteReport=this.state.unidLessonIncomplete

    
    let textAlternativesShort=0
    let textAlternativesLong=0
    let audioDescription=0
    let signLan=0
    let captions=0
    let other=0
 

    let audioDescriptionR=0
    let textAlternativesShortR=0
    let textAlternativesLongR=0
    let signLanR=0
    let captionsR=0
    let otherR=0

    let lengthGreen=Object.keys(FinalGreenReport).length
    let lengthRed=Object.keys(FinalRedReport).length

    Object.keys(FinalGreenReport).map((key, index)=> {
      let finalGreenReport=((FinalGreenReport[key].reduce((a,b) => a + b, 0))/FinalRedReport[key].length)
      Object.assign(this.state.GreenReport,{[key]: finalGreenReport})
      //By topics for visual disabilities

      if(FinalRedReport[key].length===1){
        textAlternativesShort=FinalGreenReport[key][0]+textAlternativesShort 
        textAlternativesLong=100,audioDescription=100,signLan=100,captions=100,other=100
     
      }else if(FinalRedReport[key].length===2){
        textAlternativesShort=FinalGreenReport[key][0]+textAlternativesShort
        textAlternativesLong=FinalGreenReport[key][1]+textAlternativesLong
        audioDescription=100,signLan=100,captions=100,other=100
      }else{
        audioDescription=FinalGreenReport[key][4]+audioDescription 
        textAlternativesShort=FinalGreenReport[key][0]+textAlternativesShort
        textAlternativesLong=FinalGreenReport[key][1]+textAlternativesLong
        signLan=FinalGreenReport[key][2]+signLan
        captions=FinalGreenReport[key][5]+captions
        other=FinalGreenReport[key][3]+other

      }


    });
    Object.assign(this.state.percentagesTopics,{"TextAS":textAlternativesShort/lengthGreen,"TextAL":textAlternativesLong/lengthGreen,"signLan":signLan/lengthGreen,"captions":captions/lengthGreen, "AudioD": audioDescription/lengthGreen, "others":other/lengthGreen})


    Object.keys(FinalRedReport).map((key, index)=> {
      let finalRedReport=(FinalRedReport[key].reduce((a,b) => a + b, 0)/FinalRedReport[key].length)
      Object.assign(this.state.RedReport,{[key]: finalRedReport})
      if(FinalRedReport[key].length===1){
        textAlternativesShortR=FinalRedReport[key][0]+textAlternativesShortR
      }else if(FinalRedReport[key].length===2){
        textAlternativesShortR=FinalRedReport[key][0]+textAlternativesShortR
        textAlternativesLongR=FinalRedReport[key][1]+textAlternativesLongR
      }else{
        textAlternativesShortR=FinalRedReport[key][0]+textAlternativesShortR
        textAlternativesLongR=FinalRedReport[key][1]+textAlternativesLongR
        signLanR=FinalRedReport[key][2]+signLanR
        captionsR=FinalRedReport[key][5]+captionsR
        audioDescriptionR=FinalRedReport[key][4]+audioDescriptionR 
        otherR=FinalRedReport[key][3]+otherR
      }
    });
    Object.assign(this.state.percentagesTopicsR,{"TextAS":textAlternativesShortR/lengthRed,"TextAL":textAlternativesLongR/lengthRed,"signLan":signLanR/lengthRed,"captions":captionsR/lengthRed, "AudioD": audioDescriptionR/lengthRed, "others":otherR/lengthRed})


    Object.keys(FinalIncompleteReport).map((key, index)=> {
      let finalIncompleteReport=(FinalIncompleteReport[key].reduce((a,b) => a + b, 0)/FinalIncompleteReport[key].length)
      Object.assign(this.state.IncompleteReport,{[key]: finalIncompleteReport})
    });
    this.percentagesByTopics()
   
  }

  percentagesByTopics=()=>{
    //visual disabilities approval status
    let VisualD=(this.state.percentagesTopics.AudioD+this.state.percentagesTopics.TextAL+this.state.percentagesTopics.TextAS)/3  
    let LanguageD=(this.state.percentagesTopics.AudioD+this.state.percentagesTopics.TextAL+this.state.percentagesTopics.TextAS)/3  
    let HearingD=(this.state.percentagesTopics.captions+this.state.percentagesTopics.TextAL+this.state.percentagesTopics.TextAS +this.state.percentagesTopics.signLan)/4
    let CognitiveD=(this.state.percentagesTopics.AudioD+this.state.percentagesTopics.TextAL+this.state.percentagesTopics.TextAS + this.state.percentagesTopics.captions+ this.state.percentagesTopics.signLan+this.state.percentagesTopics.others)/6
    
    //visual disabilities failed status
    let VisualDR=(this.state.percentagesTopicsR.AudioD+this.state.percentagesTopicsR.TextAL+this.state.percentagesTopicsR.TextAS)/3  
    let LanguageDR=(this.state.percentagesTopicsR.AudioD+this.state.percentagesTopicsR.TextAL+this.state.percentagesTopicsR.TextAS)/3  
    let HearingDR=(this.state.percentagesTopicsR.captions+this.state.percentagesTopicsR.TextAL+this.state.percentagesTopicsR.TextAS +this.state.percentagesTopicsR.signLan)/4
    let CognitiveDR=(this.state.percentagesTopicsR.AudioD+this.state.percentagesTopicsR.TextAL+this.state.percentagesTopicsR.TextAS + this.state.percentagesTopicsR.captions+ this.state.percentagesTopicsR.signLan+this.state.percentagesTopicsR.others)/6
    
    Object.assign(this.state.Disabilities,{"VisualD": VisualD, "LanguageD":LanguageD, "HearingD":HearingD, "CognitiveD":CognitiveD})
    Object.assign(this.state.Disabilities,{"VisualDR": VisualDR, "LanguageDR":LanguageDR, "HearingDR":HearingDR, "CognitiveDR":CognitiveDR})
  }


  render() {
    const { classes } = this.props;
    return(  
    
      <Grid container className={classes.root} spacing={2}>
        {console.log("Propiedades----->",this.props)}
        {this.getAccessibilitiePercentages()}
      <Grid item xs={12}>
        <Grid container justify="center" spacing={5}>
        
            <Grid  item xs={12}>       
              <ProgressBar
                GreenReport={this.state.GreenReport}
                RedReport={this.state.RedReport}
              />
            </Grid>

              <Grid  item xs={4}>
                <div className="disabilitieA">
                <PersonOutlineIcon/>
                <div className="titledisabilitie">
                  Visual Disabilities*
                  <div className='descriptiondisabilitie'>
                  Visual disabilities range from mild or moderate vision loss in one or both eyes (“low vision”) to substantial and uncorrectable vision loss in both eyes (“blindness”). Some people have reduced or lack of sensitivity to certain colors “color blindness”, or increased sensitivity to bright colors. These variations in perception of colors and brightness can be independent of the visual acuity.
                  </div>
                  </div>
                </div>
                
               
              </Grid>
              <Grid  item xs={8}>
                <ProgressBar
                Disabilities={this.state.Disabilities}
                Disabilitiesflag={"VD"}
                />
              </Grid>
           
              <Grid  item xs={4}>
              <PersonOutlineIcon/>
              <div className="titledisabilitie">Hearing Disabilities*</div>
              </Grid>
              <Grid  item xs={8}>
                <ProgressBar
                  Disabilities={this.state.Disabilities}
                  Disabilitiesflag={"HD"}
                />
              </Grid>
   
              <Grid  item xs={4}>
              <PersonOutlineIcon/>
              <div className="titledisabilitie">Cognitive Disabilities*</div>
              </Grid>
              <Grid  item xs={8}>
                <ProgressBar
                    Disabilities={this.state.Disabilities}
                    Disabilitiesflag={"CD"}
                />
              </Grid>

              <Grid  item xs={4}>
                <PersonOutlineIcon/>
                <div className="titledisabilitie">Language disabilities*</div>
                
              </Grid>
              <Grid  item xs={8}>
                <ProgressBar
                    Disabilities={this.state.Disabilities}
                    Disabilitiesflag={"LD"}
                />
              </Grid>

              <Grid  item xs={3}>
                <ProgressBar
                  GreenReport={this.state.GreenReport}
                  RedReport={this.state.RedReport}
                  Disabilitiesflag={"unidgreenredTitle"}
                />
              </Grid>

              <Grid  item xs={9}>
                <ProgressBar
                  GreenReport={this.state.GreenReport}
                  RedReport={this.state.RedReport}
                  Disabilitiesflag={"unidgreenred"}
                />
              </Grid>
              
              
         
              
        </Grid>
      </Grid>
    </Grid>
    );
  }
}
export default withStyles(useStyles)(CourseAccessibilityReport)