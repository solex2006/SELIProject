import React, { Component } from 'react'
import OpenWithIcon from '@material-ui/icons/OpenWith';
import Tooltip from '@material-ui/core/Tooltip';

export default class DragItem extends Component {
    render() {
        return (
            <div className="item-drag-handle">
                <Tooltip  title={this.props.holdanddrag}>
                    <OpenWithIcon/>
                </Tooltip>
            </div>
        )
    }
}
