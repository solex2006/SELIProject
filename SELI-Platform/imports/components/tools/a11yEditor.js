import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

import * as DraftJS from 'draft-js';
import DraftJSUtils from 'draft-js-utils';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { filterEditorState } from 'draftjs-filters';
import { Map } from 'immutable';

import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';
import { SnackbarProvider, useSnackbar } from 'notistack';

import CloseIcon from '@material-ui/icons/Close';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

///////////////////////////////////////////////////////////////////////////////
// props {                                                                   //
// 	onChange (fn),                                                           //
// 	handleerror (fn),                                                        //
// 	error (bool),                                                            //
// 	editorData (string): name to retrieve data from localStorage             //
// 	id (string): id of component                                             //
// 	label (string): label for component                                      //
// 	placeholder (string): placeholder for field                              //
// 	required (boolean): if its a mandatory field                             //
// 	ariaLabelledBy (string): id of alternative label component               //
// 	ariaDescribedBy (string): id of component with description of this field //
// }                                                                         //
///////////////////////////////////////////////////////////////////////////////

const inDevelopment = function () {
	return false;
	return process.env.NODE_ENV === 'development';
};

//only inline style (bold, underline, italic)
export function styleEditor(props) {
	const {
		handleKeyCommand: handleKeyCommand,
		onClick: onClick,
		onChange: onChange,
		toggleInlineStyle: toggleInlineStyle,
		renderContentAsRawJs: renderContentAsRawJs,
		editor,
		editorState,
		outputHtml,
		classNameEditor,
		classNameLabel,
		classNameAsterisk
	} = useEditor(props);

	return (
		<React.Fragment>
			<Grid item>
				<Grid container direction='column' justify='flex-start' alignments='flex-start'spacing={0} className='a11yEditor-root'>
					<Grid item xs={12} id='editor-control-inline-styles' className='a11yEditor-controls'>
						<InlineStyleControls type={'caption'} dataEditor={editorState} onToggle={toggleInlineStyle}/>
					</Grid>
					<Grid item xs={12} className={classNameEditor}>

						<TextEditor
							id={props.id}
							error={props.error}
							label={props.label}
							required={props.required}
							ariaLabelledBy={props.ariaLabelledBy}
							placeholder={props.placeholder}
							dataEditor={{
								handleKeyCommand: handleKeyCommand,
								handlePastedText: handlePastedText,
								onTab: onTab,
								onClick: onClick,
								onChange: onChange,
								renderContentAsRawJs,
								editor,
								editorState,
								classNameEditor,
								classNameLabel,
								classNameAsterisk,
								outputHtml
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}

//styles & 3 header levels & list & quote
export function CaptionEditor(props) {
	const {
		handleKeyCommand: handleKeyCommand,
		handlePastedText: handlePastedText,
		onTab: onTab,
		onClick: onClick,
		onChange: onChange,
		toggleInlineStyle: toggleInlineStyle,
		toggleBlockType: toggleBlockType,
		renderContentAsRawJs: renderContentAsRawJs,
		showFeedback: showFeedback,
		feedback: feedback,
		feedbackLink: feedbackLink,
		feedbackClose: feedbackClose,
		feedbackGoto: feedbackGoto,
		editor,
		editorState,
		outputHtml,
		classNameEditor,
		classNameLabel,
		classNameAsterisk
	} = useEditor(props);

	return (
		<React.Fragment>
			<Grid item>
				<Grid container direction='column' justify='flex-start' alignments='flex-start'spacing={0} className='a11yEditor-root'>
					<Grid item xs={12} id='editor-control-block-types' className='a11yEditor-controls'>
						<BlockStyleControls type={'caption'} dataEditor={editorState} onToggle={toggleBlockType}/>
					</Grid>
					<Grid item xs={12} id='editor-control-inline-styles' className='a11yEditor-controls'>
						<InlineStyleControls type={'caption'} dataEditor={editorState} onToggle={toggleInlineStyle}/>
					</Grid>
					<Grid item xs={12} className={classNameEditor}>

						<TextEditor
							id={props.id}
							error={props.error}
							label={props.label}
							required={props.required}
							ariaLabelledBy={props.ariaLabelledBy}
							placeholder={props.placeholder}
							dataEditor={{
								handleKeyCommand: handleKeyCommand,
								handlePastedText: handlePastedText,
								onTab: onTab,
								onClick: onClick,
								onChange: onChange,
								renderContentAsRawJs,
								editor,
								editorState,
								classNameEditor,
								classNameLabel,
								classNameAsterisk,
								outputHtml
							}}
						/>
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
//styles & all block types
export function FullTextEditor(props) {
	const {
		handleKeyCommand: handleKeyCommand,
		handlePastedText:handlePastedText,
		hasLevelError: hasLevelError,
		keyBindingFn: keyBindingFn,
		onTab: onTab,
		onClick: onClick,
		onChange: onChange,
		toggleInlineStyle: toggleInlineStyle,
		toggleBlockType: toggleBlockType,
		toggleColor: toggleColor,
		renderContentAsRawJs: renderContentAsRawJs,
		showFeedback: showFeedback,
		feedback: feedback,
		feedbackLink: feedbackLink,
		feedbackClose: feedbackClose,
		feedbackGoto: feedbackGoto,
		editor,
		editorState,
		outputHtml,
		classNameEditor,
		classNameLabel,
		classNameAsterisk
	} = useEditor(props);

	return (
		<React.Fragment>
			<Grid container direction='column' justify='flex-start' alignments='flex-start'spacing={0} className='a11yEditor-root'>
				<Grid item xs={12} id='editor-control-block-types' className='a11yEditor-controls'>
					<BlockStyleControls type={'full'} dataEditor={editorState} onToggle={toggleBlockType}/>
				</Grid>
				<Grid item xs={12} id='editor-control-inline-styles' className='a11yEditor-controls'>
					<InlineStyleControls type={'full'} dataEditor={editorState} onToggle={toggleInlineStyle}/>
				</Grid>
				{
					// <Grid item xs={12} id='editor-control-colors' className='a11yEditor-controls'>
					// 				<ColorControls editorState={editorState} onToggle={toggleColor} />
					// 			</Grid>
				}
				<Grid item xs={12} className={classNameEditor}>
					<TextEditor
						id={props.id}
						error={props.error}
						label={props.label}
						required={props.required}
						ariaLabelledBy={props.ariaLabelledBy}
						placeholder={props.placeholder}
						dataEditor={{
							handleKeyCommand: handleKeyCommand,
							handlePastedText: handlePastedText,
							keyBindingFn: keyBindingFn,
							onTab: onTab,
							onClick: onClick,
							onChange: onChange,
							editor,
							editorState,
							classNameEditor,
							classNameLabel,
							classNameAsterisk
						}}
					/>
				</Grid>
				<div className = { inDevelopment ? '' : 'hide' } >
					<details>
						<summary>
							<mark>DEVELOPMENT PURPOSE: output as semantic html (accessibility)</mark>
						</summary>
						<Grid container spacing={1} direction='row' justify='flex-start' >
							<Grid item lg>
								<pre>
									{outputHtml}
								</pre>
							</Grid>
							<Grid item lg>
								<pre>
									{renderContentAsRawJs()}
								</pre>
							</Grid>
						</Grid>
					</details>
				</div>
			</Grid>,
			<HeadingFeedback show={showFeedback} message={feedback} link={feedbackLink} onClose={feedbackClose} onGoTo={feedbackGoto}/>

		</React.Fragment>
	);
}

//no styles or block types
export function SimpleTextEditor(props) {
	const {
		handleKeyCommand: handleKeyCommand,
		keyBindingFn: keyBindingFn,
		onTab: onTab,
		onClick: onClick,
		onChange: onChange,
		renderContentAsRawJs: renderContentAsRawJs,
		editor,
		editorState,
		outputHtml,
		classNameEditor,
		classNameLabel,
		classNameAsterisk
	} = useEditor(props);

	return (
		<React.Fragment>
			<Grid container direction='column' justify='flex-start' alignments='flex-start'spacing={0} className='a11yEditor-root'>
				<Grid item xs={12} className={classNameEditor}>
					<TextEditor
						id={props.id}
						error={props.error}
						label={props.label}
						required={props.required}
						ariaLabelledBy={props.ariaLabelledBy}
						placeholder={props.placeholder}
						dataEditor={{
							handleKeyCommand: handleKeyCommand,
							handlePastedText: handlePastedText,
							keyBindingFn: keyBindingFn,
							onTab: onTab,
							onClick: onClick,
							onChange: onChange,
							editor,
							editorState,
							classNameEditor,
							classNameLabel,
							classNameAsterisk
						}}
					/>
				</Grid>
				<div className = { inDevelopment ? '' : 'hide' } >
					<details>
						<summary>
							<mark>DEVELOPMENT PURPOSE: output as semantic html (accessibility)</mark>
						</summary>
						<Grid container spacing={1} direction='row' justify='flex-start' >
							<Grid item lg>
								<pre>
									{outputHtml}
								</pre>
							</Grid>
							<Grid item lg>
								<pre>
									{renderContentAsRawJs()}
								</pre>
							</Grid>
						</Grid>
					</details>
				</div>
			</Grid>,
			<HeadingFeedback show={showFeedback} message={feedback} link={feedbackLink} onClose={feedbackClose} onGoTo={feedbackGoto}/>

		</React.Fragment>
	);
}

class Line extends React.Component {
	render() {
		let block =  this.props.children[0].props.children.props.block;
		let contentState =  this.props.children[0].props.children.props.contentState;
		const lineNumber = contentState.getBlockMap().toList().findIndex(item => item.key === block.key) + 1;
		let elem = this.props.elem;

	 	switch (elem) {
		case 'h1':
		  return( 
		  	<React.Fragment>
		  		<span className="a11yEditor-line" data-line-number={lineNumber}>
		  		<h1 className="a11yEditor-lineText"><DraftJS.EditorBlock {...this.props.children[0].props.children.props} /></h1>
				</span>
		  	</React.Fragment>
			);
		case 'h2':
		  return( 
		  	<React.Fragment>
		  		<h2 className="a11yEditor-line" data-line-number={lineNumber}>
					<DraftJS.EditorBlock {...this.props.children[0].props.children.props} />
				</h2>
		  	</React.Fragment>
			);
		case 'h3':
		  return( 
		  	<React.Fragment>
		  		<h3 className="a11yEditor-line" data-line-number={lineNumber}>
					<DraftJS.EditorBlock {...this.props.children[0].props.children.props} />
				</h3>
		  	</React.Fragment>
			);
		case 'h4':
		  return( 
		  	<React.Fragment>
		  		<h4 className="a11yEditor-line" data-line-number={lineNumber}>
					<DraftJS.EditorBlock {...this.props.children[0].props.children.props} />
				</h4>
		  	</React.Fragment>
			);
		case 'h5':
		  return( 
		  	<React.Fragment>
		  		<h5 className="a11yEditor-line" data-line-number={lineNumber}>
					<DraftJS.EditorBlock {...this.props.children[0].props.children.props} />
				</h5>
		  	</React.Fragment>
			);
		case 'h6':
		  	return( 
		      	<React.Fragment>
		      		<h6 className="a11yEditor-line" data-line-number={lineNumber}>
						<DraftJS.EditorBlock {...this.props.children[0].props.children.props} />
					</h6>
		      	</React.Fragment>
			);
		default:
			return (
		  	<React.Fragment>
		  		<span className="a11yEditor-line" data-line-number={lineNumber}>
						<DraftJS.EditorBlock {...this.props.children[0].props.children.props} />
					</span>
		  	</React.Fragment>
			);
		}	
	}
}

function TextEditor(props) {
	return (
		<React.Fragment>
			<label className={props.dataEditor.classNameLabel} data-shrink='false' htmlFor={props.id + '-Editor'}>
				{props.label}
				{
					props.required &&
					<span className={props.dataEditor.classNameAsterisk}>&thinsp;*</span>
				}
			</label>
			<DraftJS.Editor
				id={props.id + '-Editor'}
				editorKey={props.id + '-Editor'}
				editorState={props.dataEditor.editorState}
				onChange={React.useCallback(props.dataEditor.onChange)}
				onClick={React.useCallback(props.dataEditor.onClick)}
				handleKeyCommand={React.useCallback(props.dataEditor.handleKeyCommand)}
				// handlePastedText={React.useCallback(props.dataEditor.handlePastedText)}
				keyBindingFn={React.useCallback(props.dataEditor.keyBindingFn)}
				onTab={React.useCallback(props.dataEditor.onTab)}
				ariaMultiline={true}
				ariaLabelledBy={props.ariaLabelledBy}
				ariaDescribedBy={props.ariaDescribedBy}
				placeholder={props.placeholder}
				ref={props.dataEditor.editor}
				error={props.error}
				blockStyleFn={blockStyleFn}
				blockRenderMap={extendedBlockRenderMap}
				customStyleMap={colorStyleMap}
				stripPastedStyles={true} //remove styles from pasted text
			/>
		</React.Fragment>
	);
}

const extendedBlockRenderMap = DraftJS.DefaultDraftBlockRenderMap.merge(
	Map({
		'header-one': {
			element: 'h1',
			//wrapper: <Line  elem={'h1'}/>
		},
		'header-one-error': {
			element: 'h1',
			//wrapper: <Line elem={'h1'}/>
		},
		'header-two-error': {
			element: 'h2',
			//wrapper: <Line elem={'h2'}/>
		},
		'header-three-error': {
			element: 'h3',
			//wrapper: <Line elem={'h3'}/>
		},
		'header-four-error': {
			element: 'h4',
			//wrapper: <Line elem={'h4'}/>
		},
		'header-five-error': {
			element: 'h5',
			//wrapper: <Line elem={'h5'}/>
		},
		'header-six-error': {
			element: 'h6',
			//wrapper: <Line elem={'h6'}/>
		},
		'unstyled': {
			element: 'p',
			//wrapper: <Line elem={'p'}/>
		}
	})
);

const colorStyleMap = {
	black: {
		color: 'rgba(0,0,0,1)'
	},
	red: {
		color: 'rgba(255, 0, 0, 1.0)'
	},
	orange: {
		color: 'rgba(255, 127, 0, 1.0)'
	},
	yellow: {
		color: 'rgba(180, 180, 0, 1.0)'
	},
	green: {
		color: 'rgba(0, 180, 0, 1.0)'
	},
	blue: {
		color: 'rgba(0, 0, 255, 1.0)'
	},
	indigo: {
		color: 'rgba(75, 0, 130, 1.0)'
	},
	violet: {
		color: 'rgba(127, 0, 255, 1.0)'
	}
};

function blockStyleFn(contentBlock) {
	if (contentBlock.type.includes('header') && contentBlock.type.includes('error')) {
		return 'a11yEditor-error-heading';
	}

	return '';
}

// ///////////////////////////////////////////////////////////////////////////
function treeOutput(blocks, index = 0, control = 0, line = '') {
	if (index === blocks.length) {
		return;
	}

	if (blocks[index].childs.length === 0) {
		console.log ('[' + control + ']' + line + blocks[index].key);
		return;
	}

	for (let i = 0; i < blocks.length; i = i + (control === 0 ? 1 : control)) {
		if (control >= blocks.length) {
			control -= 1;
		}

		console.log('[' + control + ']' + line + blocks[i].key + '\t' + blocks[control].key);

		for (let c = 0; c < blocks[i].childs.length; c++) {
			control = treeChildOutput(blocks, blocks[blocks.findIndex(b => b.key === blocks[i].childs[c])], control, line + '...');
		}

		control++;
	}
	console.log('..................................');
}

function treeChildOutput(blocks, leaf, control, line) {
	control++;
	console.log ('[' + control + ']' + line + leaf.key + '\t' + blocks[control].key);

	if (leaf.childs.length === 0) {
		// control++;
		return control;
	}

	leaf.childs.map(l=> {
		control = treeChildOutput(blocks, blocks[blocks.findIndex(b=> b.key === l)], control++, line + '...');
	});

	return control;
}

function treeCount(blocks, leaf, count = 0, teste = '...') {
	if (leaf.childs.length === 0) {
		console.log (teste+ leaf.key+': '+(count+1));
		return count+=1;
	}

	leaf.childs.map(l=> {
		count = treeCount(blocks, blocks[blocks.findIndex(b=> b.key === l)], count, teste+teste); 
	});

	count+=1;
	console.log (teste+ leaf.key+ ': '+count);
	return count;
}

function insertKey(blocks, item, block) {
	let itemIndex = -1;
	// block
	if (typeof item === 'object' && item !== null) {
		itemIndex = blocks.indexOf(item);
	} else {
	// key
		itemIndex = blocks.findIndex(b =>b.key === item);
		item = blocks[itemIndex];
	}

	if (block.length === 0 || blocks.length -1 === itemIndex) {
		block.push(item.key);
	} else {
		for (var index = block.length-1; index >= 0; index--) {
			// index of childs list
			let blockItem = block[index];
			// index of blockheaders list
			let blockItemIndex = blocks.findIndex(b=> b.key === blockItem);

			if (blockItemIndex > itemIndex) {
				continue;
			}

			// é o mesmo?
			if (blockItemIndex === itemIndex) {
				break;
			}

			block.splice(index + 1, 0, item.key);
			break;
		}
	}
}

function getHisGrandParent(blocks, index) {
	let parentIndex = blocks.findIndex(b => b.key === blocks[index].parent);
	let granpaKey = blocks[parentIndex].parent;
	// granpaIndex
	return blocks.findIndex(b => b.key === granpaKey);
}

function getMyParent(blocks, currentValue, whoIndex, grandParentIndex = -1) {
	if (grandParentIndex === -1) {
		grandParentIndex = getHisGrandParent(blocks, whoIndex);
	} else {
		grandParentIndex = getHisGrandParent(blocks, grandParentIndex);
	}

	let parentValue = typeToValue(blocks[grandParentIndex].type);

	// find my brother
	if (currentValue - parentValue === 0) {
		let parentKey = blocks[grandParentIndex].parent;
		return {
			myParentKey: parentKey,
			myParentIndex: blocks.findIndex(b=>b.key === parentKey)
		};
	}

	// find my parent
	if (currentValue - parentValue === 1) {
		return {
			myParentKey: blocks[grandParentIndex].parent,
			myParentIndex: grandParentIndex
		};
	}

	return getMyParent(blocks, currentValue, -1, grandParentIndex);
}


// ///////////////////////////////////////////////////////////////////////////

function typeToValue(type) {
	if (type.includes('-error')) {
		let ptype = type.substring(0, type.indexOf('-error'));
		return HEADERS.find(h => h.header === ptype).value;
	}
	return HEADERS.find(h => h.header === type).value;
}

function valueToType(value) {
	return HEADERS.find(h => h.value === value).header;
}

function typeToLabel(type) {
	return BLOCK_TYPES.find(h => h.style === type).label;
}

const useEditor = (props) => {
	const [editorState, setEditorState] = React.useState(DraftJS.EditorState.createEmpty());

	const editor = React.useRef(null);
	// menu buttons
	const [alignment, setAlignment] = React.useState('left'); // todo

	// output parse
	const [outputHtml, setOutputHtml] = React.useState('');
	const [outputRaw, setOutputRaw] = React.useState('');

	// a function to only read localstorage at first render
	const initialRaw = () => { localStorage.getItem(props.editorData) || ''; };
	const [inputRaw, setInputRaw] = React.useState(initialRaw);

	const [classNameEditor, setClassNameEditor] = React.useState('a11yEditor-editor');
	const [classNameLabel, setClassNameLabel] = React.useState('a11yEditor-label');
	const [classNameAsterisk, setClassNameAsterisk] = React.useState('a11yEditor-asterisk');

	const [prevBlockToggled, setPrevBlockToggled] = React.useState('');
	const [lastBlockToggled, setLastBlockToggled] = React.useState('');

	// manage headers validation
	const [blockHierarchy, setBlockHierarchy] = React.useState([]);
	const [lastBlockHeader, setLastBlockHeader] = React.useState('');
	const [previousBlockHeader, setPreviousBlockHeader] = React.useState('');
	// list of header that was selected to 'delete'
	const [deletedHeaders, setDeletedHeaders] = React.useState([]);
	var blocksErrorStatusChanged = [];

	const [openSnackBar, setOpenSnackBar] = React.useState(false);
	const [snackBarMessage, setSnackBarMessage] = React.useState('');
	const [snackBarLink, setSnackBarLink] = React.useState('');

	useEffect(() => {
		treeOutput(blockHierarchy, index = 0, control = 0, line = '');

		const currentContent = editorState.getCurrentContent();

		deletedBlocks();

		let optionsStateToHTML = {
			blockRenderers: {
				'header-one-error': (block) => {
					return '<h1>' + escape(block.getText()) + '</h1>';
				},
				'header-two-error': (block) => {
					return '<h2>' + escape(block.getText()) + '</h2>';
				},
				'header-three-error': (block) => {
					return '<h3>' + escape(block.getText()) + '</h3>';
				},
				'header-four-error': (block) => {
					return '<h4>' + escape(block.getText()) + '</h4>';
				},
				'header-five-error': (block) => {
					return '<h5>' + escape(block.getText()) + '</h5>';
				},
				'header-six-error': (block) => {
					return '<h6>' + escape(block.getText()) + '</h6>';
				}
			},
			inlineStyles: {
				black: {
					color: 'rgba(0,0,0,1)'
				},
				red: {
					color: 'rgba(255, 0, 0, 1.0)'
				},
				orange: {
					color: 'rgba(255, 127, 0, 1.0)'
				},
				yellow: {
					color: 'rgba(180, 180, 0, 1.0)'
				},
				green: {
					color: 'rgba(0, 180, 0, 1.0)'
				},
				blue: {
					color: 'rgba(0, 0, 255, 1.0)'
				},
				indigo: {
					color: 'rgba(75, 0, 130, 1.0)'
				},
				violet: {
					color: 'rgba(127, 0, 255, 1.0)'
				}
			}
		};

		setOutputHtml(stateToHTML(currentContent, optionsStateToHTML));

		let raw = DraftJS.convertToRaw(currentContent);
		setOutputRaw(raw);
		localStorage.setItem('editorData', JSON.stringify(raw));

		// const txt = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
		if (props.onChange !== undefined) {
			props.onChange({
				target: { name: props.name, value: currentContent.getPlainText('\u0001') }
			});
		}

		if(props.hasLevelError !== undefined){
			props.hasLevelError(blockHierarchy.findIndex(b => b.error) === -1)
		}

	}, [editorState]);

	useEffect(() =>{
		// console.log('Effect B');
		let error = false;
		let type = lastBlockToggled;
		let prevType = prevBlockToggled;
		let blockKey = '';
	}, [lastBlockToggled]);

	useEffect(() => {

	}, []);

	useEffect(() => {
		updateClass();
	});

	function updateClass() {
		const currentContent = editorState.getCurrentContent();
		const validation = props.error;

		let classEditor = 'a11yEditor-editor';
		let classNameLbl = 'a11yEditor-label';
		let classNameAstsk = 'a11yEditor-asterisk';
		let showPlaceholder = false;
		let showLabelInside = true;
		let showFocus = false;

		if (validation) {
			classEditor += ' a11yEditor-error';
			classNameLbl += ' a11yEditor-labelError';
			setClassNameAsterisk(classNameAstsk + ' a11yEditor-labelError');
		}

		if (editorState.getSelection().hasFocus) {
			showPlaceholder = true;
			showLabelInside = false;
			showFocus = true;
		} else {
			showLabelInside = true;
			showPlaceholder = false;
			showFocus = false;
		}

		if (currentContent.hasText()) {
			showLabelInside = false;
			showPlaceholder = false;
		} else if (currentContent.getBlockMap().first().getType() !== 'unstyled') {
			showPlaceholder = false;
		}

		classNameLbl += (showLabelInside ? '' : ' a11yEditor-labelShrink');
		classEditor += (showPlaceholder ? '' : ' a11yEditor-hidePlaceholder');
		classEditor += (showFocus ? ' a11yEditor-focused' : '');
		classNameLbl += (showFocus ? ' a11yEditor-labelFocused' : '');


		setClassNameEditor(classEditor);
		setClassNameLabel(classNameLbl);
	}

	function getActiveBlockType() {
		const selection = editorState.getSelection();
		return editorState
			.getCurrentContent()
			.getBlockForKey(selection.getStartKey())
			.getType();
	}


	const handlePastedText = (text: string, html?: string): boolean => {
		if (html !== '') {
			let blocks = [...blockHierarchy ];
			const blockMap = DraftJS.ConvertFromHTML(html);

			blockMap.map( block => {
				if (HEADER_TYPES.includes(block.type)) {
					blocks.push({
						key: block.key,
						type: block.type,
						error: false,
						siblings: [],
						childs: [],
						parent: '',
						pasted: true
					});
				}
			});
		}

	    return false;
	};

	function keyCommandInsertNewline(editorState) {
		console.log('keyCommandInsertNewline');
		const contentState = DraftJS.Modifier.splitBlock(
			editorState.getCurrentContent(),
			editorState.getSelection()
		);
		return DraftJS.EditorState.push(editorState, contentState, 'split-block');
	}

	/* Event handlres */
	const handleKeyCommand = (command) => {
		if (command === 'focus-editor-after-undo') {
			const newEditorState = DraftJS.EditorState.undo(
				this.state.editorState
			);
			this.onChange(
				DraftJS.EditorState.forceSelection(
					newEditorState,
					newEditorState.getSelection()
				)
			);
			return 'handled';
		}

		if (command === 'delete') {
			// TODO: there is a bug in delete function of draft. So for now, tool will not support "delete"
			return 'handled';
			let currentContent = editorState.getCurrentContent();

			let selectedBlocks = DraftJSUtils.getSelectedBlocks(currentContent, editorState.getSelection().getAnchorKey(), editorState.getSelection().getEndKey()).filter(b => HEADER_TYPES.includes(b.type));

			if (selectedBlocks.length > 0) {
				setDeletedHeaders(selectedBlocks);
			}
		}

		if (command === 'split-block') {
			let prevType = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey()).getType();

			let newLineType = 'unstyled';

			if (HEADER_TYPES.includes(prevType) || prevType === 'blockquote') {
				newLineType = 'paragraph';

				let newEditorState = keyCommandInsertNewline(editorState);

				newContentState = DraftJS.Modifier.setBlockType(newEditorState.getCurrentContent(), newEditorState.getSelection(), newLineType);

				newEditorState = DraftJS.EditorState.push(newEditorState, newContentState, 'change-block-type');


				setEditorState(newEditorState);
				return 'handled';
			}
		}

		let newState = DraftJS.RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			if (command === 'backspace') {
				let currentKey = editorState.getSelection().getStartKey();
				let prevType = editorState.getCurrentContent().getBlockForKey(currentKey).getType();

				if (HEADER_TYPES.includes(prevType)) {
					let nextType = newState.getCurrentContent().getBlockForKey(newState.getSelection().getStartKey()).getType();
					if (nextType === 'unstyled') {
						let currentIndex = indexOfBlockInEditorState(currentKey, prevType);

						const { blocks: blocks } = changedHeaderType(blockHierarchy, currentIndex, currentKey, nextType);

						blocksErrorStatusChanged.map(blockItem => {
							newState = setBlockError(newState, blockItem);
						});

						setBlockHierarchy(blockHierarchy);
					}
				}
			}

			onChange(newState);
			return 'handled';
		}

		if (command === 'myeditor-save') {
			// TODO: Perform a request to save your contents, set a new `editorState`, etc.
		 return 'handled';
		}

		if (command === 'toggle-block-h1') {
			toggleBlockType(HEADER_ONE);
			return 'handled'
		} else if (command === 'toggle-block-h2') {
			toggleBlockType(HEADER_TWO);
			return 'handled'
		} else if (command === 'toggle-block-h3') {
			toggleBlockType(HEADER_THREE);
			return 'handled'

		} else if (command === 'toggle-block-h4') {
			toggleBlockType(HEADER_FOUR);
			return 'handled'

		} else if (command === 'toggle-block-h5') {
			toggleBlockType(HEADER_FIVE);
			return 'handled'

		} else if (command === 'toggle-block-h6') {
			toggleBlockType(HEADER_SIX);
			return 'handled'

		}

		return 'not-handled';
	};

	/* Event handlres */
	function keyBindingFn(e: SyntheticKeyboardEvent): string {
		// console.log('key: '+ e.keyCode);
		// console.log('isCtrlKeyCommand: '+ DraftJS.KeyBindingUtil.isCtrlKeyCommand(e));
		// console.log('hasCommandModifier: '+ DraftJS.KeyBindingUtil.hasCommandModifier(e));

		if (e.keyCode === 83 /* `S` key */
			&& (DraftJS.KeyBindingUtil.hasCommandModifier(e) || DraftJS.KeyBindingUtil.isCtrlKeyCommand(e))) {
			return 'myeditor-save';
		}

		if (
			((e.keyCode >= 97 && e.keyCode <= 102) || (e.keyCode >= 49 && e.keyCode <= 54))  /* 1 to 6*/
			&& (DraftJS.KeyBindingUtil.hasCommandModifier(e) || DraftJS.KeyBindingUtil.isCtrlKeyCommand(e))) {
			switch (e.keyCode) {
			case 97:
			case 49:
				return 'toggle-block-h1';
			case 98:
			case 50:
				return 'toggle-block-h2';
			case 99:
			case 51:
				return 'toggle-block-h3';
			case 100:
			case 52:
				return 'toggle-block-h4';
			case 101:
			case 53:
				return 'toggle-block-h5';
			case 102:
			case 54:
				return 'toggle-block-h6';
			default:
				break;
			}
		}
		return DraftJS.getDefaultKeyBinding(e);
	}

	/* Event handlres */
	const onTab = (event) => {
		const maxDepth = 4;
		onChange(DraftJS.RichUtils.onTab(event, editorState, maxDepth));
	};

	/* Event handlres */
	const onClick = () => {
		focusEditor();
	};

	/* Event handlres */
	const onChange = (newEditorState) => {
		let filteredState = newEditorState;

		// const pasted = newEditorState.getCurrentContent() !== editorState.getCurrentContent() && newEditorState.getLastChangeType() === 'insert-fragment';

		// if (pasted) {
		// 	filteredState = filterEditorState({
		// 		// Whitelist of allowed block types. unstyled and atomic are always included.
		// 		blocks: [ 'header_one', 'header_two', 'header_three'],
		// 		// Whitelist of allowed inline styles.
		// 		styles: ['BOLD'],
		// 		// // Whitelist of allowed entities.
		// 		// entities: [
		// 		// 	{
		// 		// 		// Entity type, eg. "LINK"
		// 		// 		type: 'IMAGE',
		// 		// 		// Allowed attributes. Other attributes will be removed. If this is omitted, all attributes are kept.
		// 		// 		attributes: ['src'],
		// 		// 		// Refine which entities are kept by whitelisting acceptable values with regular expression patterns.
		// 		// 		// It's also possible to use "true" to signify that a field is required to be present,
		// 		// 		// and "false" for fields required to be absent.
		// 		// 		// If this is omitted, all entities are kept.
		// 		// 		whitelist: {
		// 		// 			src: 'ĥttp'
		// 		// 		}
		// 		// 	}
		// 		// ],
		// 		// // // Maximum amount of depth for lists (0 = no nesting).
		// 		// // maxNesting: number,
		// 		// // Characters to replace with whitespace.
		// 		whitespacedCharacters:  ['\n', '\t']
		// 	},
		// 	filteredState
		// 	);

		// 	let blockMap = getBlockMapOfHeaders(filteredState);

		// 	let pastedBlocks = [...blockHierarchy.filter(b=> b.pasted)];

		// 	for (let indexPBlock = 0; i < pastedBlocks.length; i++) {
		// 		let indexBM = blockMap.findIndex(b => b.key === pastedBlocks[indexPBlock].key);
		// 	}
		// 	blockMap.slice(blockMap.length - pastedBlocks.length, pastedBlocks.length);
		// }

		setEditorState(filteredState);
	};

	/* Event handlres */
	function toggleColor(toggledColor) {
		// from https:// github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/color/color.html
		const selection = editorState.getSelection();

		// Let's just allow one color at a time. Turn off all active colors.
		const nextContentState = Object.keys(colorStyleMap)
			.reduce((contentState, color) => {
				return DraftJS.Modifier.removeInlineStyle(contentState, selection, color);
			}, editorState.getCurrentContent());

		let nextEditorState = DraftJS.EditorState.push(
			editorState,
			nextContentState,
			'change-inline-style'
		);

		const currentStyle = editorState.getCurrentInlineStyle();

		// Unset style override for current color.
		if (selection.isCollapsed()) {
			nextEditorState = currentStyle.reduce((state, color) => {
				return DraftJS.RichUtils.toggleInlineStyle(state, color);
			}, nextEditorState);
		}

		// If the color is being toggled on, apply it.
		console.log(!currentStyle.has(toggledColor));
		if (!currentStyle.has(toggledColor)) {
			nextEditorState = DraftJS.RichUtils.toggleInlineStyle(
				nextEditorState,
				toggledColor
			);
		}

		onChange(DraftJS.RichUtils.toggleInlineStyle(nextEditorState, toggledColor));
	}

	/* Event handlres */
	function toggleInlineStyle(inlineStyle) {
		onChange(DraftJS.RichUtils.toggleInlineStyle(editorState, inlineStyle));
	}

	/* Event handlres */
	function toggleBlockType(type) {
		// console.log(lastBlockToggled);
		let prevType = getActiveBlockType();
		type = prevType === type ? 'paragraph' : type;

		if (HEADER_TYPES.includes(prevType)) {
			// remove header or changing type of head
			toggleBlockHeader(type, false);
		} else if (HEADER_TYPES.includes(type)) {
			// add header 
			toggleBlockHeader(type, true);
		} else {
			onChange(DraftJS.RichUtils.toggleBlockType(editorState, type));
		}
	}

	function snackbarOnClose() {
		setOpenSnackBar(false);
		setSnackBarMessage('');
		setSnackBarLink('');
	}

	function snackbarOnGoTo() {
		let currentContent = editorState.getCurrentContent();
		let oi = blocksErrorStatusChanged;
		let la = blockHierarchy;

		// let selectedBlocks = DraftJSUtils.getSelectedBlocks(currentContent, editorState.getSelection().getAnchorKey(), editorState.getSelection().getEndKey()).filter(b => HEADER_TYPES.includes(b.type));

		// if (selectedBlocks.length > 0) {
		// 	setDeletedHeaders(selectedBlocks);
		// }

		// const newSelection = selectionState.merge({
		  //       anchorOffset: selectionState.getAnchorOffset() + 1,
		  //       focusOffset: selectionState.getAnchorOffset() + 1,
		  //     });

		  //     const newEditorState = EditorState.forceSelection(
		  //       editorState,	
		  //       newSelection,
		  //     );

		  //     this.setState({ editorState: newEditorState });
	}

	/* HEADER_FLOW 001 */
	function toggleBlockHeader(type, toggle) {
		let error = false;
		let blocks = [...blockHierarchy];
		const currentKey = editorState.getSelection().getStartKey();
		let currentIndex = indexOfBlockInEditorState(currentKey, type);

		if (toggle) {
			if (blocks.length === 0 && typeToValue(type) > 1) {
				// type = type+'-error';
				error = true;
				blocks.push({
					key: currentKey,
					type: type,
					error: error,
					siblings: [],
					childs: [],
					parent: ''
				});
				currentIndex = 0;
			} else {
				// insert new entry in the rigth sequence
				blocks.splice(currentIndex, 0,
					{
						key: currentKey,
						type: type,
						error: error,
						siblings: [],
						childs: [],
						parent: ''
					}
				);
			}

			error = HeaderValidation(blocks, type, currentIndex, currentKey);
		} else { //changed or removed block

			if(currentIndex === -1) //removed
			{

			}
			let result = changedHeaderType(blocks, currentIndex, currentKey, type, error);

			if (result.blockRemoved) {
				currentIndex = -1;
			}

			error = result.error;

			blocks = [...result.blocks];
		}

		if (error) {
	        if (openSnackBar) {
	        	setOpenSnackBar(false);
	        }

	        setSnackBarMessage('Last selected title level was ' + typeToLabel(blocks[currentIndex].type) + ', but was expected a title level ' + typeToLabel(blocks[currentIndex].errorMsg));
        	setSnackBarLink(blocks[currentIndex].key);
        	setOpenSnackBar(true);
			type = type + '-error';
		}

		if (currentIndex > -1) {
			blocks[currentIndex].type = type;
		}
		setBlockHierarchy(blocks);

		let nextEditorState = DraftJS.RichUtils.toggleBlockType(editorState, type);

		blocksErrorStatusChanged.map(blockItem => {
			nextEditorState = setBlockError(nextEditorState, blockItem);
		});

		onChange(nextEditorState);
	}

	/* HEADER_FLOW 005 */
	function changedHeaderType(blocks, currentIndex, currentKey, type, error) {
		blocks[currentIndex].type = type;
		blocks[currentIndex].error = false; //initial value

		// MANAGE CHILDS
		// set childs to immediate previous sibling
		if (blocks[currentIndex].childs.length > 0) {
			// TODO: if current has parent, get from list of childs the immediate previous subling
			let siblings = blocks.find(b => {
				b.parent === blocks[currentIndex].parent && b.type === blocks[currentIndex].type;
			});

			if (siblings === undefined) {
				siblings = [];
			}

			let success = false;

			// if has siblings try to set childs to sibling
			for (let i = siblings.length - 1; i >= 0; i--) {
				let indexOfSibling = blocks.indexOf(siblings[i]);

				if (indexOfSibling > currentIndex) {
					continue;
				}

				if (indexOfSibling < currentIndex) {
					blocks[currentIndex].childs.map(child => {
						child.parent === blocks[indexOfSibling].key;
					});

					blocks[indexOfSibling].childs = [...blocks[indexOfSibling].childs, ...blocks[currentIndex].childs];
					success = true;

					break;
				}
			}

			// let childs withou parent
			if (!success) {
				blocks[currentIndex].childs.map(child => {
					let blockItem = blocks[blocks.findIndex(b => b.key === child)];
					blockItem.error = true;
					blockItem.parent = '';
					setBlockErrorList(blockItem);
				});
			}

			blocks[currentIndex].childs = [];
		}

		// manage parent
		if (blocks[currentIndex].parent !== '') {
			let parentIndex = blocks.findIndex(b=> b.key === blocks[currentIndex].parent);
			let parent = blocks[parentIndex];
			if (parent.childs.length === 1) {
				parent.childs = [];
			} else {
				parent.childs.splice(parent.childs.indexOf(currentKey), 1);
			}
		}

		let removed = false;
		// remove header
		if (!HEADER_TYPES.includes(type)) {
			blocks.splice(currentIndex, 1);
			removed = true;
		// changed header type
		} else {
			error = HeaderValidation(blocks, type, currentIndex, currentKey);
		}

		if (error === undefined) {
			error = false;
		}

		return {
			error: error,
			blockRemoved: removed,
			blocks: blocks
		};
	}
	/* HEADER_FLOW 002 */
	function HeaderValidation(blocks, currentType, currentIndex, currentKey) {
		// TODO incluir validação via enter e ctrl v
		let currentValue = typeToValue(currentType);

		let parentKey = -1;
		let parentIndex = -1;

		if (currentIndex === 0) {
			setAdoptedChild(blocks, [], currentIndex, currentKey, currentValue);

			if (currentType !== HEADER_ONE) {
				blocks[currentIndex].error = true;
				blocks[currentIndex].parent = '';
				blocks[currentIndex].errorMsg = HEADER_ONE;
			}
		} else {
			// previous header in list
			let prevType = blocks[currentIndex - 1].type;
			let prevValue = typeToValue(prevType);
			let prevKey = blocks[currentIndex - 1].key;

			let depth = currentValue - prevValue;

			if (depth === 0) {
			// sibling
				parentKey = blocks[currentIndex - 1].parent;
				parentIndex = blocks.findIndex(b => b.key === parentKey);

				setHeaderChilds(blocks, currentIndex, currentType, currentKey, currentValue, parentIndex, parentKey);
			} else if (depth === 1) {
			// child
				parentIndex = currentIndex - 1;
				parentKey = prevKey;

				setHeaderChilds(blocks, currentIndex, currentType, currentKey, currentValue, currentIndex - 1, prevKey);
			} else if (depth < 0) {
			// deep in genalogic tree
				if (depth === -1) {
				// nephew
					let siblingIndex =blocks.findIndex(b => b.key === blocks[currentIndex - 1].parent);
					parentKey = blocks[siblingIndex].parent;
					parentIndex = blocks.findIndex(b => b.key === parentKey);

					setHeaderChilds(blocks, currentIndex, currentType, currentKey, currentValue, parentIndex, parentKey);
				} else {
					let{
						myParentKey,
						myParentIndex
					} = getMyParent(blocks, currentValue, currentIndex - 1);
					parentKey = myParentKey;
					parentIndex = myParentIndex;
					setHeaderChilds(blocks, currentIndex, currentType, currentKey, currentValue, parentIndex ,parentKey);
				}
			} else if (depth > 1) {
			// oops, your are neighbour's child?
				blocks[currentIndex].parent = '';
				blocks[currentIndex].error = true;
				blocks[currentIndex].errorMsg = valueToType(prevValue + 1);
			}
		}

		if (parentIndex !== -1 && currentValue - typeToValue(blocks[parentIndex].type) > 1) {
			blocks[currentIndex].error = true;
			blocks[currentIndex].parent = '';
			// setBlockErrorList(blocks[currentIndex]);
		//	blocks[currentIndex].errorMsg = 'Is expected a Header One level';
		}

		return blocks[currentIndex].error;
	}

	/* HEADER_FLOW 003 */
	function setAdoptedChild(blocks, siblings, currentIndex, currentKey, currentValue) {
		//adpted childs from sibling
		siblings.map((blockItem) => {
			let indexOfBlockItem = blocks.indexOf(blockItem);
			if (indexOfBlockItem < currentIndex) {
				let depthSibling = (indexOfBlockItem - currentIndex)*-1;

				let depthChilds = treeCount(blocks, blockItem);

				// overlaping sibling's childs
				if (depthChilds > depthSibling) {
					let init = currentIndex + 1;
					let end = init + depthChilds - depthSibling;
					let nephews = blocks.slice(init, end).filter(n=> n.parent === blockItem.key);
					nephews.map(nephewItem => {
						console.log('........................................................');	
						console.log(blockItem.key+' had ' + blockItem.childs.length + ' childs');	
						insertKey(blocks, nephewItem, blocks[currentIndex].childs);
						nephewItem.parent = currentKey;
						blockItem.childs.pop(); 	
						console.log('But now');	
						console.log(blockItem.key+' has ' + blockItem.childs.length +' childs');	
						console.log(currentKey+' childs: '+ blocks[currentIndex].childs.length);	
						console.log('........................................................');	
					});
				}
			}
		});

		//adopted orphs
		let orphs = blocks.filter(orph => typeToValue(orph.type) === currentValue + 1 && orph.error && orph.key != currentKey);

		// adopt
		if (orphs.length > 0) {
			console.log(orphs.length + ' orphans ');
			orphs.map(orph =>{
				insertKey(blocks, orph, blocks[currentIndex].childs);
				orph.parent = currentKey;
				orph.error = false;
				setBlockErrorList(orph);
			});
			console.log('........................................................');	
		}
	}

	/* HEADER_FLOW 004 */
	function setHeaderChilds(blocks, currentIndex, currentType, currentKey, currentValue, parentIndex, parentKey) {
		let siblings = [];

		if (parentIndex === -1) {
			siblings = blocks.filter(b => b.type === currentType && b.key !== currentKey && b.parent === '');
		} else {
			// set parent
			blocks[currentIndex].parent = parentKey;

			// update list of childs in parent
			if (parentIndex > -1) {
				insertKey(blocks, currentKey, blocks[parentIndex].childs);
			}

			siblings = blocks.filter(b => b.parent === parentKey && b.key !== currentKey);
		}

		//kill parents?
		if (blocks.length > currentIndex + 1) {
			let nextBlockItem = blocks[currentIndex + 1];

			if (typeToValue(nextBlockItem.type) - currentValue > 1) {
				if (blocks.length === currentIndex + 1) {
					nextBlockItem.error = true;
					nextBlockItem.parent = '';
					setBlockErrorList(orph);
				} else {
					// if (!nextBlockItem.error)
					let newOrphs = blocks.slice(currentIndex).filter(bi => bi.parent === nextBlockItem.parent);
					newOrphs.map((bio =>{
						if (!bio.error) {
							let bioParentIndex = blocks.findIndex(b => b.key === bio.parent);
							if (bioParentIndex > -1) {
								if (blocks[bioParentIndex].childs.length === 1) {
									blocks[bioParentIndex].childs = [];
								} else {
									let bioIndex = blocks[bioParentIndex].childs.indexOf(bio.key);
									blocks[bioParentIndex].childs.splice(bioIndex, 1);
								}
							}

							bio.error = true;
							bio.parent = '';
							setBlockErrorList(bio);
						}
					}));
				}
			}
		}

		setAdoptedChild(blocks, siblings, currentIndex, currentKey, currentValue);
		// setBlockHierarchy(blocks);
	}

	/* HEADER_FLOW 006 */
	function setBlockErrorList(blockItem) {
		let block = {
			key: blockItem.key,
			type: blockItem.type,
			error: blockItem.error,
			parent: blockItem.parent
		};

		if (blocksErrorStatusChanged.length === 0) {
			blocksErrorStatusChanged.push(block);
		} else {
			let i = blocksErrorStatusChanged.findIndex(b=>b.key === blockItem.key);
			if (i === -1) {
				blocksErrorStatusChanged.push(block);
			} else {
				blocksErrorStatusChanged.slice(i, 0, block);
			}
		}
	}

	/* HEADER FLOW 007 */
	function deletedBlocks() {
		let prevBlocks = blockHierarchy;
		if (deletedHeaders.length > 0) {
			deletedHeaders.map(header => {
				if (getBlockMapOfHeaders(editorState).findIndex( b => b.key === header.key) === -1) {
					// deleted
					const { 
						blocks: blocks, 
					} = changedHeaderType(prevBlocks, prevBlocks.findIndex(b=> b.key === header.key), header.key, '');

					prevBlocks = blocks;
				}
			});
			let newState;
			blocksErrorStatusChanged.map(blockItem => {
				newState = setBlockError(newState, blockItem);
			});

			setDeletedHeaders([]);
			setBlockHierarchy(prevBlocks);
			if (newState !== undefined) {
				onChange(newState);
			}
		}
	}

	/* HEADER FLOW 008 */
	function setBlockError(nextEditorState, blockItem) {
		if (blockItem === undefined) {
			return;
		}

		let newType = '';
		if (blockItem.error) {
			newType = blockItem.type + '-error';
		} else if (blockItem.type.includes('-error')) {
			newType = blockItem.type.substring(0, blockItem.type.indexOf('-error'));
		} else {
			newType = blockItem.type;
		}

		let newSelection = nextEditorState.getSelection().merge({
			anchorKey: blockItem.key,
			anchorOffset: 0,
			focusKey: blockItem.key,
			focusOffset: 2,
			hasFocus: true
		});

		let newContentState = DraftJS.Modifier.setBlockType(nextEditorState.getCurrentContent(), newSelection, newType);
		nextEditorState = DraftJS.EditorState.push(nextEditorState, newContentState, 'change-block-type');

		return nextEditorState;
	}

	/* draftJS aux 001 */
	function getBlockMapOfHeaders(state = editorState) {
		const blockMap = Array.from(state.getCurrentContent().getBlocksAsArray()).map(item => {
			return { key: item.key, type: item.type };
		});

		if (blockMap === undefined) {
			return [];
		}

		return blockMap;
	}
	/* drafJS aux 002 */
	function indexOfBlockInEditorState(currentKey, type) {
		// Need to get blocks of editor to insert block in blockHierarchy at correct position
		const blockMap = getBlockMapOfHeaders(editorState);

		let currentMapIndex = blockMap.findIndex(block => block.key === currentKey);
		// update type to then filter all headers kind
		blockMap[currentMapIndex].type = type;
		// return list of all header blocks
		let headers = blockMap.filter(contentBlock => HEADER_TYPES.includes(contentBlock.type));
		// update position in linst of header

		let index = headers.findIndex(block => block.key === currentKey);
		if (index === -1) {
			// removed header level
			return currentMapIndex;
		}
		return index;
	}

	function renderContentAsRawJs() {
		return JSON.stringify(outputRaw, null, 2);
	}

	function focusEditor() {
		editor.current.focus();
	}

	const checkEditorContent = () => {
		const content = this.state.editorState.getCurrentContent();
		const isEditorEmpty = !content.hasText();
		const currentPlainText = content.getPlainText();
		const lengthOfEditorContent = currentPlainText.length;
		const lengthOfTrimmedContent = currentPlainText.trim().length;
		const isContainOnlySpaces = !isEditorEmpty && !lengthOfTrimmedContent;

		console.clear();
		console.log('editor empty => ', isEditorEmpty);
		console.log('editor containe only spaces => ', isContainOnlySpaces);
		console.log('editor containe some text (not only spaces) => ', !!(!isEditorEmpty && lengthOfTrimmedContent));
	};

	return {
		handleKeyCommand: handleKeyCommand,
		handlePastedText: handlePastedText,
		keyBindingFn: keyBindingFn,
		onTab: onTab,
		onClick: onClick,
		onChange: onChange,
		toggleInlineStyle: toggleInlineStyle,
		toggleBlockType: toggleBlockType,
		toggleColor: toggleColor,
		renderContentAsRawJs:renderContentAsRawJs,
		showFeedback: openSnackBar,
		feedback: snackBarMessage,
		feedbackLink: snackBarLink,
		feedbackClose: snackbarOnClose,
		feedbackGoto: snackbarOnGoTo,
		editor,
		editorState,
		alignment,
		outputHtml,
		outputRaw,
		classNameEditor,
		classNameLabel,
		classNameAsterisk
	};
};

const HEADER_ONE = 'header-one';
const HEADER_TWO = 'header-two';
const HEADER_THREE = 'header-three';
const HEADER_FOUR = 'header-four';
const HEADER_FIVE = 'header-five';
const HEADER_SIX = 'header-six';

const HEADERS = [
	{ header: HEADER_ONE, value: 1 },
	{ header: HEADER_TWO, value: 2 },
	{ header: HEADER_THREE, value: 3 },
	{ header: HEADER_FOUR, value: 4 },
	{ header: HEADER_FIVE, value: 5 },
	{ header: HEADER_SIX, value:  6 }
];

const HEADER_TYPES = [
	HEADER_ONE,
	HEADER_TWO,
	HEADER_THREE,
	HEADER_FOUR,
	HEADER_FIVE,
	HEADER_SIX,
	HEADER_ONE + '-error',
	HEADER_TWO + '-error',
	HEADER_THREE + '-error',
	HEADER_FOUR + '-error',
	HEADER_FIVE + '-error',
	HEADER_SIX + '-error'
];

const BLOCK_TYPES = [
	{ tip: 'Paragraph', label: 'P', style: 'paragraph' },
	{ tip: 'Title', label: 'Title', style: 'header-one' },
	{ tip: 'Subtitle 1', label: 'Subtitle one', style: 'header-two' },
	{ tip: 'Subtitle 2', label: 'Subtitle two', style: 'header-three' },
	{ tip: 'Subtitle 3', label: 'Subtitle three', style: 'header-four' },
	{ tip: 'Subtitle 4', label: 'Subtitle four', style: 'header-five' },
	{ tip: 'Subtitle 5', label: 'Subtitle five', style: 'header-six' },
	{ tip: 'Unordered', label: 'UL', style: 'unordered-list-item' },
	{ tip: 'Ordered', label: 'OL', style: 'ordered-list-item' },
	{ tip: 'Blockquote', label: 'Quote', style: 'blockquote' }
	// { tip: 'Code', label: 'Code', style: 'code-block' },
	// { tip: 'Atomic', label: 'Atomic', style: 'atomic' }
];

const LEVEL_TYPES = [
	{ tip: 'Paragraph', label: 'Paragraph', style: 'paragraph' },
	{ tip: 'Title', label: 'Title', style: 'header-one' },
	{ tip: 'Subtitle 1', label: 'Subtitle one', style: 'header-two' },
	{ tip: 'Subtitle 2', label: 'Subtitle two', style: 'header-three' },
	{ tip: 'Subtitle 3', label: 'Subtitle three', style: 'header-four' },
	{ tip: 'Subtitle 4', label: 'Subtitle four', style: 'header-five' },
	{ tip: 'Subtitle 5', label: 'Subtitle five', style: 'header-six' },
];

const BLOCK_TYPES_CAPTION = [
	{ tip: 'Title', label: 'Title', style: 'header-four' },
	{ tip: 'Subtitle', label: 'Subtitle', style: 'header-five' },
	{ tip: 'Paragraph', label: 'Paragraph', style: 'paragraph' },
	{ tip: 'Unordered', label: 'Unordered List', style: 'unordered-list-item' },
	{ tip: 'Ordered', label: 'Ordered List', style: 'ordered-list-item' },
	{ tip: 'Quote', label: 'Quote', style: 'blockquote' }
];

const INLINE_STYLES = [
	{ tip: 'Bold', label: 'Bold', style: 'BOLD' },
	{ tip: 'Italic', label: 'Italic', style: 'ITALIC' },
	{ tip: 'Underline', label: 'Underline', style: 'UNDERLINE' }
	// { label: 'Monospace', style: 'CODE' },
];

// This object provides the styling information for our custom color
// styles.
const COLORS = [
	{ tip: 'Black', label: 'Black', style: 'black' },
	{ tip: 'Red', label: 'Red', style: 'red' },
	{ tip: 'Orange', label: 'Orange', style: 'orange' },
	{ tip: 'Yellow', label: 'Yellow', style: 'yellow' },
	{ tip: 'Green', label: 'Green', style: 'green' },
	{ tip: 'Blue', label: 'Blue', style: 'blue' },
	{ tip: 'Indigo', label: 'Indigo', style: 'indigo' },
	{ tip: 'Violet', label: 'Violet', style: 'violet' }
];

function getBlockTypes(type) {
	switch (type) {
	case 'full':
		return [...BLOCK_TYPES];
	case 'caption':
		return [...BLOCK_TYPES_CAPTION];
	default:
		return [];
	}
}

function ControlButtons(props) {
	const onClick = (e) => {
		e.preventDefault();
		//props.onToggle(props.style);
		React.useCallback(props.onToggle(props.style));
	};

	let className = 'a11yEditor-styleButton';
	if (props.active) {
		className += ' a11yEditor-activeButton';
	}
	return (
		<Tooltip title={props.tip} aria-label={props.tip}>
			<ToggleButton
				value={props.style}
				key={props.style}
				aria-label={props.label}
				onClick={onClick}
				className={className}
				tabIndex={0}
			>
				{props.label}
			</ToggleButton>
		</Tooltip>
	);
}

const ColorControls = (props) => {
	let currentStyle = props.editorState.getCurrentInlineStyle();
	return (
		<React.Fragment>
			{COLORS.map((type) =>
				<ControlButtons
					key={type.label}
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
					tip={type.tip}
				/>
			)}
		</React.Fragment>
	);
};

const BlockStyleControls = (props) => {
	const selection = props.dataEditor.getSelection();
	const blockType = props.dataEditor
		.getCurrentContent()
		.getBlockForKey(selection.getStartKey())
		.getType();

	let blockTypes = getBlockTypes(props.type);
	let block_headerlevels = blockTypes.filter( t => HEADER_TYPES.includes(t.style));
	let block_others = blockTypes.filter( t => !HEADER_TYPES.includes(t.style));

	if (props.type === 'full') {
		return (
			<React.Fragment>
				<NativeSelect
					value={ HEADER_TYPES.includes(blockType) ? blockType.includes('-error') ? blockType.substring(0, blockType.indexOf('-error')) : blockType : 'no_header' }
					onChange={ event => {
						props.onToggle(event.target.value);
					}}
					inputProps={{
						name: 'header',
						id: 'header',
						'aria-label': 'Title levels'
					}}
		        >
		        	<option key='no_header' value='no_header' disabled>No title selected</option>
					{ block_headerlevels.map((type) =>
						<option key={type.style} value={type.style}>{type.label}</option>
					)}
		        </NativeSelect>
		        <ToggleButtonGroup
					value={blockType}
					exclusive
					//onChange={handleAlignment}
					aria-label='Block type'
					exclusive
				>
					{ block_others.map((type) =>
						<ControlButtons
							key={type.label}
							active={type.style === blockType}
							label={type.label}
							tip={type.tip}
							onToggle={props.onToggle}
							style={type.style}
						/>
					)}
			</ToggleButtonGroup>
			</React.Fragment>
		);
	}
	return (
		<React.Fragment>
			<ToggleButtonGroup
				value={blockType}
				exclusive
				//onChange={handleAlignment}
				aria-label='Block type'
				exclusive
			>
				{ blockTypes.map((type) =>	
					<ControlButtons
						key={type.label}
						active={type.style === blockType}
						label={type.label}
						tip={type.tip}
						onToggle={props.onToggle}
						style={type.style}
					/>
				)}
			</ToggleButtonGroup>
		</React.Fragment>
	);
};

const InlineStyleControls = (props) => {
	let currentStyle = props.dataEditor.getCurrentInlineStyle();
	return (
		<React.Fragment>
			{INLINE_STYLES.map(type =>
				<ControlButtons
					key={type.label}
					active={currentStyle.has(type.style)}
					label={type.label}
					tip={type.tip}
					onToggle={props.onToggle}
					style={type.style}
				/>
			)}
		</React.Fragment>
	);
};

const HeadingFeedback = (props) =>{
	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left'
			}}
			//open={props.show}
			autoHideDuration={6000}
			onClose={(event, reason) => {
			    if (reason === 'clickaway') {
			      return;
			    }

			    React.useCallback(props.onClose);
			  }
			}
			ContentProps={{
				'aria-describedby': 'message-id',
				'role': 'alert'
			}}
			message={<span id="message-id">{props.message}</span>}
			action={[
				<Button
					key='goTo'
					color="secondary" 
					size="small" 
					onClick={React.useCallback(props.onGoTo)}
					>
					Go to line
				</Button>,
				<IconButton
					key="close"
					aria-label="close"
					color="inherit"
					onClick={React.useCallback(props.onClose)}
				>
					<CloseIcon />
				</IconButton>
			]}
		/>
	);
};


