import OerebMap from '../map/map';

import React from 'react';
import { useDispatch } from 'react-redux';

import { update } from '../../reducer/config';

function App(props) {
    const dispatch = useDispatch();
    dispatch(update(props.config));

    return <OerebMap />;
}

export default App;
