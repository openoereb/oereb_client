import React from "react";
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";

import {queryExtractById} from '../../api/extract';
import {loadExtract, showError, showExtract} from '../../reducer/extract';
import {updateHistory} from '../../reducer/history';
import {setLanguage} from "../../reducer/language";

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
          zoom: false
        }));
        queryExtractById(serviceUrl, extract.egrid, lang)
          .then((data) => {
            dispatch(showExtract(data));
            dispatch(updateHistory(data));
          })
          .catch(() => {
            dispatch(showError());
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
    <div>
      <button className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        title={t('menu.language.title')}>
        {currentLanguage.toUpperCase()}
      </button>
      <ul className="dropdown-menu">
        {languages}
      </ul>
    </div>
  );
};

export default OerebLanguage;
