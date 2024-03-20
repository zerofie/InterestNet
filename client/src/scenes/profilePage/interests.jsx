
import React from 'react';

const Interests = ({ interests }) => {
  return (
    <ul>
      {interests.map((interest, index) => (
        <li key={index}>{interest}</li>
      ))}
    </ul>
  );
};

export default Interests;
