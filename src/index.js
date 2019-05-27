import React from "react";
//var pdfjsLib = require("./../lib/pdf");
import ReactJSPDF_Header from "./Components/Header/index";
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
class ReactJSPDFViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      availWidth: null,
      availHeight: null,
      PDFJSBuildVersion: pdfjsLib.build,
      PDFJSVersion: pdfjsLib.version,
      pdfLoaded: false,
      pageNo: 1, // Load default page
      totalPages: null,
      pdfFingerprint: null,
      showIconOnly: false,
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
      pdf.getPage(this.state.pageNo).then(page => {
        var scale = 1.5;
        var viewport = page.getViewport(scale);
        //
        // Prepare canvas using PDF page dimensions
        //
        var canvas = document.getElementById("pv-id-canvas");
        var context = canvas.getContext("2d");
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
        page.render(renderContext);
      });
    });
  }

  handlePropCallbackEvents = (e, eventName) => {
    // Checking if hook callback available
    if (this.props[`_Hook_${eventName}`]) {
      // Trigger hook callback
      this.props[`_Hook_${eventName}`](e);
    }
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
      handleInputChange: this.onInputChange
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
          <canvas id="pv-id-canvas" />
        </div>
      </div>
    );
  }
}
export default ReactJSPDFViewer;
