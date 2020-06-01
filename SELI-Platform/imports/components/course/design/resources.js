import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import FeedbackHelp from "../feedback";
import Games from "./gamesTable.js";
import Presentation from "./presentationTable";
import SupplementaryTexts from "./supplementaryTable";

const useStyles = makeStyles(theme => ({
  root: {
    "& $deleteButton:hover": {
      backgroundColor: "#d91e1822"
      //color: "#d91e18"
    },
    "& $saveButton:hover": {
      backgroundColor: "#00897b22"
      //color: "#d91e18"
    }
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  hidden: {
    display: "none"
  },
  addButton: {
    color: theme.palette.secondary.main
  },
  deleteButton: {},
  saveButton: {},
  nav: {
    width: "100%",
    maxWidth: "100%"
    // backgroundColor: "#f5f5f5"
  },
  header: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#e0e0e0!important"
  }
}));

export default function ActivityResources(props) {
  const classes = useStyles();

  const { key, tools, handleSelectResources, parentIndex } = props;
  const presentItemsTypes = ["file", "h5p"];
  const gameItemsTypes = ["unity", "h5p", "reference"];

  const initialValue = tools;

  const [toolsOptions, setToolsOptions] = useState(tools);

  const handleSuppItems = () => {};

  const handlePresItems = () => {};

  const handleGamesItems = () => {};

  function showTable(id) {
    return toolsOptions.some(tool => {
      return tool.key === id && tool.checked;
    });
  }

  return (
    <React.Fragment>
      {/* <h4>Resources</h4> */}
      <FormControl
        required
        // error={error}
        component="fieldset"
        className={classes.formControl}
      >
        <FormLabel component="legend">Resources</FormLabel>
        <FormGroup>
          {toolsOptions.map((option, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={option.checked}
                  onChange={() => {
                    let t = toolsOptions;
                    t[index].checked = !t[index].checked;

                    handleSelectResources(parentIndex, t);
                    // setTimeout(() => {
                    // setToolsOptions(prev => {
                    // prev[index].checked = !prev[index].checked;
                    // return [...prev];
                    // });
                    // }, 600);
                  }}
                  name={option.key}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
        <FeedbackHelp
          validation={{
            error: false,
            errorMsg: "",
            errorType: "",
            a11y: null
          }}
          tipMsg="Select the resources tool you are goint to ue in this topic"
          describedBy={key + "-helper-text_mainContent"}
        />
      </FormControl>
      {showTable("games") && <Games handleGamesItems={handleGamesItems} />}
      {showTable("presentation") && (
        <Presentation handlePresItems={handlePresItems} />
      )}
      {showTable("supplemantary") && (
        <SupplementaryTexts handleSuppItems={handleSuppItems} />
      )}
    </React.Fragment>
  );
}
