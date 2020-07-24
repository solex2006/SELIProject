import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import React, { useCallback } from "react";
import clsx from "clsx";
const useStyles = makeStyles(theme => ({
	dialogContent: {
		overflowX: "hidden"
	},

	dialog: {
		overflow: "hidden"
	},
	darkmode: {
		"& .MuiPaper-root": {
			backgroundColor: "#121212"
		},
		"& .MuiPaper-root, .MuiIconButton-label, .MuiButton-root": {
			color: "#fff"
		},
		"& .Mui-disabled": {
			color: "rgba(255, 255, 255, 0.3)"
		}
	},
	closeButton: {
		position: "absolute",
		right: theme.spacing(1),
		top: theme.spacing(1)
	},
	appBar: {
		background: theme.palette.secondary.dark,
		color: theme.palette.grey[50]
	},
	dialogTitle: {
		...theme.typography.h6,
		marginLeft: theme.spacing(2),
		flex: 1
	}
}));

export default function DialogFullWidth(props) {
	//console.log(props);
	const {
		key,
		title,
		open,
		handleClose,
		enabledark,
		children,
		controls
	} = props;
	const classes = useStyles();

	const onClose = useCallback(e => {
		handleClose();
	});

	return (
		<Dialog
			fullScreen
			open={open}
			aria-labelledby={key + "-title"}
			aria-describedby={key + "-content"}
			aria-modal="true"
			role="dialog"
			className={clsx(classes.dialog, enabledark && classes.darkmode)}
		>
			<DialogTitle className={classes.appBar}>
				<span id={key + "-title"} className={classes.dialogTitle}>
					{title}
				</span>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="close"
					className={classes.closeButton}
					onClick={event => {
						onClose(event);
					}}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>

			<DialogContent id={key + "-content"} className={classes.dialogContent}>
				{children}
			</DialogContent>
			<DialogActions>{controls}</DialogActions>
		</Dialog>
	);
}
