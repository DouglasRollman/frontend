import React, { useState } from 'react';
import supabase from '../supabaseClient'; // Import Supabase client
import './ImgSearch.css';

const ImgSearch = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [predictions, setPredictions] = useState([]); // Store multiple predictions

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Raw API Response:", data);

      // Convert probability to a number
      const processedPredictions = data.predictions.map(p => ({
        ...p,
        probability: parseFloat(p.probability.replace("%", "")) / 100,
      }));

      // Fetch Supabase details and merge them
      const pillDetails = await fetchPillDetails(processedPredictions);
      console.log("Merged Predictions with Supabase Data:", pillDetails);
      setPredictions(pillDetails);
    } catch (error) {
      console.error("Error:", error);
      setPredictions([{ pill_name: "Error", probability: "N/A" }]);
    }
  };

  const fetchPillDetails = async (predictions) => {
    const predictedFilenames = predictions.map(p => `${p.pill_name}.jpg`);

    const { data, error } = await supabase
      .from("pill_data")
      .select("*")
      .in("rxnavImageFileName", predictedFilenames);

    if (error) {
      console.error("Error fetching pill details:", error);
      return predictions; // Return original predictions if Supabase query fails
    }

    // Merge probability values with Supabase details and add image URL
    const mergedData = predictions.map(prediction => {
      const pillData = data.find(p => p.rxnavImageFileName === `${prediction.pill_name}.jpg`);
      
      // Get the image URL from the Supabase storage bucket
      const imageUrl = pillData 
        ? supabase.storage.from("pills").getPublicUrl(pillData.rxnavImageFileName).data.publicUrl 
        : null;

      return {
        ...pillData, // All pill details from Supabase
        pill_name: prediction.pill_name, // Ensure name is retained
        probability: prediction.probability, // Keep probability
        imageUrl, // Store the image URL
      };
    });

    return mergedData;
  };

  return (
    <div className="img-search-container">
      <div className="card">
        <h2>Upload a Pill Image</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" className="preview-image" />}
          <button type="submit">Submit</button>
        </form>

        {/* Display Top 3 Predictions */}
        {predictions.length > 0 && (
          <div className="prediction-results">
            <h3>Top Predictions:</h3>
            <ul>
              {predictions.map((pill, index) => (
                <li key={index} className="pill-result">
                  {pill.imageUrl && (
                    <img src={pill.imageUrl} alt={pill.name} className="pill-image" />
                  )}
                  <div className="pill-info">
                    <strong>{pill.name}</strong> ({pill.probability ? (pill.probability * 100).toFixed(2) : "N/A"}%)
                    <br />
                    <span>Color: {pill.color}, Shape: {pill.shape}</span>
                    <br />
                    <span>Imprint: {pill.imprint}, Dosage: {pill.dosage}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImgSearch;