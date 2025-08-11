import React from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {hideExtract, loadExtract, showError, showExtract} from "../../reducer/extract";
import {updateHistory} from "../../reducer/history";
import {setLanguage} from "../../reducer/language";
import {queryExtractById} from "../../request/extract";
import {TooManyRequestsError} from "../../util/error";
import {showWarning} from "../../reducer/message";

/**
 * This component provides the language selector.
 */
const OerebLanguage = function() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config).config;
  const serviceUrl = config.service_url;
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const availableLanguages = language.available;
  const extract = useSelector((state) => state.extract);

  const selectLanguage = function(lang) {
    if (lang !== currentLanguage) {
      dispatch(setLanguage(lang));
      if (extract.visible) {
        dispatch(loadExtract({
          egrid: extract.egrid,
          identdn: extract.identdn,
          number: extract.number,
          zoom: false
        }));
        queryExtractById(
          serviceUrl,
          extract.egrid,
          extract.identdn,
          extract.number,
          config.extract_json_timeout,
          lang
        )
          .then((data) => {
            dispatch(showExtract(data));
            dispatch(updateHistory(data));
          })
          .catch((error) => {
            if (error instanceof TooManyRequestsError) {
              dispatch(hideExtract());
              dispatch(showWarning(t('extract.error.too_many_requests'), true));
            }
            else {
              dispatch(showError());
            }
          });
      }
    }
  };

  const languages = availableLanguages.map((language, key) =>
    <li key={key}>
      <button className="dropdown-item" onClick={selectLanguage.bind(this, language)}>
        {language.toUpperCase()}
      </button>
    </li>
  );

  return (
    <div className="oereb-client-language-selector">
      <button className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        title={t("menu.language.title")}>
        {currentLanguage.toUpperCase()}
      </button>
      <ul className="dropdown-menu">
        {languages}
      </ul>
    </div>
  );
};

export default OerebLanguage;
