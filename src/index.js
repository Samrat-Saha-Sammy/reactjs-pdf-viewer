import React from "react";
var pdfjsLib = require("./../lib/pdf");
import ReactJSPDF_Header from "./Components/Header/index";
import * as Constants from "./constants/constant";
//import styles from './style.css';

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282c34",
    fontSize: "calc(10px + 2vmin)",
    color: "white"
  }
};

let _pv_pdf = null;
class ReactJSPDFViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availWidth: null,
      availHeight: null,
      PDFJSBuildVersion: pdfjsLib.build,
      PDFJSVersion: pdfjsLib.version,
      pdfLoaded: false,
      initPageNo: this.props.initPageNo || 1, // Load default page
      pagesLoadRange: this.props.pagesRange || 3,
      totalPages: null,
      pdfFingerprint: null,
      showIconOnly: true,
      showTextOnly: false,
      showHeaderBar: true
    };
  }

  componentDidMount() {
    //var url = sampleFile;
    var loadingTask = pdfjsLib.getDocument(this.props.url);
    loadingTask.promise.then(pdf => {
      this.setState({
        totalPages: pdf.numPages,
        pdfFingerprint: pdf.fingerprint
      });
      //
      // Fetch the first page
      //
      _pv_pdf = pdf;
      this.handlePageLoadInRange(this.state.initPageNo);
    });
  }

  handlePageLoadInRange = indexPageNo => {
    if (_pv_pdf === null) {
      console.warn("PdfJS Not Loaded");
      return false;
    }
    for (let i = indexPageNo; i <= this.state.pagesLoadRange; i++) {
      this.handleSinglePageLoad(i);
    }
  };

  handleSinglePageLoad = pageNo => {
    debugger;
    if (_pv_pdf === null) {
      console.warn("PdfJS Not Loaded");
      return false;
    }
    // Generate New Canvas for Each Page
    var canvasContainer = document.getElementById("pv-id-canvas-container");
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.className = `pv-id-canvas-${pageNo}`;
    canvasContainer.appendChild(canvas);

    _pv_pdf.getPage(pageNo).then(page => {
      var scale = 1.5;
      var viewport = page.getViewport(scale);
      //
      // Prepare canvas using PDF page dimensions
      //
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      //
      // Render PDF page into canvas context
      //
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      // Initiate the loaded state
      this.setState({
        pdfLoaded: true,
        availHeight: viewport.height,
        availWidth: viewport.width
      });
      page.render(renderContext).promise.then(() => {
        console.log("Page render Complete");
        this.onPageRenderComplete();
      });
    });
  };

  handlePropCallbackEvents = (e, eventName) => {
    // Checking if hook callback available
    if (this.props[`${Constants.HOOK}${eventName}`]) {
      // Trigger hook callback
      this.props[`${Constants.HOOK}${eventName}`](e);
    }
  };

  onPageRenderComplete = e => {
    this.handlePropCallbackEvents(e, "onEachPageRenderComplete");
  };

  onSearchClick = e => {
    console.log("Click onSearchClick");
    this.handlePropCallbackEvents(e, "onSearchClick");
  };

  onNextClick = e => {
    console.log("Click onNextClick");
    this.handlePropCallbackEvents(e, "onNextClick");
  };

  onPrevClick = e => {
    console.log("Click onPrevClick");
    this.handlePropCallbackEvents(e, "onPrevClick");
  };

  onZoonInClick = e => {
    console.log("Click onZoonInClick");
    this.handlePropCallbackEvents(e, "onZoonInClick");
  };

  onZoonOutClick = e => {
    console.log("Click onZoonOutClick");
    this.handlePropCallbackEvents(e, "onZoonOutClick");
  };

  onInputChange = e => {
    console.log("Click onInputChange");
    this.handlePropCallbackEvents(e, "onInputChange");
  };

  render() {
    // Fetching reference to local.
    // Fetching State
    const { showHeaderBar, pdfLoaded } = this.state;
    // Building Header Props Object
    const HeaderProps = {
      showTextOnly: this.state.showTextOnly,
      showIconOnly: this.state.showIconOnly,
      totalPages: this.state.totalPages,
      pageNo: this.state.pageNo,
      handleSearchClick: this.onSearchClick,
      handleNextClick: this.onNextClick,
      handlePrevClick: this.onPrevClick,
      handleInputChange: this.onInputChange,
      handleZoonInClick: this.onZoonInClick,
      handleZoonOutClick: this.onZoonOutClick
    };
    // Overriding Main Container Style Object
    const mainContainerStyle = Object.assign({}, styles.mainContainer, {
      height: this.state.availHeight,
      overflow: "hidden"
    });
    return (
      <div
        id="pv-id-main-container"
        className="pv-main-container"
        style={mainContainerStyle}
      >
        {// Only display header if state is showHeaderBar:true
        showHeaderBar ? <ReactJSPDF_Header config={HeaderProps} /> : null}
        <div
          id="pv-id-body-container"
          className="pv-body-container"
          style={{
            height: this.state.availHeight - 38,
            width: "100%",
            textAlign: "center",
            overflow: "scroll"
          }}
        >
          {// Display Loading Screen
          !pdfLoaded ? <h4>Loading PDF File...</h4> : null}
          <div id="pv-id-canvas-container" />
        </div>
      </div>
    );
  }
}
export default ReactJSPDFViewer;
