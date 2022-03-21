import {isObject} from "lodash";
import React from "react";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";

import {getLocalizedText} from "../../util/language";

/**
 * This component shows the extract's general information, such as cadastral base data,
 * the PLR-cadastre authority and involved parties.
 */
const OerebGeneralInformation = function () {
  const {t} = useTranslation();
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
  const authorityUrl = getLocalizedText(authority['OfficeAtWeb'], currentLanguage, defaultLanguage);
  let authorityFlexClass = 'd-flex g-0';
  if (document.body.offsetWidth < 1200) {
    authorityFlexClass += ' flex-column';
  }

  const updateDateCS = new Date(extract.data['GetExtractByIdResponse']['extract']['UpdateDateCS'])
    .toLocaleDateString('de-CH');

  const generalInformationItems = extract.data['GetExtractByIdResponse']['extract']['GeneralInformation'];
  const generalInformation = generalInformationItems.map((item, key) => {
    const text = getLocalizedText(
      item,
      currentLanguage,
      defaultLanguage
    );
    return <p key={key} className="card-text m-0 mb-2">{text}</p>;
  });

  const federalLogo = extract.data['GetExtractByIdResponse']['extract']['FederalLogoRef'];
  const municipalityLogo = extract.data['GetExtractByIdResponse']['extract']['MunicipalityLogoRef'];
  const municipalityName = extract
    .data['GetExtractByIdResponse']['extract']['RealEstate']['MunicipalityName'];
  let logosFlexClass = 'card-text d-flex align-items-stretch';
  if (document.body.offsetWidth < 1200) {
    logosFlexClass += ' flex-column';
  }

  return (
    <div className="container-fluid oereb-client-general-information">
      <div className="card oereb-client-authority">
        <div className={authorityFlexClass}>
          <div>
            <div className="card-body">
              <h5 className="card-title">
                {t('extract.information_panel.general_information.authority')}
              </h5>
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
            <div className="card-body">
              <img src={authorityLogo} className="img-fluid oereb-client-authority-logo" />
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-4 oereb-client-base-data">
        <div className="d-flex g-0">
          <div>
            <div className="card-body">
              <h5 className="card-title">
                {t('extract.information_panel.general_information.base_data')}
              </h5>
              <p className="card-text m-0">
                {t('extract.information_panel.general_information.update_date_cs')}: {updateDateCS}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-4 oereb-client-general-information-card">
        <div className="d-flex g-0">
          <div>
            <div className="card-body pb-1">
              <h5 className="card-title">
                {t('extract.information_panel.general_information.general_information')}
              </h5>
              {generalInformation}
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-4 oereb-client-involved-parties">
        <div className="d-flex g-0">
          <div>
            <div className="card-body">
              <h5 className="card-title">
                {t('extract.information_panel.general_information.further_participants')}
              </h5>
              <div className={logosFlexClass}>
                <div className="text-center">
                  <img src={federalLogo} className="img-fluid oereb-client-federal-logo" />
                </div>
                <div className="text-center">
                  <img src={municipalityLogo} className="img-fluid oereb-client-municipality-logo" />
                  <p>{municipalityName}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OerebGeneralInformation;
