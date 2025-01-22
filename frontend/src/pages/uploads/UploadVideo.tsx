// Filename: UploadVideo.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../../utils/apiClient';
import Button from '../../components/Button';

const UploadVideo: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const projectId = location.state?.projectId;

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !projectId) {
      setError('Please select a video and make sure the project ID is available.');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const response = await apiClient.post(`/upload-video/${projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Video uploaded successfully', response.data);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Error uploading video. Please try again.');
      console.error('Error uploading video:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="page-container">
      <h2 className="text-2xl mb-6 text-center">Upload Video for Project</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="video-upload-form">
        <input type="file" accept="video/*" onChange={handleVideoChange} />
        <Button
          label={uploading ? 'Uploading...' : 'Upload Video'}
          onClick={handleUpload}
          disabled={uploading || !videoFile}
          className="px-8 py-4 bg-green-500 text-white rounded-lg"
        />
      </div>
    </div>
  );
};

export default UploadVideo;
