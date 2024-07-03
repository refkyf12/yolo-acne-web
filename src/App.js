import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [results, setResults] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedFiles) {
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("images", selectedFiles[i]);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/process_images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  return (
    <div className="App">
      <h1>Image Processing</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <div>
        {results.map((result, index) => (
          <div key={index}>
            <p>Image {index + 1} has {result.num_boxes} jerawat</p>
            <p>Image {index + 1} kategorinya adalah {result.kategori}</p>
            <img src={`http://localhost:5000/result_images/${result.image_path}`} alt={`Result ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
