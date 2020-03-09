import React from 'react';
import './App.css';
//import SelectComponent from "./Select";
import SelectComponent from "./SimpleSelect";

function App() {
  return (
    <div className="App">
      <header className="App-header search-section">
        <SelectComponent />
      </header>
    </div>
  );
}

export default App;
