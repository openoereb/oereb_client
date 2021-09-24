import {saveAs} from "file-saver";
import {isString} from "lodash";
import React, {useRef} from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {queryStaticExtractById} from "../../api/extract";

const OerebStaticExtract = function () {
  const {t} = useTranslation();
  const config = useSelector((state) => state.config).config;
  const extract = useSelector((state) => state.extract);
  const icon = useRef(null);

  const requestStaticExtract = function () {
    if (extract.visible && isString(extract.egrid)) {
      const identifier = extract.data['GetExtractByIdResponse']['extract']['ExtractIdentifier'];
      icon.current.classList.remove('bi', 'bi-file-earmark-pdf');
      icon.current.classList.add('spinner-grow', 'spinner-grow-sm');
      queryStaticExtractById(config['application_url'], extract.egrid)
        .then((pdfFile) => {
          const fileName = identifier + '.pdf';
          icon.current.classList.remove('spinner-grow', 'spinner-grow-sm');
          icon.current.classList.add('bi', 'bi-file-earmark-pdf');
          saveAs(new Blob([pdfFile], {'type': 'application/pdf'}), fileName);
        })
        .catch(() => {
          icon.current.classList.remove('spinner-grow', 'spinner-grow-sm');
          icon.current.classList.add('bi', 'bi-file-earmark-pdf');
        });
    }
  };

  return (
    <button type="button"
      className="btn btn-outline-secondary"
      title={t('extract.static_extract.title')}
      onClick={requestStaticExtract}>
      <i ref={icon} className="bi bi-file-earmark-pdf"></i>
    </button>
  );
};

export default OerebStaticExtract;
