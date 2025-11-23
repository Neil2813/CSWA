import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherApp from './components/WeatherApp';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherApp />} />
      </Routes>
    </Router>
  );
};

export default App;
