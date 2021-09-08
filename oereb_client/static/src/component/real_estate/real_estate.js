import PropTypes from 'prop-types';
import React from 'react';

const OerebRealEstate = function(props) {
    const realEstate = props.data;
    const number = realEstate.Number;
    const municipality = realEstate.Municipality;
    const egrid = realEstate.EGRID;
    const area = realEstate.LandRegistryArea;

    return (
        <div className="container-fluid mt-3">
            <h5 >Grundtück {number} in {municipality}</h5>
            <div className="row">
                <div className="col-sm-3"><strong>E-GRID:</strong></div>
                <div className="col-sm-9">{egrid}</div>
                <div className="col-sm-3"><strong>Fläche:</strong></div>
                <div className="col-sm-9">{area} m²</div>
            </div>
        </div>
    );
};

OerebRealEstate.propTypes = {
    data: PropTypes.object.isRequired
};

export default OerebRealEstate;
