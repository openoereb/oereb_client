import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {queryExtractById} from '../../api/extract';
import {hideExtract, loadExtract, showError, showExtract} from '../../reducer/extract';
import {updateHistory} from '../../reducer/history';

const OerebExtractError = function () {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config).config;
  const extract = useSelector((state) => state.extract);

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
          <i className="bi bi-telephone-fill" title="Telefon"></i> {config.support.phone}
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
          <i className="bi bi-envelope-fill" title="E-Mail"></i>&nbsp;
          <a ng-href="mailto:{config.support.email}">
            {config.support.email}
          </a>
        </span>
      );
    }
    return null;
  };

  const office1 = config.support.office1;
  const office2 = getOptionalAttribut(config.support.office2);
  const street = getOptionalAttribut(config.support.street);
  const city = getOptionalAttribut(config.support.city);
  const phone = getPhone();
  const email = getMail();
  const applicationUrl = config.application_url;

  const closeExtract = function () {
    dispatch(hideExtract());
  };

  const retryExtract = function () {
    dispatch(loadExtract({
      egrid: extract.egrid,
      zoom: true
    }));
    queryExtractById(applicationUrl, extract.egrid)
      .then((data) => {
        dispatch(showExtract(data));
        dispatch(updateHistory(data));
      })
      .catch(() => {
        dispatch(showError());
      });
  }

  return (
    <div className="oereb-client-extract container-fluid">
      <p className="text-end">
        <button onClick={closeExtract}
          className="btn btn-outline-secondary"
          type="button">
          <i className="bi bi-x-lg"></i>
        </button>
      </p>
      <h3>
        <i className="bi bi-exclamation-circle-fill text-secondary"></i> Auszug fehlgeschlagen
      </h3>
      <p>
        Bei der Generierung des Auszugs ist ein Fehler aufgetreten.
        Bitte versuchen Sie, den Auszug erneut anzufordern.
      </p>
      <p className="text-center">
        <button onClick={retryExtract} className="btn btn-secondary">Erneut versuchen</button>
      </p>
      <p>
        Sollte der Fehler wiederholt auftreten,
        kontaktieren Sie bitte die katasterverantwortliche Stelle:
      </p>
      <p>
        <address>
          <strong>{office1}</strong>
          {office2}
          {street}
          {city}
          {phone}
          {email}
        </address>
      </p>
    </div>
  )
};

export default OerebExtractError;
