import './menu.scss';

import React from 'react';
import { useSelector } from 'react-redux';

function OerebMenu(props) {
    const config = useSelector((state) => state.config).config;
    const oerebLogoUrl = config.logo_oereb;
    const appLogoUrl = config.logo_canton;

    return (
        <div class="oereb-client-menu">
            <img class="logo-oereb" src={oerebLogoUrl} />
            <img class="logo-app" src={appLogoUrl} />
            <div class="clearfix"></div>
        </div>
    );
}

export default OerebMenu;
