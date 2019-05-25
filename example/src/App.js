import React from 'react';
import ReactPDFViewer from 'react-pdf-viewer-app';
import sampleFile from './pdf_sample_file.pdf';
import './App.css';

function App() {
  return (
    <div className="App">
      <ReactPDFViewer url={sampleFile} _Hook_onSearchClick={(e)=>(console.log(e))}/>
    </div>
  );
}

export default App;