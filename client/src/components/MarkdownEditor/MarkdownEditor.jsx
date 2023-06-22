import React, { useState } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

function MarkdownEditor(props) {
  return (
    <>
      <SimpleMDE
        value={props.value}
        onChange={props.onChangeEvent}
      />
    </>
  );
}

export default MarkdownEditor;
