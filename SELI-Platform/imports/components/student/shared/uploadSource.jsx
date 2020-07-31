import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { Tooltip, Fab, Avatar, IconButton } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import PublishIcon from "@material-ui/icons/Publish";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import FolderSpecialIcon from "@material-ui/icons/FolderSpecial";
import MicIcon from "@material-ui/icons/Mic";
import InfoIcon from "@material-ui/icons/Info";
import HelpIcon from "@material-ui/icons/Help";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import Switch from "@material-ui/core/Switch";
import VerticalSplitIcon from "@material-ui/icons/VerticalSplit";
import { ReactMic } from "react-mic";
import ReactStopwatch from "react-stopwatch";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		flexWrap: "wrap"
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: "30em"
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: "30em"
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	button: {
		margin: theme.spacing(1)
	},
	input: {
		display: "none"
	},
	upload: {
		"& svg": {
			width: "5em",
			height: "5em",
			marginRight: "0.5em"
		},
		"& $uploadCaption": {
			marginLeft: ".5em"
		},
		"& $textField": {
			marginLeft: theme.spacing(1),
			marginRight: theme.spacing(1),
			width: "21.5em"
		}
	},
	audioControl: {
		"& svg": {
			width: "1.5em",
			height: "1.5em",
			marginRight: "0"
		},
		"& button:Not([disabled]) .MuiAvatar-root": {
			backgroundColor: theme.palette.primary.main
		}
	},
	uploadCaption: {},
	img: {
		// "& svg": {
		width: "5em",
		height: "5em",
		marginRight: "0.5em"
		// },
	}
}));

export default function MultilineTextFields({mic, web}) {
	const classes = useStyles();
	const [source, setSource] = React.useState("");

	// will hold a reference for our real input file
	let inputFile = "";


	const handleUploadButton = event => {
		if (event.which === 32 || event.which === 13) {
			// alert("button click redirects to input click")
			event.preventDefault();
			inputFile.click();
			return false;
		}
	};

	const handleInputFile = event => {
		// alert(" redirects to input click")
	};

	return (
			<Grid container direction="column">
				<Grid item>
					<FormControl className={classes.formControl}>
						<Select
							value={source}
							onChange={event => setSource(event.target.value)}
							displayEmpty
							className={classes.selectEmpty}
						>
							<MenuItem value="" disabled>
								Select a source
							</MenuItem>
							{mic &&<MenuItem value="mic">Microphone: record your own audio</MenuItem>}
							<MenuItem value="local">Local: upload from your device</MenuItem>
							{web && <MenuItem value="web">Web: upload from a link</MenuItem>}
							<MenuItem value="library">
								Library: choose a file from your SELI library
							</MenuItem>
						</Select>
						<FormHelperText>
							Select the source from where to upload the file
						</FormHelperText>
					</FormControl>
				</Grid>
				{source === "mic" && (
					<Grid item>
						<Grid
							container
							direction="row"
							className={classes.upload}
							alignItems="center"
						>
							<Grid item>
								<MicIcon />
							</Grid>
							<Grid item>
								<Grid container direction="column">
									{/* <Grid item>
										<ReactMic
											className="sound-wave"
											strokeColor="#111"
											backgroundColor="#fcfcfc"
										/>
									</Grid> */}
									<Grid item>
										<Button variant="outlined" color="primary">
											Record an audio
										</Button>
									</Grid>
									<Grid item>
										<Typography
											variant="caption"
											className={classes.uploadCaption}
										>
											You can record an audio of 120 minutes
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				)}
				{source === "local" && (
					<Grid item>
						<Grid
							container
							direction="row"
							className={classes.upload}
							alignItems="center"
						>
							<Grid item>
								<PublishIcon />
							</Grid>
							<Grid item>
								<Grid container direction="column">
									<Grid item>
										<input
											accept="image/*"
											className={classes.input}
											id="contained-button-file"
											multiple
											type="file"
											// onChange={handleInputFile}
											onClick={handleInputFile}
											name="fileUpload"
											ref={input => {
												// assigns a reference so we can trigger it later
												inputFile = input;
											}}
										/>
										<label htmlFor="contained-button-file">
											<Button
												variant="outlined"
												color="primary"
												component="span"
												className={classes.button}
												onClick={handleUploadButton}
											>
												Upload file
											</Button>
										</label>
									</Grid>
									<Grid item>
										<Typography
											variant="caption"
											className={classes.uploadCaption}
										>
											Any file limitations
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				)}
				{source === "web" && (
					<Grid item>
						<Grid container direction="row" className={classes.upload}>
							<Grid item>
								<CloudDownloadIcon />
							</Grid>
							<Grid item>
								<Grid container direction="column">
									<Grid item>
										<TextField
											label="URL (required)"
											id="standard-start-adornment"
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														http://
													</InputAdornment>
												)
											}}
											helperText="Enter an URL of a file"
											className={classes.textField}
											margin="normal"
										/>
									</Grid>
									<Grid item>
										<Typography
											variant="caption"
											className={classes.uploadCaption}
										>
											Any file limitations
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				)}

				{source === "library" && (
					<Grid item>
						<Grid
							container
							direction="row"
							className={classes.upload}
							alignItems="center"
						>
							<Grid item>
								<FolderSpecialIcon />
							</Grid>
							<Grid item>
								<Grid item>
									<Button variant="outlined" color="primary">
										Pick your file
									</Button>
								</Grid>
								<Grid item>
									<Typography
										variant="caption"
										className={classes.uploadCaption}
									>
										Any file limitations
									</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				)}
			
			</Grid>
	);
}
