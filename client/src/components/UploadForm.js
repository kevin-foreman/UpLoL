import React, { useState } from 'react';

function UploadForm() {
  // set up state for the form
  const [form, setForm] = useState({
    image: '',
  });

  // convert the uploaded image to base64
  function handleForm(e) {
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    // reader.readAsBinaryString(file);
    reader.onload = function () {
      console.log(reader.result);
      setForm({ image: reader.result });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  function submitForm(e) {
    e.preventDefault();
    if (form.image === '') {
      console.log('No image was uploaded!');
    } else {
      console.log(form);
    }
  }

  return (
    <div>
      <form>
        <label className='form-label' htmlFor='customFile'>
          Select a photo to upload
        </label>
        <br />
        <input
          type='file'
          accept='.jpg,.png'
          onChange={handleForm}
          className='form-control'
          id='customFile'
        />
        <button type='submit' onClick={submitForm}>
          Submit
        </button>
      </form>
      {/* {form.image && (
        <div className='w-50 h-50 p-3'>
          <img className='img-fluid' alt='uploaded' src={form.image} />
        </div>
      )} */}
    </div>
  );
}

export default UploadForm;
