import {isString} from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";
import {useSelector} from "react-redux";

import {format} from "../../util/string";

/**
 * A button which calls a configured URL providing an user guide. The URL can be parametrized
 * with the currently selected language. The button is only shown, if the corresponding configuration
 * ("user_guide") is available.
 */
const OerebUserGuide = function () {
  const {t} = useTranslation();
  const config = useSelector((state) => state.config).config;
  const currentLanguage = useSelector((state) => state.language).current;

  if (!isString(config['user_guide'])) {
    return null;
  }

  const openUserGuide = function () {
    const values = {
      'lang': currentLanguage
    };
    const url = config['user_guide'];
    window.open(encodeURI(format(url, values)), '_blank');
  };

  return (
    <button type="button"
      className="btn btn-outline-secondary oereb-client-user-guide"
      title={t('menu.user_guide.title')}
      onClick={openUserGuide}>
      <i className="bi bi-question-circle"></i>
    </button>
  );
};

export default OerebUserGuide;
