import OerebMap from '../map/map';

import React from 'react';
import { useDispatch } from 'react-redux';

import { update } from '../../reducer/config';
import OerebMenu from '../menu/menu';
import OerebExtract from '../extract/extract';

function App(props) {
    const dispatch = useDispatch();
    dispatch(update(props.config));

    return (
        <div>
            <OerebMap />
            <OerebExtract />
            <OerebMenu />
        </div>
    );
}

export default App;
