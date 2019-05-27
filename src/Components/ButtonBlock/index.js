import React from "react";

const Btn_Text_Div = {
  display: "inline-block",
  lineHeight: "18px",
  verticalAlign: "middle",
  marginLeft: "6px",
  marginBottom: "8px"
};

const ReactJSPDF_ButtonBlock = props => {
  // Explicit Import of Component from Props
  const BtnIcon = props.BtnIcon;
  const {
    btnBlockStyle,
    onClickEvent,
    title,
    showTextOnly,
    showIconOnly,
    btnText
  } = props;
  return (
    <div
      id="pv-id-button-container"
      className="pv-button-container"
      style={{ display: "inline-block" }}
    >
      <button
        className="btn-secondary like-review"
        style={btnBlockStyle}
        onClick={onClickEvent}
        title={title}
      >
        {// Show Icon Only
        !showTextOnly ? <BtnIcon /> : null}
        {// Show Icon Only
        !showIconOnly ? <div style={Btn_Text_Div}>{btnText}</div> : null}
      </button>
    </div>
  );
};

export default ReactJSPDF_ButtonBlock;
