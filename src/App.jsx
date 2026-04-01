import './index.css';
import { useState } from 'react';
import Editor from './components/Editor.jsx';
import Gallery from './components/Gallery.jsx';

function App() {
  return (
    <div className='flex flex-row h-screen overflow-hidden'>
      <Editor />
      <Gallery />
    </div>
  );
}

export default App;
