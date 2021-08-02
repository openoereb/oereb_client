import React from 'react';

function OerebRealEstate(props) {
    const realEstate = props.data;
    const number = realEstate.Number;
    const municipality = realEstate.Municipality;
    const egrid = realEstate.EGRID;
    const area = realEstate.LandRegistryArea;

    return (
        <div class="container-fluid mt-3">
            <h5 >Grundtück {number} in {municipality}</h5>
            <div class="row">
                <div class="col-sm-3"><strong>E-GRID:</strong></div>
                <div class="col-sm-9">{egrid}</div>
                <div class="col-sm-3"><strong>Fläche:</strong></div>
                <div class="col-sm-9">{area} m²</div>
            </div>
        </div>
    );
}

export default OerebRealEstate;
