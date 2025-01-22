// FileUploadForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SlideTransition from '../../animations/SlideTransition';
import Button from '../../components/Button'; // Reusable Button
import Form from '../../components/Form'; // Reusable Form Wrapper
import apiClient from '../../utils/apiClient';

const FileUploadForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setFieldError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setFieldError('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await apiClient.post('/upload-video', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('File uploaded successfully', response.data);
      navigate('/dashboard');
    } catch (error: any) {
      setGlobalError(error.response?.data?.message || 'Error uploading file');
      console.error('Error uploading file', error);
    }
  };

  return (
    <div className="page-container">
      <h2 className="text-2xl mb-6 text-center px-4">Upload a Video</h2>

      <Form onSubmit={handleSubmit}>
        <SlideTransition direction="right" keyProp="file-upload">
          <div className="mb-8">
            <input
              type="file"
              accept="video/mp4, video/mkv, video/avi"
              onChange={handleFileChange}
              className="w-full"
            />
            {fieldError && (
              <div className="text-red-500 mt-2 text-center">{fieldError}</div>
            )}
          </div>
        </SlideTransition>

        <div className="flex justify-between items-center mt-8 space-x-4">
          <Button
            label="Upload File"
            type="submit"
            className="px-8 py-4 bg-green-500 text-white rounded-lg"
          />
        </div>
      </Form>

      {globalError && <div className="text-red-500 mt-4 text-center">{globalError}</div>}
    </div>
  );
};

export default FileUploadForm;
