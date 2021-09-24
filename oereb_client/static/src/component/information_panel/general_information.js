import {isObject} from "lodash";
import React from "react";
import {useSelector} from "react-redux";

import {getLocalizedText} from "../../util/language";

const OerebGeneralInformation = function () {
  const extract = useSelector((state) => state.extract);
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;

  const validExtract =
    extract.visible &&
    isObject(extract.data) &&
    isObject(extract.data['GetExtractByIdResponse']) &&
    isObject(extract.data['GetExtractByIdResponse']['extract']);

  if (!validExtract) {
    return null;
  }

  const authority = extract.data['GetExtractByIdResponse']['extract']['PLRCadastreAuthority'];
  const authorityLogo = extract.data['GetExtractByIdResponse']['extract']['CantonalLogoRef'];
  const authorityName = getLocalizedText(authority['Name'], currentLanguage, defaultLanguage);
  const authorityStreet = authority['Street'] + ' ' + authority['Number'];
  const authorityCity = authority['PostalCode'] + ' ' + authority['City'];
  const authorityUrl = authority['OfficeAtWeb'];
  let authorityFlexClass = 'd-flex g-0';
  if (document.body.offsetWidth < 1200) {
    authorityFlexClass += ' flex-column';
  }

  const baseData = getLocalizedText(
    extract.data['GetExtractByIdResponse']['extract']['BaseData'],
    currentLanguage,
    defaultLanguage
  );

  const generalInformation = getLocalizedText(
    extract.data['GetExtractByIdResponse']['extract']['GeneralInformation'],
    currentLanguage,
    defaultLanguage
  );

  const federalLogo = extract.data['GetExtractByIdResponse']['extract']['FederalLogoRef'];
  const municipalityLogo = extract.data['GetExtractByIdResponse']['extract']['MunicipalityLogoRef'];
  let logosFlexClass = 'card-text d-flex align-items-center';
  if (document.body.offsetWidth < 1200) {
    logosFlexClass += ' flex-column';
  }

  return (
    <div className="container-fluid">
      <div className="card">
        <div className={authorityFlexClass}>
          <div>
            <div className="card-body">
              <h5 className="card-title">Katasterverantwortliche Stelle</h5>
              <p className="card-text fw-bold m-0">{authorityName}</p>
              <p className="card-text m-0">{authorityStreet}</p>
              <p className="card-text m-0">{authorityCity}</p>
              <p className="card-text m-0">
                <a href={authorityUrl} target="_blank" rel="noreferrer">
                  {authorityUrl}
                </a>
              </p>
            </div>
          </div>
          <div>
            <img src={authorityLogo} className="img-fluid" />
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="d-flex g-0">
          <div>
            <div className="card-body">
              <h5 className="card-title">Grundlagedaten</h5>
              <p className="card-text m-0">{baseData}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="d-flex g-0">
          <div>
            <div className="card-body">
              <h5 className="card-title">Allgemeine Informationen</h5>
              <p className="card-text m-0">{generalInformation}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-4">
        <div className="d-flex g-0">
          <div>
            <div className="card-body">
              <h5 className="card-title">Weiterhin an diesem Auszug beteilig sind</h5>
              <div className={logosFlexClass}>
                <img src={federalLogo} className="img-fluid" />
                <img src={municipalityLogo} className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OerebGeneralInformation;
