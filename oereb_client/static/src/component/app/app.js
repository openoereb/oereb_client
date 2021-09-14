import PropTypes from 'prop-types';
import React from 'react';
import {useDispatch} from 'react-redux';

import {queryExtractById} from '../../api/extract';
import {update} from '../../reducer/config';
import {loadExtract, showError, showExtract} from '../../reducer/extract';
import OerebExtract from '../extract/extract';
import OerebMap from '../map/map';
import OerebMenu from '../menu/menu';

const App = function(props) {
    const dispatch = useDispatch();
    const config = props.config;
    const query = new URLSearchParams(window.location.search);

    dispatch(update(config));

    if (query.has('egrid')) {
        const egrid = query.get('egrid');
        dispatch(loadExtract({
            egrid: egrid
        }));
        queryExtractById(config.application_url, egrid)
        .then((extract) => {
            dispatch(showExtract({
                extract: extract
            }));
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
