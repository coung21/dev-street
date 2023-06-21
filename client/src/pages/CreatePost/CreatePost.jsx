import React , {useState} from 'react';
import api from '../../api/api'
import MarkdownEditor from '../../components/MarkdownEditor/MarkdownEditor';

function CreatePost() {
  const [selectedFile, setSelectedFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [body, setBody] = useState('');
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleBodyChange = (event) => {
    setBody(event.target.value)
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFile && body) {
      try {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('body', body)
        const response = await api.post('/new', formData);

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <input type='file' name='image' onChange={handleFileChange} />
        {previewImage && <img src={previewImage} alt='Preview' width={50} height={50}/>}
        <input type="text" name="body" onChange={handleBodyChange}/>
        <button type='submit'>Upload</button>
      </form> */}
      <MarkdownEditor />
    </div>
  );
}

export default CreatePost;
