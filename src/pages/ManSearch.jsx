import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';
import './ManSearch.css';

const ManSearch = () => {
  const [shapes, setShapes] = useState([]);
  const [colors, setColors] = useState([]);
  const [imprint, setImprint] = useState('');
  const [selectedShape, setSelectedShape] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchShapesAndColors = async () => {
        try {
          const { data, error } = await supabase
            .from('pill_data')
            .select('shape, color')
            .not('shape', 'is', null)  // Exclude null values properly
            .not('color', 'is', null); // Exclude null values properly
      
          if (error) throw error;
      
          console.log("Raw data from Supabase:", data); // Debugging log
      
          // Ensure unique, trimmed, and uppercase values, while filtering out empty strings
          const uniqueShapes = [...new Set(
            data.map(item => item.shape?.trim().toUpperCase()).filter(Boolean)
          )];
      
          const uniqueColors = [...new Set(
            data.map(item => item.color?.trim().toUpperCase()).filter(Boolean)
          )];
      
          console.log("Processed Shapes:", uniqueShapes); // Debugging log
      
          setShapes(uniqueShapes);
          setColors(uniqueColors);
        } catch (error) {
          console.error('Error fetching shapes and colors:', error.message);
        }
      };

    fetchShapesAndColors();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams();
    if (selectedShape) queryParams.append('shape', selectedShape);
    if (selectedColor) queryParams.append('color', selectedColor);
    if (imprint) queryParams.append('imprint', imprint);

    navigate(`/pill-results?${queryParams.toString()}`);
  };

  return (
    <div className="img-search-container">
      <div className="card">
        <h2>Manual Pill Search</h2>
        <form onSubmit={handleSubmit}>
          <select value={selectedShape} onChange={(e) => setSelectedShape(e.target.value)} required>
            <option value="">Select Shape</option>
            {shapes.map((shape, index) => (
              <option key={index} value={shape}>{shape}</option>
            ))}
          </select>
          <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} required>
            <option value="">Select Color</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>{color}</option>
            ))}
          </select>
          <input type="text" placeholder="Enter Imprint" value={imprint} onChange={(e) => setImprint(e.target.value)} />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
};

export default ManSearch;