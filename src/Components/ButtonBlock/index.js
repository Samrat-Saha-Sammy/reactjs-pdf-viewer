import React from "react";
import "./ButtonBlock.style.css";

const ReactJSPDF_ButtonBlock = props => {
  // Explicit Import of Component from Props
  const BtnIconImage = props.BtnIcon;
  const { onClickEvent, title, showTextOnly, showIconOnly, btnText } = props;
  return (
    <div
      id="pv-id-button-container"
      className="pv-button-container"
      style={{ display: "inline-block" }}
    >
      <div
        className="btn-secondary like-review"
        onClick={onClickEvent}
        title={title}
      >
        {// Show Icon Only
        !showTextOnly ? (
          <img className={`pv-button-image`} src={BtnIconImage.src} />
        ) : null}
        {// Show Icon Only
        !showIconOnly ? (
          <div className={`pv-button-text`}>{btnText}</div>
        ) : null}
      </div>
    </div>
  );
};

export default ReactJSPDF_ButtonBlock;
