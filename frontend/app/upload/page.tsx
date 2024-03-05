"use client";

import axios from "axios";
import React, { useState } from "react";

// Define a type for the video file state
type VideoFile = File | null;

const Upload: React.FC = () => {
  // State to hold the selected video file
  const [videoFile, setVideoFile] = useState<VideoFile>(null);
  const [receivedVideoUrl, setReceivedVideoUrl] = useState<string>("");

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Check if files are selected and set the first file
    const file = event.target.files ? event.target.files[0] : null;
    setVideoFile(file);
  };

  // Optional: Function to handle file upload submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!videoFile) {
      alert("Please select a file first.");
      return;
    }

    // Implement the actual upload logic here
    // This could involve setting up FormData and using fetch/axios to send the file to your server
    console.log("Uploading:", videoFile.name);
    // Example:
    // const formData = new FormData();
    // formData.append("video", videoFile);
    // await fetch("YOUR_UPLOAD_ENDPOINT", { method: "POST", body: formData });

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/process-video/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );
      console.log(response.data); // Get the binary data as a blob
      setReceivedVideoUrl(URL.createObjectURL(response.data));
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Upload Video
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-violet-50 file:text-violet-700
          hover:file:bg-violet-100"
        />
        {videoFile && <p className="text-sm text-gray-500">{videoFile.name}</p>}
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Upload
        </button>
      </form>

      {receivedVideoUrl && (
        <div>
          <video src={receivedVideoUrl} width="100%" controls></video>
        </div>
      )}
    </div>
  );
};

export default Upload;
