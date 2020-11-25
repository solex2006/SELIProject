import React from 'react';
import { 
    List,
    Checkbox,
    ListItemIcon,
    ListItemText,
    ListItem,
    ListItemSecondaryAction,
    ListSubheader
}  from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import BounceLoader from 'react-spinners/BounceLoader';

export default class AccessibilityRegistration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInformation: this.props.userInformation,
            disabilitieAllowed: [],
            loading: true
        }
    }

    componentDidMount() {
        this.setState({
            loading: true
        }, () => {
            Tracker.autorun(() => {
                let disabilities = [ { _id: 0 }, { _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }, { _id: 5 } ];
                this.setState({
                    disabilitieAllowed: disabilities
                }, () => {
                    this.buildItems();
                });
            });
        })
    }

    buildItems(){
        let disabilitieAllowed = this.state.disabilitieAllowed;
        if (disabilitieAllowed.length){
            disabilitieAllowed.map(disabilitie => {disabilitie.selected = false});
            if(this.props.inEdition 
                && this.state.userInformation.profile.disabilities !== undefined
                && this.state.userInformation.profile.disabilities.length){
                    disabilitieAllowed.forEach((item, index) => {
                        let finded = this.state.userInformation.profile.disabilities
                        .find(itm => itm._id === item._id);
                        disabilitieAllowed[index].selected = finded !== undefined;
                    });
            }
            this.setState({
                disabilitieAllowed: disabilitieAllowed,
                loading: false
            });
        }
    }

    selectOption(index){
        let options = this.state.disabilitieAllowed;
        let userInformation = this.state.userInformation;
        options[index].selected = !options[index].selected;
        
        let disabilities = options
        .filter(d => d.selected)
        .map(({ _id }) => ({ _id: _id }));
        if(!this.props.inEdition)
            userInformation.disabilities = disabilities;
        else
            userInformation.profile.disabilities = disabilities;
        this.setState({
            disabilitieAllowed: options,
            userInformation: userInformation
        });
    }

    render(){
        const list = this.state.disabilitieAllowed;
        return(
            <div>
                {
                    this.state.loading ?
                    <div className="loading-library-container">
                        <div className="loading-library-row">
                            <div className="loading-library-container">
                                <BounceLoader color={getComputedStyle(document.documentElement).getPropertyValue('--primary')}/>
                            </div>
                            <p className="loading-library-text">{this.props.language.loadingRequirement}</p>
                        </div>
                    </div>
                    :
                    <List className="form-input-list" subheader={<li />}>
                        <ListSubheader className="list-subheader">
                            <p className="form-select-text">
                                {this.props.language.disabilities}
                            </p>
                        </ListSubheader>
                        {list.map((option, index) => (
                            <ListItem key={option._id} role={undefined} dense button onClick={() => this.selectOption(index)}>
                                <ListItemIcon>
                                    <PeopleIcon/>
                                </ListItemIcon>
                                <ListItemText className="form-list-text-item" id={option._id} primary={`${this.props.language.AccessibilityType.Name[option._id]}`}/>
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge="end"
                                        checked={option.selected}
                                        tabIndex={-1}
                                        disableRipple
                                        onClick={() => this.selectOption(index)}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                }
            </div>
        );
    }
}