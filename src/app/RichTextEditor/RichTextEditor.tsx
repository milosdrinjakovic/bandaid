import React, { RefObject } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

interface RichTextEditorProps {
  value: string
  readonly?: boolean
  quillRef?: RefObject<ReactQuill>
  onTextChange?: (content: string) => void
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ quillRef, readonly = false, value, onTextChange }) => {

  const handleTextChange = (content: string) => {
    if(onTextChange) onTextChange(content);
  };

  const modules = {
    toolbar: false
    // toolbar: [
    //   [{ 'font': [] }],
    //   [{ 'size': ['small', false, 'large', 'huge'] }],  // font size
    //   [{ 'color': ['red'] }, { 'background': [] }], // color and background
    //   ['bold', 'italic', 'underline', 'strike'], // formatting buttons
    //   [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }], // multiple align options
    //   [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    //   ['clean'] // remove formatting
    // ],
  };

  return (
      <ReactQuill placeholder="Enter text here..." readOnly={readonly} ref={quillRef} value={value} onChange={handleTextChange} modules={modules} />
  );
};

export default RichTextEditor;