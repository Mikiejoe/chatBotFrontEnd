import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000); // Redirect after 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h1>Page Not Found</h1>
      <p>You will be redirected to the homepage shortly.</p>
    </div>
  );
};

// export default NotFound;
