import React from "react";
var pdfjsLib = require("./../lib/pdf");
import ReactJSPDF_Header from "./Components/Header/index";
import * as Constants from "./constants/constant";
import "./styles.css";

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
      currentPageNo: null,
      pagesLoadRange: this.props.pagesRange || 3,
      totalPages: null,
      pdfFingerprint: null,
      pagesLoaded: [],
      showIconOnly: true,
      showTextOnly: false,
      showHeaderBar: true,
      funcRegister: false,
      funcRegisterTable: {}
    };
  }

  componentDidMount() {
    var loadingTask = pdfjsLib.getDocument(this.props.url);
    loadingTask.promise.then(pdf => {
      this.setState({
        totalPages: pdf.numPages,
        pdfFingerprint: pdf.fingerprint
      });
      _pv_pdf = pdf;
      this.handlePageLoadInRange(this.state.initPageNo);
    });
  }

  handlePageLoadInRange = (indexPageNo, reverseLoad = false) => {
    console.log(`handlePageLoadInRange Triggered`);
    if (_pv_pdf === null) {
      console.warn("PdfJS Not Loaded");
      return false;
    }
    this.setState({ currentPageNo: indexPageNo });
    let targetPage = reverseLoad
      ? indexPageNo - this.state.pagesLoadRange
      : indexPageNo + this.state.pagesLoadRange;
    let lowerRange = reverseLoad ? targetPage : indexPageNo;
    let MaxRange = reverseLoad ? indexPageNo : targetPage;
    for (let i = lowerRange; i < MaxRange; ) {
      console.log(`Loading Single Page ${i}`);
      // Not the last page
      if (i > this.state.totalPages) {
        console.info("INFO: Last Page");
        return false;
      }
      this.handleSinglePageLoad(i);
      if (reverseLoad) {
        // Reverse Loading of Pages
        i--;
      } else {
        // Forward Loading of Pages
        i++;
      }
    }
  };

  handleSinglePageLoad = pageNo => {
    console.log(`handleSinglePageLoad Triggered ${pageNo}`);
    if (_pv_pdf === null) {
      console.warn("PdfJS Not Loaded");
      return false;
    }
    // Generate New Canvas for Each Page
    var canvasContainer = document.getElementById("pv-id-canvas-container");
    var canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    canvas.className = `pv-canvas-${pageNo}`;
    canvas.id = `pv-id-canvas-${pageNo}`;
    canvasContainer.appendChild(canvas);

    _pv_pdf.getPage(pageNo).then(page => {
      var scale = 1;
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
        this.onPageRenderComplete({ pageNo: pageNo });
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
    console.log("Page render Complete", e);
    let currentPagesList = this.state.pagesLoaded;
    // Pushing new List
    currentPagesList.push(e.pageNo);
    // De-structure the state variables
    let { funcRegister, funcRegisterTable } = this.state;
    if (funcRegister && typeof funcRegisterTable[e.pageNo] !== "undefined") {
      // Call the Register Func
      funcRegisterTable[e.pageNo]();
      // De register the event
      delete funcRegisterTable[e.pageNo];
      this.setState({
        funcRegister: false,
        funcRegister: funcRegisterTable
      });
    }
    this.setState({
      pagesLoaded: currentPagesList
    });
    this.handlePropCallbackEvents(e, "onEachPageRenderComplete");
  };

  onSearchClick = e => {
    console.log("Click onSearchClick");
    this.handlePropCallbackEvents(e, "onSearchClick");
  };

  onSetCurrentPage = pointedPageIndex => {
    let pageID = `pv-id-canvas-${pointedPageIndex}`;
    this.setState({ currentPageNo: pointedPageIndex });
    // After Page Change
    document
      .getElementById(pageID)
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  };

  onNextClick = e => {
    const { currentPageNo, pagesLoaded, totalPages } = this.state;
    let nextPage = currentPageNo + 1;
    console.log("Click onNextClick", nextPage);

    // Not the last page
    if (nextPage > totalPages) {
      console.info("INFO: Last Page");
      return false;
    }
    // Check if next page is already loaded
    console.log(pagesLoaded.indexOf(nextPage) === -1);
    if (pagesLoaded.indexOf(nextPage) === -1) {
      // Page Not Loaded
      // Load next batch
      this.handlePageLoadInRange(nextPage);
      // Register On Next Page Load
      this.registerFuncCall(nextPage, () => {
        this.onSetCurrentPage(nextPage);
      });
    } else {
      // Display the page in view
      this.onSetCurrentPage(nextPage);
    }
    this.handlePropCallbackEvents(e, "onNextClick");
  };

  registerFuncCall = (pageNo, callBack) => {
    let newTable = Object.assign({}, this.state.funcRegisterTable, {
      [pageNo]: callBack
    });
    this.setState({
      funcRegister: true,
      funcRegisterTable: newTable
    });
  };

  onPrevClick = e => {
    const { currentPageNo, pagesLoaded } = this.state;
    console.log("Click onPrevClick");
    let prevPage = currentPageNo - 1;
    // Not the first page
    if (prevPage === 0) {
      console.info("INFO: First Page");
      return false;
    }
    // Check if next page is already loaded
    console.log(pagesLoaded.indexOf(prevPage) === -1);
    if (pagesLoaded.indexOf(prevPage) === -1) {
      // Page Not Loaded
      // Load next batch
      this.handlePageLoadInRange(prevPage, true);
    } else {
      // Display the page in view
      this.onSetCurrentPage(prevPage);
    }
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
      currentPageNo: this.state.currentPageNo,
      handleSearchClick: this.onSearchClick,
      handleNextClick: this.onNextClick,
      handlePrevClick: this.onPrevClick,
      handleInputChange: this.onInputChange,
      handleZoonInClick: this.onZoonInClick,
      handleZoonOutClick: this.onZoonOutClick
    };
    // Overriding Main Container Style Object
    const mainContainerStyle = {
      height: this.state.availHeight,
      overflow: "hidden"
    };
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
          style={{ height: this.state.availHeight - 38 }}
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
