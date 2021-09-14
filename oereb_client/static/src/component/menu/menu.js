import './menu.scss';

import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {sanitzeSearchResult, searchTerm} from '../../api/search';
import {showAvailability} from '../../reducer/availability';
import {enableSymbolZoom} from '../../reducer/symbol_zoom';

const OerebMenu = function() {
    const config = useSelector((state) => state.config).config;
    const showAvailabilityLayer = useSelector((state) => state.availability).visible;
    const symbolZoomEnabled = useSelector((state) => state.symbolZoom).enabled;
    const dispatch = useDispatch();
    const oerebLogoUrl = config.logo_oereb;
    const appLogoUrl = config.logo_canton;

    const [search, setSearch] = useState('');
    const [pendingRequests, setPendingRequests] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const reLV03 = new RegExp('^(\\d{6}(\\.\\d+)?)(\\s|,\\s?|;\\s?)(\\d{6}(\\.\\d+)?)');
    const reLV95 = new RegExp('^(\\d{7}(\\.\\d+)?)(\\s|,\\s?|;\\s?)(\\d{7}(\\.\\d+)?)');
    const reGNSS = new RegExp('^(\\d{1}(\\.\\d+)?)(\\s|,\\s?|;\\s?)(\\d{2}(\\.\\d+)?)');

    const searchConfig = [
        {
            url: config.search.api.url,
            limit: config.search.api.limit,
            prefix: 'egr',
            title: 'EGRID',
            wfs: false,
            filters: [
                {
                    regex: / \((.*?)\)/g,
                    value: ''
                }
            ]
        },
        {
            url: config.search.api.url,
            limit: config.search.api.limit,
            prefix: 'adr',
            title: 'Adressen',
            wfs: false,
            filters: [
                {
                    regex: / \((.*?)\)/g,
                    value: ''
                }
            ]
        },
        {
            url: config.search.api.url,
            limit: config.search.api.limit,
            prefix: 'gs',
            title: 'Grundstücke',
            wfs: true,
            filters: [
                {
                    regex: / \((.*?)\)/g,
                    value: ''
                }
            ]
        }
    ];

    const handleSearch = function(evt) {
        const searchValue = evt.target.value;
        setSearch(searchValue);
        pendingRequests.forEach((request) => {
            request.cancel();
        });
        if (searchValue.length > 0) {
            const promises = [];
            const requests = [];
            setLoading(true);
            searchConfig.forEach((cfg) => {
                const request = searchTerm(cfg, searchValue);
                promises.push(request.promise);
                requests.push(request);
            });
            const searchPromise = Promise.all(promises);
            setPendingRequests(requests);
            searchPromise.then((results) => {
                let allResults = [];
                if (reLV03.test(searchValue)) {
                    allResults = allResults.concat([{
                        config: {
                            title: 'LV03-Koordinaten'
                        },
                        data: [searchValue]
                    }]);
                }
                if (reLV95.test(searchValue)) {
                    allResults = allResults.concat([{
                        config: {
                            title: 'LV95-Koordinaten'
                        },
                        data: [searchValue]
                    }]);
                }
                if (reGNSS.test(searchValue)) {
                    allResults = allResults.concat([{
                        config: {
                            title: 'Geografische Koordinaten (WGS84)'
                        },
                        data: [searchValue]
                    }]);
                }
                allResults = allResults.concat(results);
                setSearchResults(allResults);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });

        }
    };

    const resetSearch = function() {
        setSearch('');
        setSearchResults([]);
    };

    const searchResultList = searchResults.map((resultSet) => {
        if (resultSet.data.length > 0) {
            const results = resultSet.data.map((result, key) => {
                const sanitizedResult = sanitzeSearchResult(
                    result,
                    resultSet.config
                );
                return (
                    <button key={key} className="list-group-item search-result text-start">
                        {sanitizedResult}
                    </button>
                );
            });
            const title =
                <div className="list-group result-list">
                    <div className="list-group-item">
                        <strong>{resultSet.config.title}</strong>
                        <span className="badge bg-secondary float-end">{resultSet.data.length}</span>
                    </div>
                    {results}
                </div>;
            return title;
        }
        return null;
    });

    const getSearchResetButton = function() {
        if (search.length === 0) {
            return (
                <button className="btn btn-outline-secondary"
                        type="button"
                        disabled>
                    <i className="bi bi-trash"></i>
                </button>
            );
        }
        else if (loading) {
            return (
                <button className="btn btn-outline-secondary"
                        type="button"
                        disabled>
                    <span className="spinner-grow spinner-grow-sm" role="status"></span>
                </button>
            );
        }

            return (
                <button onClick={resetSearch}
                        className="btn btn-outline-secondary"
                        type="button">
                    <i className="bi bi-trash"></i>
                </button>
            );

    };

    const searchResetButton = getSearchResetButton();

    const showAvailabilityText = (() => {
        if (showAvailabilityLayer) {
            return (
                <span><i className="bi bi-check-square"></i> verfügbare Gemeinden anzeigen</span>
            );
        }
        return (
            <span><i className="bi bi-square"></i> verfügbare Gemeinden anzeigen</span>
        );
    })();

    const toggleAvailabilityLayer = function() {
        dispatch(showAvailability(!showAvailabilityLayer));
    }

    const symbolZoomText = (() => {
        if (symbolZoomEnabled) {
            return (
                <span><i className="bi bi-check-square"></i> Legendensymbole vergrössern</span>
            );
        }
        return (
            <span><i className="bi bi-square"></i> Legendensymbole vergrössern</span>
        );
    })();

    const toggleSymbolZoom = function() {
        dispatch(enableSymbolZoom(!symbolZoomEnabled));
    }

    return (
        <div className="oereb-client-menu">
            <img className="logo-oereb" src={oerebLogoUrl} />
            <img className="logo-app" src={appLogoUrl} />
            <div className="clearfix"></div>
            <div className="container-fluid">
                <div className="input-group">
                    <button className="btn btn-outline-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                        <i className="bi bi-gear-fill"></i>
                    </button>
                    <ul className="dropdown-menu">
                        <li>
                            <button className="dropdown-item" onClick={toggleAvailabilityLayer}>
                                {showAvailabilityText}
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={toggleSymbolZoom}>
                                {symbolZoomText}
                            </button>
                        </li>
                    </ul>
                    <button className="btn btn-outline-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false">
                        <i className="bi bi-clock-history"></i>
                    </button>
                    <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                    </ul>
                    <input type="text"
                            className="form-control"
                            value={search}
                            onChange={handleSearch}
                            placeholder="Suche" />
                    {searchResetButton}
                </div>
            </div>
            <div className="container-fluid">
                {searchResultList}
            </div>
        </div>
    );
};

export default OerebMenu;
