import PropTypes from 'prop-types';
import React from 'react';
import {useTranslation} from 'react-i18next';

const OerebRealEstate = function (props) {
  const {t} = useTranslation();
  const realEstate = props.data;
  const number = realEstate.Number;
  const municipality = realEstate.MunicipalityName;
  const egrid = realEstate.EGRID;
  const area = realEstate.LandRegistryArea;

  return (
    <div className="container-fluid mt-3 oereb-client-real-estate">
      <h5>
        {t('extract.real_estate.real_estate')} {number} {t('extract.real_estate.at')} {municipality}
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
  data: PropTypes.object.isRequired
};

export default OerebRealEstate;
