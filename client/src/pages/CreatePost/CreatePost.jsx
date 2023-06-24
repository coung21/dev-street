import React, { useState } from 'react';
import './CreatePost.scss';
import logo from '../../assets/DEV.png';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import MarkdownEditor from '../../components/MarkdownEditor/MarkdownEditor';
import InputTags from '../../components/InputElements/InputTags/InputTags';
import { useSelector } from 'react-redux';


function CreatePost() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const { current_user } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };
  const handleBodyChange = (value) => {
    setBody(value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  
  const addTag = (event) => {
    event.preventDefault()
    const tag = event.target.value;
    if (event.code === 'Enter' && tag !== '') {
      setTags((tags) => [...tags, tag]);
      event.target.value = '';
    }
  }

   const removeTag = (indexToRemove) => {
    const removedTag = tags[indexToRemove];
    const updatedTags = tags.filter((tag) => tag !== removedTag);
    setTags(updatedTags);
   }

     const handleKeyDown = (event) => {
       if (event.key === 'Enter') {
         event.preventDefault();
       }
     };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile && body && title && tags.length >= 1) {
      try {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('body', body)
        formData.append('title', title)
        formData.append('tags', tags);
        formData.append('author', current_user._id)
        const response = await api.post('/post/new', formData);
        

        console.log(response);
        navigate('/')
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('đéo có')
    }
  };

  return (
    <>
      <nav className='create-nav'>
        <div className='create-nav__left'>
          <Link to={'/'}>
            <img
              src={logo}
              alt='logo'
              style={{ width: '50px', height: '45px' }}
            />
          </Link>
          <h3>Create Post</h3>
        </div>

        <Link to={'/'} className='close'>
          <AiOutlineClose fontWeight={700} size={20} />
        </Link>
      </nav>
      <div className='article-form'>
        {/* <form onSubmit={handleSubmit}>
        <input type='file' name='image' onChange={handleFileChange} />
        <input type="text" name="body" onChange={handleBodyChange}/>
        <button type='submit'>Upload</button>
      </form> */}
        <form onSubmit={handleSubmit}>
          <div className='article-form__top'>
            <div className='file-form'>
              <input
                type='file'
                name='image'
                id='image-input'
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt='Preview'
                  width={150}
                  height={150}
                  style={{ marginRight: '1rem' }}
                />
              )}
              <div>
                <label className='add-cover' htmlFor='image-input'>
                  Add a cover image
                </label>
              </div>
            </div>
            <input
              type='text'
              name='title'
              id='title-input'
              placeholder='New post title here...'
              value={title}
              onChange={handleTitleChange}
              onKeyDown={handleKeyDown}
            />
            <InputTags tags={tags} addTag={addTag} removeTag={removeTag} handleKeyDown={handleKeyDown}/>
          </div>
          <MarkdownEditor value={body} onChangeEvent={handleBodyChange} />
          <button className='submit-btn' type='submit'>
            Publish
          </button>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
