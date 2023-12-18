import React, { useState, useMemo } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import api from '../../api/api'

function MarkdownEditor(props) {

  const imageUpload  = async (image, onSuccess, onError) => {

    try {
      const data = new FormData();
      data.append('image', image);
      console.log(image)
      const resposne = await api.post('/upload', data)
      onSuccess(resposne.data.url)
    } catch (error) {    
        console.error(error)
        // onError(error)
    }
  }

  const newOptions = useMemo(() => {
    return {
      spellChecker: false,
      showIcons: [
        "strikethrough",
        "heading",
        "code",
        "quote",
        "unordered-list",
        "ordered-list",
        "link",
        // "image",
        "table",
        "horizontal-rule",
        "preview",
        "side-by-side",
        "fullscreen",
        "guide",
        "upload-image",
        "side-by-side",
      ],
      hideIcons: ["image"],
      

      // New options
      uploadImage: true,
      imageUploadFunction: imageUpload,

    };
  }, []);
  return (
    <>
      <SimpleMDE
        value={props.value}
        onChange={props.onChangeEvent}  
        options={newOptions}
      />
    </>
  );
}

export default MarkdownEditor;
