import React, { useState, useEffect } from 'react';
import './Loader.css'; // Import CSS file for styling

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);

  }, []);

  return (
    <div className={`loader-container ${loading ? 'loading' : ''}`}>
      <div className="overlay"></div> {/* Translucent black overlay */}
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
