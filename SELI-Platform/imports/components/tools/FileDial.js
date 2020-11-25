import React, {useEffect} from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import CloseIcon from '@material-ui/icons/Close';

export default function FileDial(props) {
  const [actions, setActions] = React.useState(props.actions)
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    var newActions = actions;
    newActions.push({ icon: <CloseIcon />, name: props.labels.closeLabel, action: handleCloseIcon});
    setActions(newActions);
  }, [])

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleCloseIcon = () => {
    document.getElementById(`dial-container-${props.id}`).focus();
    handleClose();
  }

  return (
    <div className="file-dial-container">
      <SpeedDial
        ariaLabel={props.labels.ariaLabel}
        className="file-dial-container"
        hidden={false}
        icon={props.icon}
        onOpen={handleOpen}
        onClose={handleClose}
        open={open}
        direction="left"
        FabProps={{
          id: `dial-container-${props.id}`,
          "aria-describedby": "speed-dial-navigation",
          color: props.color
        }}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
            tooltipPlacement="bottom"
            FabProps={{
              role: "none"
            }}
          />
        ))}
      </SpeedDial>
      {actions.map((action, index) => (
        <div 
          id={`${props.labels.ariaLabel}-action-${index}-label`}
          aria-label={action.name}
          style={{display: "none"}}
        />
      ))}
      <div
        id="speed-dial-navigation"
        aria-label={props.labels.navigationLabel}
        style={{ display: "none" }}
      />
    </div>
  );
}
