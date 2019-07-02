import React from "react";
import ReactJSPDF_ButtonBlock from "./../ButtonBlock/index";
import * as EN from "./../../constants/en";
import "./Header.style.css";

import leftArrowIcon from "../../Assets/icons/up-arrow.png";
import rightArrowIcon from "../../Assets/icons/down-arrow.png";
import searchIcon from "../../Assets/icons/search.png";
import plusIcon from "../../Assets/icons/add.png";
import minusIcon from "../../Assets/icons/substract.png";

class ReactJSPDF_Header extends React.PureComponent {
  render() {
    const {
      showIconOnly,
      showTextOnly,
      totalPages,
      currentPageNo,
      handleSearchClick,
      handleNextClick,
      handlePrevClick,
      handleZoonInClick,
      handleZoonOutClick,
      handleInputChange
    } = this.props.config;
    return (
      <div id="pv-id-header-container" className="pv-header-container">
        <ReactJSPDF_ButtonBlock
          onClickEvent={handlePrevClick}
          title={EN.PREV_TITLE}
          showIconOnly={showIconOnly}
          showTextOnly={showTextOnly}
          BtnIcon={leftArrowIcon}
          btnText={EN.PREV_STRING}
        />
        <ReactJSPDF_ButtonBlock
          onClickEvent={handleNextClick}
          title={EN.NEXT_TITLE}
          showIconOnly={showIconOnly}
          showTextOnly={showTextOnly}
          BtnIcon={rightArrowIcon}
          btnText={EN.NEXT_STRING}
        />
        <input
          type="text"
          value={Number(currentPageNo)}
          max={1}
          className="pv-header-pageno"
          onChange={handleInputChange}
        />
        <div className="pv-header-total-pages">{`/${totalPages}`}</div>
        <ReactJSPDF_ButtonBlock
          onClickEvent={handleZoonInClick}
          title={EN.ZOOM_IN_TITLE}
          showIconOnly={showIconOnly}
          showTextOnly={showTextOnly}
          BtnIcon={plusIcon}
          btnText={EN.ZOOM_IN_STRING}
        />
        <ReactJSPDF_ButtonBlock
          onClickEvent={handleZoonOutClick}
          title={EN.ZOOM_OUT_TITLE}
          showIconOnly={showIconOnly}
          showTextOnly={showTextOnly}
          BtnIcon={minusIcon}
          btnText={EN.ZOOM_OUT_STRING}
        />
        <ReactJSPDF_ButtonBlock
          onClickEvent={handleSearchClick}
          title={EN.SEARCH_TITLE}
          showIconOnly={showIconOnly}
          showTextOnly={showTextOnly}
          BtnIcon={searchIcon}
          btnText={EN.SEARCH_STRING}
        />
      </div>
    );
  }
}

export default ReactJSPDF_Header;
