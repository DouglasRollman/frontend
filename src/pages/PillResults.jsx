import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import supabase from '../supabaseClient';
import './PillResults.css';

const PillResults = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  
  const selectedShape = params.get('shape');
  const selectedColor = params.get('color');
  const imprint = params.get('imprint');
  
  const [pillResults, setPillResults] = useState([]);

  useEffect(() => {
    const fetchPills = async () => {
      try {
        let query = supabase.from('pill_data').select('*');

        // Apply filters based on the query parameters
        if (selectedShape) {
          query = query.eq('shape', selectedShape);
        }
        if (selectedColor) {
          query = query.eq('color', selectedColor);
        }
        if (imprint) {
          query = query.ilike('imprint', `%${imprint}%`); // Case-insensitive match
        }

        const { data, error } = await query;

        if (error) {
          throw error;
        }

        setPillResults(data);
      } catch (error) {
        console.error('Error fetching pills:', error.message);
      }
    };

    fetchPills();
  }, [selectedShape, selectedColor, imprint]);

  return (
    <div className="pill-results-container">
      <h2>Pill Search Results</h2>
      {pillResults.length === 0 ? (
        <p>No pills found matching your search criteria.</p>
      ) : (
        <ul className="pill-list">
          {pillResults.map((pill, index) => (
            <li key={index} className="pill-item">
              <p><strong>Pill Name:</strong> {pill.pill_name}</p>
              <p><strong>Dosage:</strong> {pill.dosage}</p>
              <p><strong>Shape:</strong> {pill.shape}</p>
              <p><strong>Size:</strong> {pill.size}</p>
              <p><strong>Color:</strong> {pill.color}</p>
              <p><strong>Imprint:</strong> {pill.imprint}</p>
              <p><strong>Imprint Type:</strong> {pill.imprintType}</p>
              <p><strong>Symbol:</strong> {pill.symbol}</p>
              <p><strong>Score:</strong> {pill.score}</p>
              <p><strong>Labeler:</strong> {pill.labeler}</p>
              <p><strong>Acquisition Date:</strong> {pill.acqDate}</p>
              <p><strong>Active Ingredients:</strong> {pill.active_ingredients}</p>
              <p><strong>Inactive Ingredients:</strong> {pill.inactive_ingredients}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PillResults;