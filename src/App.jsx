import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PasswordProvider } from './context/PasswordContext';
import Manager from './components/Manager';
import Navbar from './components/Navbar';

function App() {
  return (
    <PasswordProvider>
      <div>
        <Navbar />
        <Manager />
        <ToastContainer />
      </div>
    </PasswordProvider>
  );
}

export default App;