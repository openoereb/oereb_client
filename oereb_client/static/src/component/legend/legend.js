import './legend.scss';

import React from 'react';

function OerebLegend(props) {
    return (
        <table class="table table-sm oereb-client-legend">
            <thead>
                <tr>
                    <th>Typ</th>
                    <th></th>
                    <th class="text-end">Anteil</th>
                    <th class="text-end">Anteil in %</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    );
}

export default OerebLegend;