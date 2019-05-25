import React from 'react';
var pdfjsLib = require('./../lib/pdf');
import ReactPDF_Header from './Components/Header/index';
//import styles from './style.css';

class ReactPDFViewer extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      PDFJSBuildVersion: pdfjsLib.build,
      PDFJSVersion: pdfjsLib.version, 
      pdfLoaded: false,
      pageNo: 1, // Load default page
      totalPages: null,
      pdfFingerprint: null,
      showIconOnly: true,
      showTextOnly: false,
      showHeaderBar: true
    }
  }

  componentDidMount() {
    //var url = sampleFile;
    var loadingTask = pdfjsLib.getDocument(this.props.url);
    loadingTask.promise.then((pdf) => {

      this.setState({
        totalPages: pdf.numPages,
        pdfFingerprint: pdf.fingerprint
      })
      //
      // Fetch the first page
      //
      pdf.getPage(this.state.pageNo).then((page) => {
        var scale = 1.5;
        var viewport = page.getViewport(scale);
        //
        // Prepare canvas using PDF page dimensions
        //
        var canvas = document.getElementById('pv-id-canvas');
        var context = canvas.getContext('2d');
        debugger;
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        //
        // Render PDF page into canvas context
        //
        var renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        // Initiate the loaded state
        this.setState({
          pdfLoaded: true
        })
        page.render(renderContext);
      });
    });
  }

  onSearchClick = (e) => {
    console.log('Click onSearchClick');
  }

  onNextClick = (e) => {
    console.log('Click onNextClick');
  }

  onPrevClick = (e) => {
    console.log('Click onPrevClick');
  }

  onZoonInClick = (e) => {
    console.log('Click onZoonInClick');
  }

  onZoonOutClick = (e) => {
    console.log('Click onZoonOutClick');
  }

  render() {
    // Fetching reference to local.
    const { showHeaderBar, pdfLoaded } = this.state;
    const HeaderProps = { showTextOnly : this.state.showTextOnly, showIconOnly: this.state.showIconOnly, totalPages: this.state.totalPages, pageNo: this.state.pageNo, handleSearchClick: this.onSearchClick, handleNextClick: this.onNextClick, handlePrevClick: this.onPrevClick }
    return (
      <div id="pv-id-main-container" className="pv-main-container">
        {
          // Only display header if state is showHeaderBar:true
          (showHeaderBar) ? <ReactPDF_Header config={HeaderProps}/> : null
        }
        <div id="pv-id-body-container" className="pv-body-container">
          {
            // Display Loading Screen
            (!pdfLoaded) ? <h4>Loading PDF File...</h4> : null
          }
          <canvas id="pv-id-canvas"></canvas>
        </div>
      </div>
    );
  }
}
export default ReactPDFViewer;