import React, { useState } from "react";

const PillUploader = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create a preview
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please select an image before submitting.");
      return;
    }

    // You can handle image upload to a backend here
    console.log("Image submitted:", image);

    // Reset state after submission
    setImage(null);
    setPreview(null);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Upload a Pill Image</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" style={styles.preview} />}
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#ff4d4d", // Red background
    color: "#ffffff", // White text
    borderRadius: "8px",
    width: "300px",
    margin: "auto",
  },
  header: {
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  preview: {
    marginTop: "10px",
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    border: "none",
    backgroundColor: "#ffffff",
    color: "#ff4d4d",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default PillUploader;