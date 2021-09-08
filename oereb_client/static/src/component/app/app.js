import PropTypes from 'prop-types';
import React from 'react';
import {useDispatch} from 'react-redux';

import {update} from '../../reducer/config';
import OerebExtract from '../extract/extract';
import OerebMap from '../map/map';
import OerebMenu from '../menu/menu';

const App = function(props) {
    const dispatch = useDispatch();
    dispatch(update(props.config));

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
