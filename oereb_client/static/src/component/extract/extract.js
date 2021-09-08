import './extract.scss';

import React from 'react';
import {useSelector} from 'react-redux';

import OerebExtractData from './extract_data';
import OerebExtractError from './extract_error';
import OerebExtractLoading from './extract_loading';

const OerebExtract = function() {
    const extract = useSelector((state) => state.extract);

    const getContent = function(cfg) {
        if (cfg.loading) {
            return (
                <OerebExtractLoading />
            );
        }
        else if (cfg.error) {
            return (
                <OerebExtractError />
            );
        }
        else if (cfg.visible) {
            return (
                <OerebExtractData data={extract.data.GetExtractByIdResponse.extract} />
            );
        }

            return (
                <div className="oereb-client-extract hidden"></div>
            );

    }

    return getContent(extract);
};

export default OerebExtract;
