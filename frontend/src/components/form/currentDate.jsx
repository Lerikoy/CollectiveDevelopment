import React from 'react';

function CurrentDateTime() {
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;

  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
}

export default CurrentDateTime;