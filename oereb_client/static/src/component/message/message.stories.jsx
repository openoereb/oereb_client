import React from "react";

import OerebMessage from "./message";
import { showError, showWarning } from "../../reducer/message";
import { useDispatch } from "react-redux";

export default {
  title: "API Reference/Component/Message",
  component: OerebMessage,
  tags: ["autodocs"]
};

export const Message = () => {
  const dispatch = useDispatch();

  const warning = () => {
    dispatch(showWarning("This is a warning message example."));
  };

  const error = () => {
    dispatch(showError("This is an error message example."));
  };

  return (
    <div style={{"min-height": "300px"}}>
      <button type="button" className="btn btn-primary me-3" onClick={warning}>Show warning</button>
      <button type="button" className="btn btn-primary me-3" onClick={error}>Show error</button>
      <OerebMessage />
    </div>
  );
};