import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import VerticalTab from '../tools/VerticalTab';

import PdfForm from '../content/PdfForm';
import FormPreview from '../files/previews/FormPreview'

import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';


export default class PdfFormulario extends React.Component {
  constructor(props) {
     console.log("propiedades en pdffor", props)
    super(props);
    this.state = {
      contentItems: [
        { id: Math.random(), type: "pdf" },
      ],
      courseInformation: this.props.courseInformation,
      contentOpen:true,
      preview:''
    }
  }

  contentHandleClose = () => {
    this.setState({ 
      contentOpen: false, 
      contentToEdit: undefined, 
      contentTypeAdded: '', 
      showAccessibilityForm: false,
    });
  };

  
  getItemAttributes(){}

  relativeProgramCommons = (action, itemValue) => {
   //console.log("action and itemvalue", action, itemValue)
    let index;
    let arrayOfItems;
    if (action === "create" || action === "edit") {
      let itemContent = this.getItemAttributes();
      if (itemContent != undefined) {
         console.log(" arrayOfItems",  arrayOfItems, index, itemContent, this.state.courseInformation)
      
        this.state.courseInformation.sylabus=itemContent;
        this.setState({
            courseInformation:this.state.courseInformation
        })
        this.finishCreateContent(itemContent);
        
      }
    } else if (action === "cancel" || action === "remove") {
      arrayOfItems.splice(index, 1);
    } else if (action === "getA11y") {
      this.state.courseInformation.sylabus.accessibility.percentage = itemValue;
    } else if (action === "decorative") {
      this.state.courseInformation.sylabus.accessibility.pureDecorative = !this.state.courseInformation.sylabus.accessibility.pureDecorative;
    } else if (action === "setA11y") {
      this.state.courseInformation.sylabus.accessibility.dataField = itemValue.dataField;
      this.state.courseInformation.sylabus.isA11Y = itemValue.isA11Y;
      this.setState({
        courseInformation:this.state.courseInformation
    })
    }

    this.setState({
      showAccessibilityOptions:true,
      contentTypeAdded: 'pdf'
    })

    this.state.showAccessibilityOptions=true 
    this.state.contentTypeAdded = 'pdf'
    this.setState(this.state)
  }

  createContent(){
    console.log("create el content" ,this.props)
   
      this.props.loadSylabus(this.props.courseInformation.sylabus)
  
    this.relativeProgramCommons("create");
   
  }

  finishCreateContent = (itemContent) => {
    let showAccessibilityOptions = false;
    if (this.state.contentTypeAdded === "pdf" ) {
      showAccessibilityOptions = true;
    }
 
    this.setState({
      courseInformation:this.state.courseInformation,
      showAccessibilityOptions: showAccessibilityOptions,
      showContentEditor: false,
      contentOpen: showAccessibilityOptions,
      contentToConfigureAccessibility: itemContent,
    });
    //this.props.onClose()
    if(this.props.initial==='program'){
      this.props.onClose()
   }
  }

  finishEditContent(){
    this.relativeProgramCommons("edit");
    this.contentHandleClose();
    
  }

  cancelContentCreation(){
    this.relativeProgramCommons("cancel");
    this.setState({
      contentTypeAdded: '',
    });
  }

  removeItem(item){
    this.relativeProgramCommons("remove", item);
    this.setState({
      deleted: true,
    });
  }

  editItem(item){
    this.setState({
      contentTypeAdded: item.type,
      showAccessibilityOptions: false,
      showContentEditor: true,
      contentOpen: true,
      contentaAdded: true,
      languageType: this.props.language[item.type],
      contentToEdit: item,
    });
  }

  showAccessibilityForm(){
    this.setState({
      showAccessibilityOptions:false,
      showAccessibilityForm:true,
    })
    
  }

  getAccessibilityPercentage = (value) => {
    this.relativeProgramCommons("getA11y", value);
  }

  setContentAccessibilityData = (data) => {
    if (!this.state.configuringAccessibility) {
      this.relativeProgramCommons("setA11y", data);
      this.contentHandleClose();
    }
  }

  componentDidMount(){
    if(this.props.courseInformation.sylabus!=undefined){
      this.state.preview='preview';
      this.setState(this.state)
    }
  }

  

  render() {
    return(
      <div>
        <div> 
        {
          this.props.courseInformation.sylabus===undefined?
            <PdfForm
              getPdfAttributesFunction={pdfAttributes => this.getItemAttributes = pdfAttributes}
              contentToEdit={this.state.courseInformation.sylabus}
              handleControlMessage={this.props.handleControlMessage.bind(this)}
              language={this.props.language}
              preview={this.state.preview}
            />
          :
            <FormPreview
              loadSylabus={this.props.loadSylabus}
              file={this.props.courseInformation.sylabus}
              type="pdf"
              courseSyllabus={this.props.language.courseSyllabus}
              resetSylabus={this.props.resetSylabus}
              language={this.props.language}
            />
        }
        <div className="dialog-actions-container">
          <Tooltip title={this.props.language.saveSylabusAccessibiltie}>
            <Fab onClick={() => this.createContent()} aria-label={this.props.language.createContent} className="dialog-fab" color="primary">
              <DoneIcon/>
            </Fab>
          </Tooltip>
        </div>
          {
            this.state.showAccessibilityOptions && (this.state.contentTypeAdded === 'pdf' ) ?  
              <div className="configure-accessibility-actions"> 
                <List>
                  <ListItem disabled={false} onClick={() => this.showAccessibilityForm()} button>
                    <ListItemAvatar>
                      <Avatar className="primary-avatar">
                        <AccessibilityNewIcon className="configure-accessibility-icon"/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.language.configureAccessibility} secondary={this.props.language.weRecomendAccessibility}/>
                  </ListItem>
                  <ListItem onClick={() => this.contentHandleClose()} button>
                    <ListItemAvatar>
                      <Avatar className="secondary-avatar">
                        <WatchLaterIcon className="configure-accessibility-icon"/>
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={this.props.language.configureAccessibilityLater} secondary={this.props.language.youConfigureAccessibility}/>
                  </ListItem> 
                </List> 
              </div>  
            :
              undefined
          }

          {
            this.state.showAccessibilityForm ?
              <React.Fragment>
                <VerticalTab
                  support={ ["Vestibular","Speech", "Visual", "Elderly", "Language", "Hearing", "Diversity","Cognitive", "Motor"]}
                  contentTypeAdded={this.state.contentTypeAdded}
                  item={this.state.contentToConfigureAccessibility!=undefined?this.state.contentToConfigureAccessibility:this.state.courseInformation.sylabus}
                  getAccessibilityPercentage={this.getAccessibilityPercentage.bind(this)}
                  setContentAccessibilityData={this.setContentAccessibilityData.bind(this)}
                  language={this.props.language}
                />
              </React.Fragment>
            :
            undefined
          }
        </div>
      </div>
    );
  }
}
