import {isString} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {useDispatch} from 'react-redux';

import {queryExtractById} from '../../api/extract';
import {update} from '../../reducer/config';
import {loadExtract, showError, showExtract} from '../../reducer/extract';
import {initHistory, setHistoryPrefix, updateHistory} from '../../reducer/history';
import OerebExtract from '../extract/extract';
import OerebMap from '../map/map';
import OerebMenu from '../menu/menu';

const App = function(props) {
    const dispatch = useDispatch();
    const config = props.config;
    const query = new URLSearchParams(window.location.search);

    dispatch(update(config));
    if (isString(config.application.local_storage_prefix)) {
        dispatch(setHistoryPrefix(config.application.local_storage_prefix));
    }
    dispatch(initHistory());

    if (query.has('egrid')) {
        const egrid = query.get('egrid');
        dispatch(loadExtract(egrid));
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
            <OerebExtract />
            <OerebMenu />
        </div>
    );
};

App.propTypes = {
    config: PropTypes.object.isRequired
};

export default App;
