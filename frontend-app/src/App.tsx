import React from 'react';
import './App.css';
import AQIData from './components/AQIData'; // Ensure path is enclosed in quotes

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Air Quality Index (AQI) Data</h1>
      </header>
      <AQIData />
    </div>
  );
}

export default App;
