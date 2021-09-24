import PropTypes from 'prop-types';
import React from "react";
import {withNamespaces} from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";

import {setLanguage} from "../../reducer/language";

const OerebLanguage = function({t}) {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const availableLanguages = language.available;

  const selectLanguage = function(lang) {
    dispatch(setLanguage(lang));
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

OerebLanguage.propTypes = {
  t: PropTypes.func.isRequired
};

export default withNamespaces()(OerebLanguage);
