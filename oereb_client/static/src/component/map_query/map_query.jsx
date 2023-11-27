import './map_query.scss';

import Overlay from 'ol/Overlay';
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setViewServices} from '../../reducer/accordion';
import {loadExtract, showError, showExtract} from '../../reducer/extract';
import {updateHistory} from '../../reducer/history';
import {hide} from '../../reducer/map_query';
import {queryExtractById} from '../../request/extract';
import {getLocalizedText} from '../../util/language';

/**
 * A OpenLayers overlay component to select a real estate in the map.
 */
const OerebMapQuery = function (props) {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config).config;
  const mapQuery = useSelector((state) => state.mapQuery);
  const mapQueryElement = useRef(null);
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;
  const [overlay, setOverlay] = useState(null);

  const serviceUrl = config.service_url;
  const map = props.map;

  useEffect(() => {
    if (overlay === null) {
      const newOverlay = new Overlay({
        element: mapQueryElement.current,
        autoPan: {
          animation: true,
          margin: Math.min(document.body.offsetWidth, document.body.offsetHeight) / 2
        },
        offset: [-17, -17]
      });
      map.addOverlay(newOverlay);
      setOverlay(newOverlay);
    }
  });

  const close = function () {
    dispatch(hide());
  };

  const queryExtract = function (egrid, identdn, number) {
    dispatch(hide());
    dispatch(setViewServices([]));
    dispatch(loadExtract({
      egrid: egrid,
      identdn: identdn,
      number: number,
      zoom: false
    }));
    queryExtractById(serviceUrl, egrid, identdn, number, config.extract_json_timeout, currentLanguage)
      .then((extract) => {
        dispatch(showExtract(extract));
        dispatch(updateHistory(extract));
      })
      .catch(() => {
        dispatch(showError());
      });
  };

  const listResults = mapQuery.results.map((result, key) => {
    const egrid = result.egrid;
    const identdn = result.identDN;
    const number = result.number;
    const type = getLocalizedText(result.type.Text, currentLanguage, defaultLanguage);
    return (
      <button key={key}
        onClick={queryExtract.bind(this, egrid, identdn, number)}
        type="button"
        className="list-group-item list-group-item-action">
        <small>{type} {number}</small>
      </button>
    );
  });

  if (mapQuery.loading) {
    overlay.setPosition([mapQuery.posX, mapQuery.posY]);
    return (
      <div className="oereb-client-overlay" ref={mapQueryElement}>
        <div className="loader">
          <div className="spinner-grow"></div>
        </div>
      </div>
    );
  }
  else if (mapQuery.visible) {
    overlay.setPosition([mapQuery.posX, mapQuery.posY]);
    return (
      <div className="oereb-client-overlay" ref={mapQueryElement}>
        <div className="results">
          <div className="background-icon"></div>
          <div className="content list-group">
            <button onClick={close}
              type="button"
              className="list-group-item list-group-item-action text-end">
              <strong className="bi bi-x"></strong>
            </button>
            {listResults}
          </div>
          <div className="icon">
            <div className="icon-outer">
              <div className="icon-inner"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="oereb-client-overlay" ref={mapQueryElement}></div>
  );

};

OerebMapQuery.propTypes = {

  /** The OpenLayers map instance. */
  map: PropTypes.object.isRequired

};

export default OerebMapQuery;
