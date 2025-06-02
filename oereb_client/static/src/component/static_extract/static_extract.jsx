import {saveAs} from "file-saver";
import React, {useRef} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {showError} from "../../reducer/extract";
import {queryStaticExtractById} from "../../request/extract";

/**
 * A simple button to request the static extract for the currently loaded real estate.
 */
const OerebStaticExtract = function () {
  const {t} = useTranslation();
  const config = useSelector((state) => state.config).config;
  const extract = useSelector((state) => state.extract);
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const icon = useRef(null);
  const dispatch = useDispatch();

  const requestStaticExtract = function () {
    if (extract.visible) {
      const identifier = extract.data["GetExtractByIdResponse"]["extract"]["ExtractIdentifier"];
      icon.current.classList.remove("bi", "bi-file-earmark-pdf");
      icon.current.classList.add("spinner-grow", "spinner-grow-sm");
      queryStaticExtractById(
        config.service_url,
        extract.egrid,
        extract.identdn,
        extract.number,
        config.extract_pdf_timeout,
        currentLanguage
      )
        .then((pdfFile) => {
          const fileName = identifier + ".pdf";
          icon.current.classList.remove("spinner-grow", "spinner-grow-sm");
          icon.current.classList.add("bi", "bi-file-earmark-pdf");
          saveAs(new Blob([pdfFile], {"type": "application/pdf"}), fileName);
        })
        .catch(() => {
          icon.current.classList.remove("spinner-grow", "spinner-grow-sm");
          icon.current.classList.add("bi", "bi-file-earmark-pdf");
          dispatch(showError());
        });
    }
  };

  return (
    <button type="button"
      className="btn btn-outline-secondary oereb-client-static-extract"
      title={t("extract.static_extract.title")}
      onClick={requestStaticExtract}>
      <i ref={icon} className="bi bi-file-earmark-pdf"></i>
    </button>
  );
};

export default OerebStaticExtract;
