import React, { useCallback } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

export default function SimpleDialog({
	key,
	title,
	open,
	handleClose,
	enabledark,
	children,
	controls,
	popup
}) {
	const theme = useTheme();

	const onClose = useCallback(e => {
		handleClose();
	});

	const fullScreen = useMediaQuery(theme.breakpoints.down(popup ? "xs" : "md"));
	const maxWidth = popup ? "xs" : "md";
	return (
		<Dialog
			id={key + "-dialog"}
			open={open}
			onClose={onClose}
			aria-labelledby={key + "-dialog-title"}
			aria-describedby={key + "-dialog-content"}
			//fullScreen={fullScreen}
			maxWidth={maxWidth}
			disableBackdropClick={true}
		>
			<DialogTitle id={key + "-dialog-title"}>{title}</DialogTitle>
			<DialogContent id={key + "-dialog-content"}>{children}</DialogContent>
			<DialogActions>{controls}</DialogActions>
		</Dialog>
	);
}
