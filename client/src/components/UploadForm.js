import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { UPLOAD_PICTURE } from '../utils/mutations';
import Auth from '../utils/auth';

function UploadForm() {
  // set up state for the form
  const [imageState, setImageState] = useState({
    title: '',
    file: '',
  });

  const [uploadImage] = useMutation(UPLOAD_PICTURE);

  // set the state for the title & file
  function handleForm(e) {
    if (e.target.name === 'file') {
      setImageState({ ...imageState, file: e.target.files[0] });
    } else if (e.target.name === 'title') {
      setImageState({ ...imageState, title: e.target.value });
    }
    console.log(imageState);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // if a user is not logged in, do not process the post submission
    if (!Auth.loggedIn()) {
      console.log('not logged in!');
      return;
    }
    const { file, title } = imageState;
    // create a new FormData & add the file & upload preset
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'g61rj6le');

    // use an axios post request to submit the form to our api
    axios
      .post(`https://api.cloudinary.com/v1_1/dzmr76die/image/upload`, formData)
      .then((response) => {
        console.log(response);
        // use the image id in the response to submit to the database
        uploadImage({
          variables: {
            imageId: response.data.public_id,
            title: title,
          },
        }).then((graphqlResponse) => {
          window.location.reload();
        });
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label className='form-label' htmlFor='title'>
          Title your Image
        </label>
        <input
          type='text'
          name='title'
          onBlur={handleForm}
          className='form-control'
          id='title'
        />
        <label className='form-label' htmlFor='file'>
          Select a photo to upload
        </label>
        <br />
        <input
          type='file'
          name='file'
          accept='.jpg,.png'
          onChange={handleForm}
          className='form-control'
          id='file'
        />
        <button type='submit'>Post</button>
      </form>
    </div>
  );
}

export default UploadForm;
