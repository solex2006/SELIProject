import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';

import { Editor, EditorState, ContentState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { stateToHTML } from "draft-js-export-html";

import Button from '@material-ui/core/Button';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';






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

//TODO: dinamically create buttons; editor for image caption, for longdescription, text
export default function ImageCaptionEditor(props) {
	const  {
		handleKeyCommand: handleKeyCommand,
		onTab: onTab,
		onClick: onClick,
		onChange: onChange,
		toogleInlineStyle: toogleInlineStyle,
		toggleBlockType: toggleBlockType,
		renderContentAsRawJs:renderContentAsRawJs,
		editor,
		editorState,
		alignment,
		blockTypes,
		textSyles,
		outputHtml,
		classNameEditor,
		classNameLabel,
		classNameAsterisk,
		inputRaw,
    } = useEditor(props);
    

	return (
		<Grid item>
			<Grid container direction='column' justify='flex-start' alignments='flex-start'spacing={0} className="a11yEditor-root a11yEditor">
				<Grid item  xs={12} id="editor-control-block-types" value={blockTypes} >
					<ToggleButton
						value='paragraph'
						key="paragraph"
						aria-label="Paragraph"
						onClick={(e) => {
							e.preventDefault();
							(toggleBlockType('paragraph'));}}
						className={"a11yEditor-styleButtonStudent"+( blockTypes === "paragraph"? "a11yEditor-activeButton" : "")}>
						{props.language.textEditor_a11y_paragraph}
					</ToggleButton>
					
					<ToggleButton
						value='header-one'
						key='header-one'
						aria-label="Header One"
						onClick={(e)=>{
							e.preventDefault();
							(toggleBlockType('header-one'));}}
						className={"a11yEditor-styleButtonStudent"+( blockTypes === "header-one"? "a11yEditor-activeButton" : "")}>
						{props.language.textEditor_a11y_title}
					</ToggleButton>
					
					<ToggleButton
						value='header-three'
						key='header-three'
						aria-label="Header three"
						onClick={(e)=>{
							e.preventDefault();
							(toggleBlockType('header-three'));}}
						className={"a11yEditor-styleButtonStudent"+( blockTypes === "header-three"? "a11yEditor-activeButton" : "")}>
						{props.language.textEditor_a11y_subtitle}
					</ToggleButton>
					
					<ToggleButton
						value='unordered-list-item'
						key='unordered-list-item'
						aria-label="Unordered List"
						onClick={(e)=>{
							e.preventDefault();
							(toggleBlockType('unordered-list-item'));}}
						className={"a11yEditor-styleButtonStudent"+( blockTypes === "unordered-list-item"? "a11yEditor-activeButton" : "")}>
						{props.language.textEditor_a11y_unorderedList}
					</ToggleButton>
					<ToggleButton
						value='ordered-list-item'
						key='ordered-list-item'
						aria-label="Ordered List"
						onClick={(e)=>{
							e.preventDefault();
							(toggleBlockType('ordered-list-item'));}}
						className={"a11yEditor-styleButtonStudent"+( blockTypes === "ordered-list-item"? "a11yEditor-activeButton" : "")}>
						{props.language.textEditor_a11y_orderedList}
					</ToggleButton>
					<ToggleButton
						value='blockquote'
						key='blockquote'
						aria-label="Quote"
						onClick={(e)=>{
							e.preventDefault();
							(toggleBlockType('blockquote'));}}
						className={"a11yEditor-styleButtonStudent"+( blockTypes === "blockquote"? "a11yEditor-activeButton" : "")}>
						{props.language.textEditor_a11y_blockQuote}
					</ToggleButton>
					
				</Grid>
				<Grid item  xs={12} id="editor-control-inline-styles" value={textSyles} >
					<ToggleButton
						value='BOLD'
						key="BOLD"
						aria-label="Bold"
						onClick={(e)=>{
							e.preventDefault();
							(toogleInlineStyle('BOLD'));}}
						className={"a11yEditor-styleButtonStudent"+( editorState.getCurrentInlineStyle().has('BOLD')? 'a11yEditor-activeButton' : '')}>
						{props.language.textEditor_a11y_bold}
					</ToggleButton>
					<ToggleButton
						value='ITALIC'
						key="ITALIC"
						aria-label="Italic"
						onClick={(e)=>{
							e.preventDefault();
							(toogleInlineStyle('ITALIC'));}}
						className={"a11yEditor-styleButtonStudent"+( editorState.getCurrentInlineStyle().has('ITALIC')? 'a11yEditor-activeButton' : '')}>
						{props.language.textEditor_a11y_italic}
					</ToggleButton>
					<ToggleButton
						value='UNDERLINE'
						key="UNDERLINE"
						aria-label="Underline"
						onClick={(e)=>{
							e.preventDefault();
							(toogleInlineStyle('UNDERLINE'));}}
						className={"a11yEditor-styleButtonStudent"+( editorState.getCurrentInlineStyle().has('UNDERLINE')? 'a11yEditor-activeButton' : '')}>
						{props.language.textEditor_a11y_undeline}
					</ToggleButton> 
				</Grid>
			</Grid>
		
			<Grid item  xl={12} className={classNameEditor}>	
				<label className={classNameLabel} data-shrink="false" htmlFor={props.id + "-Editor"}>
					{props.label}
					{
						props.required &&
						<span className={classNameAsterisk}>&thinsp;*</span>
					}
				</label>
				<Editor
					editorState={editorState}
					onChange={React.useCallback(onChange)}
					onClick={React.useCallback(onClick)}
					handleKeyCommand={React.useCallback(handleKeyCommand)}
					onTab={React.useCallback(onTab)}
					ariaMultiline={true}
					ariaLabelledBy={props.ariaLabelledBy}
					ariaDescribedBy={props.ariaDescribedBy}
					placeholder={props.placeholder}
					ref={editor}
					error={props.error}
					className="a11yEditor"
				/>
			</Grid>
		</Grid>
	);
}

const useEditor =(props) => {
	
	const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
	const editor = React.useRef(null);
	//menu buttons
	const [alignment, setAlignment] = React.useState('left'); //todo
	const [blockTypes, setBlockTypes] = React.useState('paragraph');
	const [textSyles, setTextStyles] = React.useState(() => []);

	//output parse
	const [outputHtml, setOutputHtml] = React.useState('');
	const [outputRaw, setOutputRaw] = React.useState('');

	//initial
//	const initialRaw = () => { localStorage.getItem(props.editorData) || ''; }; //a function to only read localstorage at first render
//	const [inputRaw, setInputRaw] = React.useState(initialRaw);

	const [classNameEditor, setClassNameEditor] = React.useState('a11yEditor-editor');
	const [classNameLabel, setClassNameLabel] = React.useState('a11yEditor-label');
	const [classNameAsterisk, setClassNameAsterisk] = React.useState('a11yEditor-asterisk');
	  useEffect(() => {
		 if(props.value!=""){
			setEditorState(props.value) 
		 }
		
	}, []);  

	useEffect(() => {
		const currentContent = editorState.getCurrentContent();
		// setBlockTypes(getActiveBlockType());
		setOutputHtml(stateToHTML(currentContent));
		let raw = convertToRaw(currentContent);
		setOutputRaw(raw);
		props.getEditorState(raw)
		if (props.onChange !== undefined)
			props.onChange({target : {name: props.name, value:raw }})//currentContent.getPlainText('\u0001')}});  
	}, [editorState]);

	useEffect(() => {
		updateClass();
	});

	function updateClass() {
		const currentContent = editorState.getCurrentContent();
		const validation = props.error;
		let classEditor = 'a11yEditor-editor';
		let classNameLabel = 'a11yEditor-label';
		let classNameAsterisk = 'a11yEditor-asterisk';
		let showPlaceholder = false;
		let showLabelInside = true;
		let showFocus = false;

		if (validation) {
			classEditor += ' a11yEditor-error';
			classNameLabel += ' a11yEditor-labelError';
			setClassNameAsterisk(classNameAsterisk + ' a11yEditor-labelError');
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
		} else {
			if (currentContent.getBlockMap().first().getType() !== 'unstyled') {
				showPlaceholder = false;
			}
		}

		classNameLabel += (showLabelInside ? '' : ' a11yEditor-labelShrink');
		classEditor += (showPlaceholder ? '' : ' a11yEditor-hidePlaceholder');
		classEditor += (showFocus ? ' a11yEditor-focused' : '');
		classNameLabel += (showFocus ? ' a11yEditor-labelFocused' : '');


		setClassNameEditor(classEditor);
		setClassNameLabel(classNameLabel);
	}


	function getActiveBlockType() {
		const selection = editorState.getSelection();
		return editorState
			.getCurrentContent()
			.getBlockForKey(selection.getStartKey())
			.getType();
	}

	function toogleInlineStyle(inlineStyle) {
		setTextStyles(inlineStyle);
		onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
	}

	function toggleBlockType(type) {
		let prevType = getActiveBlockType();
		type = prevType === type ? 'paragraph' : type;
		setBlockTypes(type);
		onChange(RichUtils.toggleBlockType(editorState, type));
	}

	function renderContentAsRawJs() {
		return JSON.stringify(outputRaw, null, 2);
	}

	function focusEditor() {
		editor.current.focus();
	}

	/* Event handlres */
	const handleKeyCommand = (command) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			setEditorState(newState); //this.onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	};

	const onTab = (event) => {
		const maxDepth = 4;
		onChange(RichUtils.onTab(event, editorState, maxDepth));
	};

	const onClick = () => {
		focusEditor();
	};

	const onChange = (newEditorState) => {
        setEditorState(newEditorState);
        
	};

	return {
		handleKeyCommand: handleKeyCommand,
		onTab: onTab,
		onClick: onClick,
		onChange: onChange,
		toogleInlineStyle: toogleInlineStyle,
		toggleBlockType: toggleBlockType,
		renderContentAsRawJs:renderContentAsRawJs,
		editor,
		editorState,
		alignment,
		blockTypes,
		textSyles,
		outputHtml,
		outputRaw,
		classNameEditor,
		classNameLabel,
		classNameAsterisk,
		//inputRaw
	};
};











