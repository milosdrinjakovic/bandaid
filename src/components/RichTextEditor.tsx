'use client'
import React, { RefObject } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// ✅ Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
});

interface RichTextEditorProps {
  value: string;
  readonly?: boolean;
  // quillRef?: RefObject<any>; // Note: ReactQuill type doesn't work well statically
  onTextChange?: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ readonly = false, value, onTextChange }) => {
  const handleTextChange = (content: string) => {
    if (onTextChange) onTextChange(content);
  };

  const modules = {
    // toolbar: false
    toolbar: [
      // [{ 'font': [] }],
      // [{ 'size': ['small', 'large', 'huge'] }],  // font size
      // [{ 'color': ['red'] }, { 'background': [] }], // color and background
      ['bold', 'italic', 'underline', 'strike'], // formatting buttons
      [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }], // multiple align options
      // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean'] // remove formatting
    ],
  };

  return (
    <ReactQuill
      placeholder="Enter text here..."
      readOnly={readonly}
      // ref={quillRef}
      value={value}
      onChange={handleTextChange}
      modules={modules}
    />
  );
};

export default RichTextEditor;
