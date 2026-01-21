import React, { useEffect } from 'react';

export default function GoogleVerification() {
  useEffect(() => {
    // Set proper content type
    document.querySelector('meta[name="viewport"]')?.remove();
  }, []);

  return (
    <html>
      <head>
        <meta name="google-site-verification" content="googlef043ef210742dac4" />
      </head>
      <body>
        google-site-verification: googlef043ef210742dac4.html
      </body>
    </html>
  );
}