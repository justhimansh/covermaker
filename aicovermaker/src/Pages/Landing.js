import React from 'react';
import { Link } from 'react-router-dom'; // import Link
import './styles/buttonstyle.scss'; // Import your buttonstyle.scss or include the relevant styles

function Landing() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
      <h1>Welcome to AiCoverMaker</h1>
      <h2>What would you like to generate? (click the cover note)</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Link to="/CoverNote" style={{ textDecoration: 'none', marginBottom: '10px' }}>
          <button className="copy">Cover Note</button>
        </Link>
        <Link to="/CoverLetter" style={{ textDecoration: 'none' }}>
          <button className="copy">Cover Letter</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;
