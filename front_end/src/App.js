import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loginform from './Loginform';
import Allcourses from './Allcourses';
import Allcoursesdetails from './Allcoursesdetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Loginform />} />
        <Route path="/allcourses" element={<Allcourses />} />
        <Route path="/coursedetails/:id" element={<Allcoursesdetails />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;