import {isString} from 'lodash';
import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {initAvailability, setAvailabilityPrefix} from '../../reducer/availability';
import {update} from '../../reducer/config';
import {loadExtract, showError, showExtract} from '../../reducer/extract';
import {initHistory, setHistoryPrefix, updateHistory} from '../../reducer/history';
import {initLanguages} from '../../reducer/language';
import {initSymbolZoom, setSymbolZoomPrefix} from '../../reducer/symbol_zoom';
import {queryExtractById} from '../../request/extract';
import OerebExtract from '../extract/extract';
import OerebInformationPanel from '../information_panel/information_panel';
import OerebMap from '../map/map';
import OerebMenu from '../menu/menu';
import OerebMessage from '../message/message';
import MatomoTracker from '../matomo_tracker/matomo_tracker';

const App = function (props) {
  const dispatch = useDispatch();
  const config = props.config;
  const query = new URLSearchParams(window.location.search);

  dispatch(initLanguages({
    available: config['application']['languages'],
    default: config['application']['default_language']
  }));

  dispatch(update(config));
  if (isString(config.application.local_storage_prefix)) {
    const prefix = config.application.local_storage_prefix;
    dispatch(setHistoryPrefix(prefix));
    dispatch(setAvailabilityPrefix(prefix));
    dispatch(setSymbolZoomPrefix(prefix));
  }
  dispatch(initHistory());
  dispatch(initAvailability());
  dispatch(initSymbolZoom());

  const hasEgrid = query.has('egrid');
  const hasIdentdn = query.has('identdn') && query.has('number');

  if (hasEgrid || hasIdentdn) {
    const egrid = query.get('egrid') || null;
    const identdn = query.get('identdn') || null;
    const number = query.get('number') || null;
    dispatch(loadExtract({
      egrid: egrid,
      identdn: identdn,
      number: number,
      zoom: true
    }));
    queryExtractById(
      config.service_url,
      egrid,
      identdn,
      number,
      config.extract_json_timeout,
      query.get('lang')
    )
      .then((extract) => {
        dispatch(showExtract(extract));
        dispatch(updateHistory(extract));
      })
      .catch(() => {
        dispatch(showError());
      });
  }

  let tracker = null;
  if (config['matomo'] && config['matomo']['url'] && config['matomo']['site_id']) {
    tracker = <MatomoTracker matomoUrl={config['matomo']['url']} siteId={config['matomo']['site_id']} />;
  }

  return (
    <div className="oereb-client-app">
        <OerebMap />
        <OerebInformationPanel />
        <OerebExtract />
        <OerebMenu />
        <OerebMessage />
        {tracker}
    </div>
  );
};

App.propTypes = {
  config: PropTypes.object.isRequired
};

export default App;
