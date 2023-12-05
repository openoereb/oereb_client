import '../../oereb_client.scss';

import React from 'react';
import {useTranslation} from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBackground } from '../../reducer/extract';

/**
 * A simple button component to hide the background map.
 */
const OerebToggleBackground = function () {
  const {t} = useTranslation();
  const background = useSelector((state) => state.extract).background;
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleBackground());
  };

  let buttonClass;
  if (background) {
    buttonClass = "btn btn-outline-secondary";
  }
  else {
    buttonClass = "btn btn-secondary";
  }

  return (
    <button type="button"
      className={buttonClass}
      onClick={toggle}
      title={t('extract.hide_background.title')}>
      <i className="bi bi-layers-half"></i>
    </button>
  );
};

export default OerebToggleBackground;