// src/components/WithLoader.js

import React, { useState } from 'react';
// import Loader from './Loader';

const WithLoader = (WrappedComponent) => {
  const WithLoader = (props) => {
    const [loading, setLoading] = useState(false);

    // Intercept API calls and set loading state
    const handleApiCall = async (apiCall, ...args) => {
      setLoading(true);
      try {
        const response = await apiCall(...args);
        return response;
      } finally {
        setLoading(false);
      }
    };

    return (
      <div>
        {loading && <Loader />}
        <WrappedComponent {...props} handleApiCall={handleApiCall} />
      </div>
    );
  };

  return WithLoader;
};

export default WithLoader;


// export default WithLoader;
