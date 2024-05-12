import React, { useEffect, useState } from 'react';
import './Loader.css'; // Import CSS file for styling

const Loader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Simulate data loading completion after a certain time (you can replace this with actual data loading logic)
    }, 2000); // Example: Stop loader after 2 seconds (adjust as needed)

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <div className={`loader-container ${loading ? 'loading' : ''}`}>
      <div className="overlay"></div> {/* Translucent black overlay */}
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
