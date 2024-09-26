import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PasswordProvider } from './context/PasswordContext';
import Manager from './components/Manager';

function App() {
  return (
    <PasswordProvider>
      <div>
        <Manager />
        <ToastContainer />
      </div>
    </PasswordProvider>
  );
}

export default App;