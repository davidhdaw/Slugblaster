import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-5xl font-bold mb-10">Character Sheets</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/combined" className="bg-blue-700 hover:bg-blue-600 rounded-lg p-6 text-center transition-all transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-3">Wawro's Sheet</h2>
          <p className="text-blue-200">Guts-themed character sheet</p>
        </Link>
        
        <Link to="/cyanne" className="bg-purple-700 hover:bg-purple-600 rounded-lg p-6 text-center transition-all transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-3">Cyanne's Sheet</h2>
          <p className="text-purple-200">Heart-themed character sheet</p>
        </Link>
        
        <Link to="/amanda" className="bg-green-700 hover:bg-green-600 rounded-lg p-6 text-center transition-all transform hover:scale-105">
          <h2 className="text-2xl font-bold mb-3">Amanda's Sheet</h2>
          <p className="text-green-200">Chill-themed character sheet</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;