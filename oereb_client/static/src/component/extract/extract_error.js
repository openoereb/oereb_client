import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {hideExtract, loadExtract, showError, showExtract} from '../../reducer/extract';
import {updateHistory} from '../../reducer/history';
import {queryExtractById} from '../../request/extract';
import {getLocalizedText} from '../../util/language';

/**
 * This component shows an error message if the extract request has failed.
 */
const OerebExtractError = function () {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config).config;
  const extract = useSelector((state) => state.extract);
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;

  const getOptionalAttribut = function (value) {
    if (value) {
      return (
        <span>
          <br />{value}
        </span>
      );
    }
    return null;
  };

  const getPhone = function () {
    if (config.support.phone) {
      return (
        <span>
          <br />
          <i className="bi bi-telephone-fill" title={t('extract.error.support.phone.title')}></i>&nbsp;
          {config.support.phone}
        </span>
      );
    }
    return null;
  };

  const getMail = function () {
    if (config.support.email) {
      return (
        <span>
          <br />
          <i className="bi bi-envelope-fill" title={t('extract.error.support.email.title')}></i>&nbsp;
          <a ng-href="mailto:{config.support.email}">
            {config.support.email}
          </a>
        </span>
      );
    }
    return null;
  };

  const office1 = getLocalizedText(config.support.office1, currentLanguage, defaultLanguage);
  const office2 = getOptionalAttribut(getLocalizedText(
    config.support.office2, currentLanguage, defaultLanguage
  ));
  const street = getOptionalAttribut(config.support.street);
  const city = getOptionalAttribut(config.support.city);
  const phone = getPhone();
  const email = getMail();
  const serviceUrl = config.service_url;

  const closeExtract = function () {
    dispatch(hideExtract());
  };

  const retryExtract = function () {
    dispatch(loadExtract({
      egrid: extract.egrid,
      identdn: extract.identdn,
      number: extract.number,
      zoom: true
    }));
    queryExtractById(
      serviceUrl,
      extract.egrid,
      extract.identdn,
      extract.number,
      config.extract_json_timeout,
      currentLanguage
    )
      .then((data) => {
        dispatch(showExtract(data));
        dispatch(updateHistory(data));
      })
      .catch(() => {
        dispatch(showError());
      });
  }

  return (
    <div className="oereb-client-extract oereb-client-extract-error container-fluid">
      <p className="text-end">
        <button onClick={closeExtract}
          className="btn btn-outline-secondary"
          type="button">
          <i className="bi bi-x-lg"></i>
        </button>
      </p>
      <h3>
        <i className="bi bi-exclamation-circle-fill text-secondary"></i>&nbsp;
        {t('extract.error.title')}
      </h3>
      <p>
        {t('extract.error.message')}
      </p>
      <p className="text-center">
        <button onClick={retryExtract} className="btn btn-secondary">
          {t('extract.error.button.text')}
        </button>
      </p>
      <p>
        {t('extract.error.support.message')}
      </p>
      <address>
        <strong>{office1}</strong>
        {office2}
        {street}
        {city}
        {phone}
        {email}
      </address>
    </div>
  )
};

export default OerebExtractError;
