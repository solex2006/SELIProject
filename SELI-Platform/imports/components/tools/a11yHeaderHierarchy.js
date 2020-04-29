import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const HEADER_ONE = "h1";
const HEADER_TWO = "h2";
const HEADER_THREE = "h3";
const HEADER_FOUR = "h4";
const HEADER_FIVE = "h5";
const HEADER_SIX = "h6";

var HEADERS = [
    { header: HEADER_ONE, value: 1 },
    { header: HEADER_TWO, value: 2 },
    { header: HEADER_THREE, value: 3 },
    { header: HEADER_FOUR, value: 4 },
    { header: HEADER_FIVE, value: 5 },
    { header: HEADER_SIX, value: 6 }
];

function typeToValue(type) {
    return HEADERS.find(h => h.header === type).value;
}

function valueToType(value) {
    let header = HEADERS.find(h => h.value === value);
    return header.header;
}

const useStyles = makeStyles(theme => ({
    root: {
        width: "90%"
    },
    button: {
        '& span': {
            pointerEvents: 'none'
        }
    },

    error: {
            border: '1px solid red'
    }
}));
export default function Demo() {
    const classes = useStyles();


    const [blockHierarchy, setBlockHierarchy] = React.useState([]);
    const [components, setComponents] = React.useState([]);
    const [blockErrorLit, setBlockErrorList] = React.useState([]);


    function htmlBlocks(type) {
        switch (type) {
            case HEADER_ONE:
                return (
                    <React.Fragment>
            <h1>H1 Title</h1>
          </React.Fragment>
                );
            case HEADER_TWO:
                return (
                    <React.Fragment>
            <h2>H2 Title</h2>
          </React.Fragment>
                );
            case HEADER_THREE:
                return (
                    <React.Fragment>
            <h3>H3 Title</h3>
          </React.Fragment>
                );

            case HEADER_FOUR:
                return (
                    <React.Fragment>
            <h4>H4 Title</h4>
          </React.Fragment>
                );
            case HEADER_FIVE:
                return (
                    <React.Fragment>
            <h5>H5 Title</h5>
          </React.Fragment>
                );
            case HEADER_SIX:
                return (
                    <React.Fragment>
            <h6>H6 Title</h6>
          </React.Fragment>
                );
            case "compA":
                return (
                    <React.Fragment>
            <blockquote cite="http://www.worldwildlife.org/who/index.html">
              For 50 years, WWF has been protecting the future of nature. The
              world's leading conservation organization, WWF works in 100
              countries and is supported by 1.2 million members in the United
              States and close to 5 million globally.
            </blockquote>
          </React.Fragment>
                );
            case "compB":
                return (
                    <React.Fragment>
            <h4>Problems</h4>
            <p> Instruction </p>
            <h5>Problem A</h5>
            <p> Activity description</p>
            <h5>Problem B</h5>
            <p> Activity description</p>
          </React.Fragment>
                );
            default:
                return (
                    <React.Fragment>
            <p>Ops</p>
          </React.Fragment>
                );
        }
    }
    const handleDel = event => {};
    const handleDown = event => {};
    const handleUp = event => {};

    const handleAddTitle = event => {
        console.clear();
        console.log(event.target);
        console.log(blockHierarchy);
        let level = parseInt(
            event.target.attributes.getNamedItem("level").value,
            10
        );
        let type = valueToType(level);
        let newBlock = {
            key: type + "_" + blockHierarchy.length,
            type: type,
            position: blockHierarchy.length, //last
            error: false,
            siblings: [],
            childs: [],
            parent: ""
        };
        console.log(newBlock);
        newBlock.error = false;
        console.log(blockHierarchy);
        console.log(newBlock);
        console.log([...blockHierarchy, newBlock]);
        let error = HeaderValidation([...blockHierarchy, newBlock], newBlock, HEADER_TWO);
        setBlockHierarchy(prevBlocks => [...prevBlocks, newBlock]);
        setComponents(prevBlocks => [
            ...prevBlocks,
            {
                key: type + "_" + blockHierarchy.length,
                type: type,
                error: error
            }
        ]); //list of all components inserted
    };

    const handleAddComponent = event => {
        let level = event.target.attributes.getNamedItem("level").value;

        // let type = valueToType(level);
        let newBlock = {
            key: level + "_" + blockHierarchy.length,
            type: level === "compB" ? HEADER_FIVE : "none",
            position: blockHierarchy.length, //last
            error: false,
            siblings: [],
            childs: [],
            parent: ""
        };
        console.log(blockHierarchy);
        let error = false;
        if (newBlock.type !== "none") {
            error = HeaderValidation([...blockHierarchy, newBlock], newBlock, HEADER_TWO);
            setBlockHierarchy(prevBlocks => [...prevBlocks, newBlock]);
        }

        setComponents(prevBlocks => [
            ...prevBlocks,
            {
                key: level + "_" + blockHierarchy.length,
                type: level,
                error: error
            }
        ]); //list of all components inserted
    };

    return (
        <React.Fragment>
      <Grid container direction="column" spacing={3}>
        {components.map(block => (
          <Grid container justify="space-evenly" alignItems="flex-end">
            <Grid className={block.error ? classes.error: ""} item>
              {htmlBlocks(block.type)}
            </Grid>
            <Grid item>
              <ButtonGroup>
                <Button block={block.key} onClick={handleDown} className={classes.button}>
                  down
                </Button>
                <Button block={block.key} onClick={handleUp} className={classes.button}>
                  UP
                </Button>
                <Button block={block.key} onClick={handleDel} className={classes.button}>
                  Delete
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        ))}
        <Grid item>
          <ButtonGroup>
            <Button level={2} onClick={handleAddTitle} className={classes.button}>
              Big Title
            </Button>
            <Button level={3} onClick={handleAddTitle} className={classes.button}>
              Medium Title
            </Button>
            <Button level={4} onClick={handleAddTitle} className={classes.button}>
              Small Title
            </Button>
            <Button level="compA" onClick={handleAddComponent} className={classes.button}>
              Component A
            </Button>
            <Button level="compB" onClick={handleAddComponent} className={classes.button}>
              Component B
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      {/* <h1>Level Hierarchy</h1>
      {treeOutput(blockHierarchy)} */}
    </React.Fragment>
    );


}

function insertKey(blocks, item, block) {
    let itemIndex = -1;
    if (typeof item === "object" && item !== null) {
        //block
        itemIndex = blocks.indexOf(item);
    } //key
    else {
        itemIndex = blocks.findIndex(b => b.key === item);
        item = blocks[itemIndex];
    }
    console.log("********");
    console.log("insertKey");
    console.log(itemIndex);
    console.log(item);
    console.log(block);

    console.log("********");

    if (block.length === 0 || blocks.length - 1 === itemIndex)
        block.push(item.key);
    else {
        for (var index = block.length - 1; index >= 0; index--) {
            let blockItem = block[index]; //index of childs list
            let blockItemIndex = blocks.findIndex(b => b.key === blockItem); //index of blockheaders list

            if (blockItemIndex > itemIndex) continue;

            if (blockItemIndex === itemIndex)
                // é o mesmo?
                break;
            else {
                block.splice(index + 1, 0, item.key);
                break;
            }
        }
    }
}


function setChildToParent(blocks, parentIndex, currentKey) {
    if (parentIndex === -1)
        //h1 doesnt have parent
        return;
    // //set child to parent
    // blocks[parentIndex].childs=[
    //  ...blocks[parentIndex].childs,
    //  currentKey
    // ];
    insertKey(blocks, currentKey, blocks[parentIndex].childs);
}

function setHeaderChilds(
    blocks,
    currentIndex,
    currentType,
    currentKey,
    currentValue,
    parentIndex,
    parentKey
) {
    let siblings = [];

    if (parentIndex === -1) {
        siblings = blocks.filter(
            b => b.type === currentType && b.key !== currentKey && b.parent === ""
        );
    } else {
        //set parent
        blocks[currentIndex].parent = parentKey;

        //update list of childs in parent
        setChildToParent(blocks, parentIndex, currentKey);

        siblings = blocks.filter(
            b => b.parent === parentKey && b.key !== currentKey
        );
    }

    //fix hierarchy
    // setAdoptedChild(blocks, siblings, currentIndex, currentKey, currentValue);
}

function getHisGrandParent(blocks, index) {
    let parentIndex = blocks.findIndex(b => b.key === blocks[index].parent);
    let granpaKey = blocks[parentIndex].parent;
    //granpaIndex
    return blocks.findIndex(b => b.key === granpaKey);
}

function getMyParent(blocks, currentValue, whoIndex, grandParentIndex = -1) {
    if (whoIndex === 0) {
    //no parent
        return {
          myParentKey: "",
          myParentIndex: -1
        };
     }
    if (grandParentIndex === -1) {
        grandParentIndex = getHisGrandParent(blocks, whoIndex);
    } else {
        grandParentIndex = getHisGrandParent(blocks, grandParentIndex);
    }

    let parentValue = typeToValue(blocks[grandParentIndex].type);

    if (currentValue - parentValue === 0) {
        //find my brother
        let parentKey = blocks[grandParentIndex].parent;
        return {
            myParentKey: parentKey,
            myParentIndex: blocks.findIndex(b => b.key === parentKey)
        };
    }
    if (currentValue - parentValue === 1) {
        //find my parent
        return {
            myParentKey: blocks[grandParentIndex].parent,
            myParentIndex: grandParentIndex
        };
    }

    return getMyParent(blocks, currentValue, -1, grandParentIndex);
}

function HeaderValidation(blocks, targetBlock, TOP_LEVEL_HEADER = HEADER_ONE) {
    let currentLevel = typeToValue(targetBlock.type);
    let currentIndex = targetBlock.position;
    let parentKey = -1;
    let parentIndex = -1;

    //It's adding a top-level header
    if (blocks[currentIndex].type === TOP_LEVEL_HEADER || currentIndex === 0) {
        //fix hierarhy
        // setAdoptedChild(blocks, [], currentIndex, targetBlock.key, currentLevel);
    } else {
        let prevIndex = currentIndex - 1;
        let prevType = blocks[prevIndex].type;
        let prevValue = typeToValue(prevType);
        let prevKey = blocks[prevIndex].key;
        let depth = currentLevel - prevValue;

        //it's adding a header that is child of previous header 
        if (depth === 1) {
            //child
            parentIndex = currentIndex - 1;
            parentKey = prevKey;

            setHeaderChilds(
                blocks,
                currentIndex,
                currentLevel,
                targetBlock.key,
                currentLevel,
                currentIndex - 1,
                prevKey
            );
        } else { //It's adding adding a header not directly to it parent

            //direct previous header is not my parent.
            //Need to find my parent
            let noparent = false;
            console.clear();

            if (blocks[prevIndex].type !== TOP_LEVEL_HEADER && blocks[prevIndex].parent === "") {
                noparent = true;

                if (currentIndex === 2) {
                    prevIndex = 0;
                    noparent = false;
                } else {
                    for (let i = currentIndex - 2; i >= 0; i--) {

                        //found a sibling that knows whos is father
                        if (
                            typeToValue(blocks[i].type) === currentLevel &&
                            blocks[i].parent !== ""
                        ) {
                            console.log("sibling: " + i);
                            prevIndex = i;
                            noparent = false;
                            break;
                        }

                        //found somebary that could know who is my father
                        if (typeToValue(blocks[i].type) < currentLevel) {
                            console.log("somebody: " + i);
                            prevIndex = i;
                            noparent = false;
                            break;
                        }
                    }
                }
            }

            if (noparent) {
                blocks[currentIndex].parent = "";
                blocks[currentIndex].error = true;
            } else {
                prevType = blocks[prevIndex].type;
                prevValue = typeToValue(prevType);
                prevKey = blocks[prevIndex].key;
                depth = currentLevel - prevValue;

                if (depth === 0) { //found a sibling
                    parentKey = blocks[prevIndex].parent;
                    parentIndex = blocks.findIndex(b => b.key === parentKey);

                    setHeaderChilds(
                        blocks,
                        currentIndex,
                        currentLevel,
                        targetBlock.key,
                        currentLevel,
                        parentIndex,
                        parentKey
                    );
                } else if (depth === 1) { //found my parent
                    parentIndex = prevIndex;
                    parentKey = prevKey;

                    setHeaderChilds(
                        blocks,
                        currentIndex,
                        currentLevel,
                        targetBlock.key,
                        currentLevel,
                        prevIndex,
                        prevKey
                    );
                } else if (depth < 0) {
                    //deep in genalogic tree
                    if (depth === -1) { //found a nephew

                        let siblingIndex = blocks.findIndex(
                            b => b.key === blocks[prevIndex].parent
                        );

                        parentKey = blocks[siblingIndex].parent;
                        parentIndex = blocks.findIndex(b => b.key === parentKey);

                        setHeaderChilds(
                            blocks,
                            currentIndex,
                            currentLevel,
                            targetBlock.key,
                            currentLevel,
                            parentIndex,
                            parentKey
                        );
                    } else {
                        let { myParentKey, myParentIndex } = getMyParent(
                            blocks,
                            currentLevel,
                            prevIndex
                        );

                        if (prevIndex === 0) {
              blocks[currentIndex].parent = "";
              blocks[currentIndex].error = true;
            } else {
              parentKey = myParentKey;
              parentIndex = myParentIndex;
              setHeaderChilds(
                blocks,
                currentIndex,
                currentLevel,
                targetBlock.key,
                currentLevel,
                parentIndex,
                parentKey
              );
            }
                    }
                } else if (depth > 1) {
                    //oops, your are neighbour's child?
                    blocks[currentIndex].parent = "";
                    blocks[currentIndex].error = true;
                }
            }

        }
    }
    if (
        (parentIndex === -1 && currentLevel !== typeToValue(TOP_LEVEL_HEADER)) ||
        (parentIndex !== -1 &&
            currentLevel - typeToValue(blocks[parentIndex].type) >
            typeToValue(TOP_LEVEL_HEADER))
    ) {
        blocks[currentIndex].error = true;
        blocks[currentIndex].parent = "";
    }

    return blocks[currentIndex].error;
}