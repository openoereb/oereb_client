import React from 'react';
import { useDispatch } from 'react-redux';

import { hideExtract } from '../../reducer/extract';
import OerebRealEstate from '../real_estate/real_estate';

function OerebExtractData(props) {
    const dispatch = useDispatch();

    const closeExtract = function() {
        dispatch(hideExtract());
    };

    const extract = props.data;

    return (
        <div class="container-fluid">
            <div class="float-end">
                <button onClick={closeExtract}
                        class="btn btn-outline-secondary"
                        type="button">
                    <i class="bi bi-x-lg"></i>
                </button>
            </div>
            <div class="btn-group float-start" role="group">
                <button type="button" class="btn btn-outline-secondary">
                    <i class="bi bi-link-45deg"></i>
                </button>
                <button type="button" class="btn btn-outline-secondary">
                    <i class="bi bi-map"></i>
                </button>
                <button type="button" class="btn btn-outline-secondary">
                    <i class="bi bi-file-earmark-pdf"></i>
                </button>
            </div>
            <div class="clearfix"></div>
            <OerebRealEstate data={extract.RealEstate} />
        </div>
    )
}

export default OerebExtractData;
