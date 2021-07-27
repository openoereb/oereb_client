import './menu.scss';

import { Dropdown } from 'bootstrap';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { searchTerm } from '../../api/search';

function OerebMenu(props) {
    const config = useSelector((state) => state.config).config;
    const oerebLogoUrl = config.logo_oereb;
    const appLogoUrl = config.logo_canton;

    const [search, setSearch] = useState('');
    const [pendingRequests, setPendingRequests] = useState([]);

    console.log(config);

    const searchConfig = [
        {
            url: config.search.api.url,
            limit: config.search.api.limit,
            prefix: 'egr',
            title: 'EGRID',
            wfs: false
        },
        {
            url: config.search.api.url,
            limit: config.search.api.limit,
            prefix: 'adr',
            title: 'Adressen',
            wfs: false,
        },
        {
            url: config.search.api.url,
            limit: config.search.api.limit,
            prefix: 'gs',
            title: 'Grundstücke',
            wfs: true
        }
    ];

    function handleSearch(evt) {
        const searchValue = evt.target.value;
        setSearch(searchValue);
        if (searchValue.length > 2) {
            pendingRequests.forEach((request) => {
                request.cancel();
            });
            const promises = [];
            const requests = [];
            searchConfig.forEach((cfg) => {
                const request = searchTerm(
                    cfg.url,
                    searchValue,
                    cfg.limit,
                    cfg.prefix
                );
                promises.push(request.promise);
                requests.push(request);
            });
            const searchPromise = Promise.all(promises);
            setPendingRequests(requests);
            searchPromise.then((results) => {
                console.log(results);
            }).catch((error) => {
                console.log(error);
            });
            
        }
    }

    function resetSearch(evt) {
        setSearch('');
    }

    return (
        <div class="oereb-client-menu">
            <img class="logo-oereb" src={oerebLogoUrl} />
            <img class="logo-app" src={appLogoUrl} />
            <div class="clearfix"></div>
            <div class="container-fluid">
                <div class="input-group">
                    <button class="btn btn-outline-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                        <i class="bi bi-gear-fill"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                    </ul>
                    <button class="btn btn-outline-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                        <i class="bi bi-clock-history"></i>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                    </ul>
                    <input type="text"
                            class="form-control"
                            value={search}
                            onChange={handleSearch}
                            placeholder="Suche" />
                    <button onClick={resetSearch}
                            class="btn btn-outline-secondary"
                            type="button">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OerebMenu;
