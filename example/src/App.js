import React from 'react';
import ReactJSPDFViewer from 'reactjs-pdf-viewer';
import sampleFile from './pdf_sample_file.pdf';
import './App.css';

function App() {
  return (
    <div className="App">
      <ReactJSPDFViewer url={sampleFile} _Hook_onSearchClick={(e)=>(console.log(e))}/>
    </div>
  );
}

export default App;