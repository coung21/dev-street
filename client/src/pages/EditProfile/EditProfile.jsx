import React from 'react'
import './EditProfile.scss'
function EditProfile() {
  return (
    <div className='settings-layout'>
      <div className='header'>
        <h1>Settings for @</h1>
      </div>

      <div id='settings-form'>
        <div className='setting-fields'>
          <label htmlFor='name-input'>Name</label>
          <input
            type='text'
            name='name'
            id='name-input'
            placeholder='Jonh Doe'
          />
        </div>
        <div className='setting-fields'>
          <label htmlFor='username-input'>Username</label>
          <input
            type='text'
            name='username'
            id='username-input'
            placeholder='jonhdoe'
          />
        </div>
        <div className='setting-fields'>
          <label htmlFor='avatar-input'>Profile image</label>
          <div className='avatar-field'>
            <span>
              <img
                src='https://res.cloudinary.com/practicaldev/image/fetch/s--CRSfoFsK--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/1074355/bea4226a-074c-4527-a830-180802033a92.jpeg'
                alt=''
              />
            </span>
            <input
              accept='image/*'
              type='file'
              name='avatar'
              id='avatar-input'
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
          />
        </div>
        <div className='setting-fields'>
          <label htmlFor='location-input'>Location</label>
          <input
            type='text'
            name='location'
            id='location-input'
            placeholder='Ha Noi, VietNam'
          />
        </div>
        <div className='setting-fields'>
          <label htmlFor='bio-input'>Bio</label>
          <textarea
            type='text'
            name='bio'
            id='bio-input'
            placeholder='A short bio...'
          />
        </div>
        <div className='setting-fields'>
          <label htmlFor='skills-input'>Skills</label>
          <textarea type='text' name='skills' id='skills-input' />
        </div>
        <div className='setting-fields'>
          <label htmlFor='education-input'>Education</label>
          <input
            type='text'
            name='education'
            id='education-input'
            placeholder='Where did you go to school ?'
          />
        </div>
        <div className='setting-fields'>
          <label htmlFor='work-input'>Work</label>
          <input
            type='text'
            name='work'
            id='work-input'
            placeholder='What do you do ?'
          />
        </div>
      </div>

      <div className='settings-submit'>
        <button>Save Profile Information</button>
      </div>
    </div>
  );
}

export default EditProfile