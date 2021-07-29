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
    const [searchResults, setSearchResults] = useState([]);

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
        pendingRequests.forEach((request) => {
            request.cancel();
        });
        if (searchValue.length > 0) {
            const promises = [];
            const requests = [];
            searchConfig.forEach((cfg) => {
                const request = searchTerm(cfg, searchValue);
                promises.push(request.promise);
                requests.push(request);
            });
            const searchPromise = Promise.all(promises);
            setPendingRequests(requests);
            searchPromise.then((results) => {
                setSearchResults(results);
            }).catch((error) => {});
            
        }
    }

    function resetSearch(evt) {
        setSearch('');
        setSearchResults([]);
    }

    const searchResultList = searchResults.map((resultSet) => {
        if (resultSet.data.features.length > 0) {
            const results = resultSet.data.features.map((result) => {
                return (
                    <button class="list-group-item search-result text-start">
                        {result.properties.label}
                    </button>
                );
            });
            const title = (
                <div class="list-group result-list">
                    <div class="list-group-item">
                        <strong>{resultSet.title}</strong>
                        <span class="badge bg-secondary float-end">{resultSet.data.features.length}</span>
                    </div>
                    {results}
                </div>
            );
            return title;
        }
        return null;
    });

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
            <div class="container-fluid">
                {searchResultList}
            </div>
        </div>
    );
}

export default OerebMenu;
