import React from "react";
import "./ButtonBlock.style.css";

const ReactJSPDF_ButtonBlock = props => {
  // Explicit Import of Component from Props
  const BtnIcon = props.BtnIcon;
  const { onClickEvent, title, showTextOnly, showIconOnly, btnText } = props;
  return (
    <div
      id="pv-id-button-container"
      className="pv-button-container"
      style={{ display: "inline-block" }}
    >
      <button
        className="btn-secondary like-review"
        onClick={onClickEvent}
        title={title}
      >
        {// Show Icon Only
        !showTextOnly ? <BtnIcon /> : null}
        {// Show Icon Only
        !showIconOnly ? (
          <div className={`pv-button-text`}>{btnText}</div>
        ) : null}
      </button>
    </div>
  );
};

export default ReactJSPDF_ButtonBlock;
