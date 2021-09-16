import './extract.scss';

import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

import OerebExtractData from './extract_data';
import OerebExtractError from './extract_error';
import OerebExtractLoading from './extract_loading';

const OerebExtract = function() {
    const extract = useSelector((state) => state.extract);
    const wrapper = useRef(null);

    const content = (() => {
        if (extract.loading) {
            return (
                <OerebExtractLoading />
            );
        }
        else if (extract.error) {
            return (
                <OerebExtractError />
            );
        }
        else if (extract.visible) {
            return (
                <OerebExtractData data={extract.data.GetExtractByIdResponse.extract} />
            );
        }
        return null;
    })();

    useEffect(() => {
        wrapper.current.classList.remove('hidden', 'loading', 'shown');
        if (extract.loading) {
            wrapper.current.classList.add('loading');
        }
        else if (extract.visible || extract.error) {
            wrapper.current.classList.add('shown');
        }
        else {
            wrapper.current.classList.add('hidden');
        }
    });

    return (
        <div ref={wrapper} className="oereb-client-extract-wrapper">
            {content}
        </div>
    );
};

export default OerebExtract;
