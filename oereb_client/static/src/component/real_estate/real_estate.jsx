import PropTypes from 'prop-types';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {getLocalizedText} from '../../util/language';

/**
 * This component shows the real estate information.
 */
const OerebRealEstate = function (props) {
  const {t} = useTranslation();
  const realEstate = props.data;
  const number = realEstate.Number;
  const municipality = realEstate.MunicipalityName;
  const egrid = realEstate.EGRID;
  const area = realEstate.LandRegistryArea;
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;
  const type = getLocalizedText(realEstate.Type.Text, currentLanguage, defaultLanguage);

  return (
    <div className="container-fluid mt-3 oereb-client-real-estate">
      <h5>
        {type} {number} {t('extract.real_estate.at')} {municipality}
      </h5>
      <div className="row row-cols-2">
        <div className="col-3"><strong>{t('extract.real_estate.egrid')}:</strong></div>
        <div className="col-9">{egrid}</div>
      </div>
      <div className="row row-cols-2">
        <div className="col-3"><strong>{t('extract.real_estate.area')}:</strong></div>
        <div className="col-9">{area} m²</div>
      </div>
    </div>
  );
};

OerebRealEstate.propTypes = {

  /** The real estate data. */
  data: PropTypes.object.isRequired

};

export default OerebRealEstate;
