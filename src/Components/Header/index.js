import React from "react";
import ReactJSPDF_ButtonBlock from "./../ButtonBlock/index";
import * as EN from "./../../constants/en";

import {
  FaSearch as SearchIcon,
  FaChevronLeft as LeftArrowIcon,
  FaChevronRight as RightArrowIcon,
  FaPlus as PlusIcon,
  FaMinus as MinusIcon
} from "react-icons/fa";

const styles = {
  btnSecondary: {
    margin: "0px 8px 2px 0px",
    textAlign: "center",
    background: "transparent",
    padding: "2px",
    fontSize: "18px",
    cursor: "pointer",
    border: "0px solid white",
    outline: "none",
    color: "#ffffff",
    textDecoration: "none"
  },
  Text: {
    margin: "0px 2px 2px 0px",
    textAlign: "center",
    padding: "2px",
    fontSize: "12px",
    color: "#ffffff",
    textDecoration: "none",
    display: "inline-block"
  },
  Input: {
    fontSize: "12px",
    width: "15px",
    height: "15px",
    margin: "0px 2px 0 0",
    display: "inline-block",
    textAlign: "center",
    backgroundColor: "#525863",
    border: "0px",
    color: "white",
    marginLeft: "60px"
  },
  headerContainer: {
    width: "100%",
    textAlign: "center",
    backgroundColor: "#474747",
    boxShadow:
      "inset 0 1px 1px hsla(0,0%,0%,.15), inset 0 -1px 0 hsla(0,0%,100%,.05), 0 1px 0 hsla(0,0%,0%,.15), 0 1px 1px hsla(0,0%,0%,.1)"
  }
};

class ReactJSPDF_Header extends React.PureComponent {
  render() {
    const {
      showIconOnly,
      showTextOnly,
      totalPages,
      pageNo,
      handleSearchClick,
      handleNextClick,
      handlePrevClick,
      handleZoonInClick,
      handleZoonOutClick,
      handleInputChange
    } = this.props.config;
    return (
      <div
        id="pv-id-header-container"
        className="pv-header-container"
        style={styles.headerContainer}
      >
        <ReactJSPDF_ButtonBlock
          btnBlockStyle={styles.btnSecondary}
          onClickEvent={handleSearchClick}
          title={EN.SEARCH_TITLE}
          showIconOnly={showIconOnly}
          showTextOnly={showTextOnly}
          BtnIcon={SearchIcon}
          btnText={EN.SEARCH_STRING}
        />
        <ReactJSPDF_ButtonBlock
          btnBlockStyle={styles.btnSecondary}
          onClickEvent={handlePrevClick}
          title={EN.PREV_TITLE}
          showIconOnly={showIconOnly}
          showTextOnly={showTextOnly}
          BtnIcon={LeftArrowIcon}
          btnText={EN.PREV_STRING}
        />
        <ReactJSPDF_ButtonBlock
          btnBlockStyle={styles.btnSecondary}
          onClickEvent={handleNextClick}
          title={EN.NEXT_TITLE}
          showIconOnly={showIconOnly}
          showTextOnly={showTextOnly}
          BtnIcon={RightArrowIcon}
          btnText={EN.NEXT_STRING}
        />
        <ReactJSPDF_ButtonBlock
          btnBlockStyle={styles.btnSecondary}
          onClickEvent={handleZoonInClick}
          title={EN.ZOOM_IN_TITLE}
          showIconOnly={showIconOnly}
          showTextOnly={showTextOnly}
          BtnIcon={PlusIcon}
          btnText={EN.ZOOM_IN_STRING}
        />
        <ReactJSPDF_ButtonBlock
          btnBlockStyle={styles.btnSecondary}
          onClickEvent={handleZoonOutClick}
          title={EN.ZOOM_OUT_TITLE}
          showIconOnly={showIconOnly}
          showTextOnly={showTextOnly}
          BtnIcon={MinusIcon}
          btnText={EN.ZOOM_OUT_STRING}
        />
        <input
          type="number"
          value={pageNo}
          style={styles.Input}
          onChange={handleInputChange}
        />
        <div style={styles.Text}> of {totalPages}</div>
      </div>
    );
  }
}

export default ReactJSPDF_Header;
