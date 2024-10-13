import React, { useState } from 'react';
import axios from 'axios';

const CreatePostForm = () => {
  const [name, setName] = useState('');
  const [socialMediaHandle, setSocialMediaHandle] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (file) => {
    const maxFileSize = 5 * 1024 * 1024; // 5 MB
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (file.size > maxFileSize) {
      setError('File size exceeds the 5MB limit');
      return null;
    }

    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Only JPEG, PNG, and GIF are allowed.');
      return null;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Kesava_preset');
    formData.append('cloud_name', 'dvzei06gf');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dvzei06gf/image/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setIsUploading(false);
      return response.data.secure_url;
    } catch (err) {
      console.error('Image upload failed:', err);
      setError('Image upload failed');
      setIsUploading(false);
      return null;
    }
  };

  const validateSocialMediaHandle = (handle) => {
    const regex = /^https:\/\/(www\.)?(twitter|instagram|facebook|linkedin|x|tiktok)\.com\/[a-zA-Z0-9_]+$/;
    return regex.test(handle);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!name || !socialMediaHandle) {
      setError('Please fill in all the fields');
      return;
    }

    if (!validateSocialMediaHandle(socialMediaHandle)) {
      setError('Invalid social media handle. Please enter a valid URL like https://twitter.com/username');
      return;
    }

    let imageUrl = null;
    if (imageFile) {
      imageUrl = await handleImageUpload(imageFile);
      if (!imageUrl) return;
    }

    try {
      const response = await axios.post('/posts/create', {
        name,
        social_media_handle: socialMediaHandle,
        image_url: imageUrl,
      });

      setSuccessMessage('Post created successfully!');
      console.log('Post created:', response.data);

      setName('');
      setSocialMediaHandle('');
      setImageFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Post creation failed');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">Create a New Post</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="socialMediaHandle" className="block text-sm font-medium text-gray-700 mb-1">Social Media Handle</label>
          <input
            type="text"
            id="socialMediaHandle"
            value={socialMediaHandle}
            onChange={(e) => setSocialMediaHandle(e.target.value)}
            placeholder="Enter the social media handle"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
          <input
            type="file"
            id="imageFile"
            onChange={(e) => setImageFile(e.target.files[0])}
            accept="image/*"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {isUploading && <p className="text-sm text-gray-500 mt-2">Uploading image... (This may take up to 60 seconds)</p>}
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 ease-in-out"
          disabled={isUploading}
        >
          Create Post
        </button>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {successMessage && <p className="mt-4 text-green-500 text-center">{successMessage}</p>}
      </form>
    </div>
  );
};

export default CreatePostForm;
