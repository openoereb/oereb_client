import './extract.scss';

import React from 'react';
import { useSelector } from 'react-redux';
import OerebExtractLoading from './extract_loading';
import OerebExtractError from './extract_error';
import OerebExtractData from './extract_data';

function OerebExtract(props) {
    const extract = useSelector((state) => state.extract);

    function getContent(cfg) {
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
        else {
            return null;
        }
    }

    const content = getContent(extract);

    return (
        <div class="oereb-client-extract">
            {content}
        </div>
    );
}

export default OerebExtract;
