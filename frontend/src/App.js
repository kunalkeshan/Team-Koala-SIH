import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import BackdropComponent from './components/Reusable/Backdrop';
import SnackbarComponent from './components/Reusable/Snackbar';

import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <SnackbarComponent />
      <BackdropComponent />
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
