import "../../oereb_client.scss";

import React from "react";
import {useTranslation} from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toggleHighlight } from "../../reducer/extract";

/**
 * A simple button component to hide the real estate highlight.
 */
const OerebToggleHighlight = function () {
  const {t} = useTranslation();
  const highlight = useSelector((state) => state.extract).highlight;
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleHighlight());
  };

  let buttonClass;
  if (highlight) {
    buttonClass = "btn btn-outline-secondary oereb-client-toggle-highlight";
  }
  else {
    buttonClass = "btn btn-secondary oereb-client-toggle-highlight";
  }

  return (
    <button type="button"
      className={buttonClass}
      onClick={toggle}
      title={t("extract.hide_highlight.title")}>
      <i className="bi bi-bounding-box-circles"></i>
    </button>
  );
};

OerebToggleHighlight.propTypes = {};

export default OerebToggleHighlight;