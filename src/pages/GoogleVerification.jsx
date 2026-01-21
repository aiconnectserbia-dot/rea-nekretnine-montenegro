import React, { useEffect } from 'react';

export default function GoogleVerification() {
  useEffect(() => {
    // Redirect to proper verification file
    window.location.href = '/googlef043ef210742dac4.html';
  }, []);

  return (
    <div style={{ 
      fontFamily: 'monospace', 
      padding: '20px',
      backgroundColor: '#fff',
      color: '#000'
    }}>
      google-site-verification: googlef043ef210742dac4.html
    </div>
  );
}