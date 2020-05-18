import React from 'react';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import ContentMenuItem from './ContentMenuItem';
import ContentItem from './ContentItem';
import SortItem from './items/SortItem';
import DisabilitieMenu from './DisabilitieMenu';
import CourseCreatorMenu from './CourseCreatorMenu';
import VerticalTab from '../tools/VerticalTab';
import { Container, Draggable, dropHandlers } from 'react-smooth-dnd';
import { applyDrag, generateItems } from '../../../lib/dragAndDropUtils';
import { createContentItems } from '../../../lib/contentMenuItemsCreator';
/* Dialog */
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
/* Content Forms */
import TextForm from '../content/TextForm';
import ImageForm from '../content/ImageForm';
import VideoForm from '../content/VideoForm';
import AudioForm from '../content/AudioForm';
import LinkForm from '../content/LinkForm';
import PdfForm from '../content/PdfForm';
import CompressedForm from '../content/CompressedForm';
import H5PForm from '../content/H5PForm';
import QuizForm from '../content/QuizForm';
import ActivityForm from '../content/ActivityForm';
import EmbebedForm from '../content/EmbebedForm';
import UnityForm from '../content/UnityForm';
import CourseOrganization from './CourseOrganization';
import NavigationTool from './NavigationTool';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppsIcon from '@material-ui/icons/Apps';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

export default class TemplateTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     
    }
  }

  

  render() {
    return(
      <div>
        <div className="course-creator-container">   
        TemplateSpiralDemo
         
        </div>
      </div>
    );
  }
}
