import React from 'react';
import logo from './logo.svg';

import './App.css';
import Button from './components/Button';

function App() {
  return (
    <div className="grid grid-flow-col w-screen h-screen">
      <Button text = {"Teacher Portal"} route= {'teacher'} />
      <Button text = {"Student Portal"} route = {'student'} />
    </div>
  );
}

export default App;
