import React, {useState} from 'react'
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

function MarkdownEditor() {
  return (
    <div>
      <SimpleMDE />
    </div>
  )
}

export default MarkdownEditor