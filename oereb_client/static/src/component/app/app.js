import {isString} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {useDispatch} from 'react-redux';

import {queryExtractById} from '../../api/extract';
import {initAvailability, setAvailabilityPrefix} from '../../reducer/availability';
import {update} from '../../reducer/config';
import {loadExtract, showError, showExtract} from '../../reducer/extract';
import {initHistory, setHistoryPrefix, updateHistory} from '../../reducer/history';
import {initLanguages} from '../../reducer/language';
import {initSymbolZoom, setSymbolZoomPrefix} from '../../reducer/symbol_zoom';
import OerebExtract from '../extract/extract';
import OerebInformationPanel from '../information_panel/information_panel';
import OerebMap from '../map/map';
import OerebMenu from '../menu/menu';

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

  if (query.has('egrid')) {
    const egrid = query.get('egrid');
    dispatch(loadExtract({
      egrid: egrid,
      zoom: true
    }));
    queryExtractById(config.application_url, egrid)
      .then((extract) => {
        dispatch(showExtract(extract));
        dispatch(updateHistory(extract));
      })
      .catch(() => {
        dispatch(showError());
      });
  }

  return (
    <div>
      <OerebMap />
      <OerebInformationPanel />
      <OerebExtract />
      <OerebMenu />
    </div>
  );
};

App.propTypes = {
  config: PropTypes.object.isRequired
};

export default App;
