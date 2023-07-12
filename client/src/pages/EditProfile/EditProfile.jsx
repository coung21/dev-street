import React, { useEffect, useState } from 'react';
import './EditProfile.scss';
import { editUserProfile } from '../../api/userApi';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../api/userApi';
import { useSelector, useDispatch } from 'react-redux';
import {
  startLoading,
  finishLoading,
} from '../../store/slices/loadingErrorSlice';
import {
  setError,
  resetError,
  setMessage,
} from '../../store/slices/loadingErrorSlice';
import { authActions } from '../../store/slices/authSlice';
import { HuePicker } from 'react-color';

function EditProfile() {
  const { userid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [links, setLinks] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [education, setEducation] = useState('');
  const [work, setWork] = useState('');
  const [theme, setTheme] = useState('#000');

  const handleThemeChange = (color) => {
    setTheme(color.hex)
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
    setPreviewAvatar(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (username) {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('username', username);
      formData.append('avatar', avatar);
      formData.append('links', links);
      formData.append('location', location);
      formData.append('bio', bio);
      formData.append('skills', skills);
      formData.append('education', education);
      formData.append('work', work);
      formData.append('theme', theme)
      dispatch(startLoading());
      const response = await editUserProfile(userid, formData);
      const newData = JSON.parse(localStorage.getItem('current_user'));
      newData.name = response.data.name;
      newData.username = response.data.username;
      newData.email = newData.email;
      newData.avatar = response.data.avatar;
      console.log(newData);
      localStorage.setItem('current_user', JSON.stringify(newData));
      dispatch(authActions.updateCurrentUser());
      dispatch(finishLoading());
      navigate(`/${userid}`);
    } else {
      dispatch(setMessage('username is too short - minimum 1 character'));
      dispatch(setError());
      setTimeout(() => {
        dispatch(resetError());
        setMessage('');
      }, 3000);
    }
  };

  useEffect(() => {
    async function getUser() {
      const response = await getUserProfile(userid);
      const data = response.data;
      setName(data.name);
      setUsername(data.username);
      setPreviewAvatar(data.avatar);
      setLinks(data.links);
      setLocation(data.location);
      setBio(data.bio);
      setSkills(data.skills);
      setEducation(data.education);
      setWork(data.work);
    }
    getUser();
  }, []);

  return (
    <div className='settings-layout'>
      <div className='header'>
        <h1>Settings for @{username}</h1>
      </div>

      <div id='settings-form'>
        <div className='setting-fields'>
          <label htmlFor='name-input'>Name</label>
          <input
            type='text'
            name='name'
            id='name-input'
            placeholder='Jonh Doe'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='setting-fields'>
          <label htmlFor='username-input'>Username</label>
          <input
            type='text'
            name='username'
            id='username-input'
            placeholder='jonhdoe'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='setting-fields'>
          <label htmlFor='avatar-input'>Profile image</label>
          <div className='avatar-field'>
            <span>
              <img src={previewAvatar} alt='' />
            </span>
            <input
              accept='image/*'
              type='file'
              name='avatar'
              id='avatar-input'
              onChange={handleAvatarChange}
            />
          </div>
        </div>
        <div className='setting-fields'>
          <label htmlFor='links-input'>Website URL</label>
          <input
            type='text'
            name='links'
            id='links-input'
            placeholder='https://yoursite.com'
            value={links}
            onChange={(e) => setLinks(e.target.value)}
          />
        </div>
        <div className='setting-fields'>
          <label htmlFor='location-input'>Location</label>
          <input
            type='text'
            name='location'
            id='location-input'
            placeholder='Ha Noi, VietNam'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className='setting-fields'>
          <label htmlFor='bio-input'>Bio</label>
          <textarea
            type='text'
            name='bio'
            id='bio-input'
            placeholder='A short bio...'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        <div className='setting-fields'>
          <label htmlFor='skills-input'>Skills</label>
          <textarea
            type='text'
            name='skills'
            id='skills-input'
            placeholder='Currently hacking on...'
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>
        <div className='setting-fields'>
          <label htmlFor='education-input'>Education</label>
          <input
            type='text'
            name='education'
            id='education-input'
            placeholder='Where did you go to school ?'
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>
        <div className='setting-fields'>
          <label htmlFor='work-input'>Work</label>
          <input
            type='text'
            name='work'
            id='work-input'
            placeholder='What do you do ?'
            value={work}
            onChange={(e) => setWork(e.target.value)}
          />
        </div>
        <div className='setting-fields'>
          <label htmlFor='theme' style={{ marginBottom: '0.5rem' }}>
            Theme
          </label>
          <div className='color-picker'>
            <span style={{backgroundColor: `${theme}`}}></span>
              <HuePicker color={theme} onChangeComplete={handleThemeChange} />
          </div>
        </div>
      </div>

      <div className='settings-submit'>
        <button onClick={handleSubmit}>Save Profile Information</button>
      </div>
    </div>
  );
}

export default EditProfile;
