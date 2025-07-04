import "./menu.scss";

import {isArray, isString} from "lodash";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import {setViewServices} from "../../reducer/accordion";
import {showAvailability} from "../../reducer/availability";
import {loadExtract, showError, showExtract} from "../../reducer/extract";
import {updateHistory} from "../../reducer/history";
import {hide, loadAt, show} from "../../reducer/map_query";
import {enableSymbolZoom} from "../../reducer/symbol_zoom";
import {queryEgridByCoord} from "../../request/egrid";
import {queryExtractById} from "../../request/extract";
import {searchTerm} from "../../request/search";
import {getCoordinates, isGNSS, isLV95} from "../../util/coordinate";
import {getLocalizedUrl} from "../../util/language";
import OerebLanguage from "../language/language";
import OerebUserGuide from "../user_guide/user_guide";

const OerebMenu = function () {
  const {t} = useTranslation();
  const config = useSelector((state) => state.config).config;
  const showAvailabilityLayer = useSelector((state) => state.availability).visible;
  const symbolZoomEnabled = useSelector((state) => state.symbolZoom).enabled;
  const highlight = useSelector((state) => state.extract).highlight;
  const background = useSelector((state) => state.extract).background;
  const history = useSelector((state) => state.history).elements.slice().reverse();
  const dispatch = useDispatch();
  const searchUrl = config.search_url;
  const serviceUrl = config.service_url;

  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;
  const availableLanguages = language.available;

  const [search, setSearch] = useState("");
  const [pendingRequest, setPendingRequest] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const oerebLogoUrl = getLocalizedUrl(config.application.logo_oereb, currentLanguage, defaultLanguage);
  const cantonLogoUrl = getLocalizedUrl(config.application.logo_canton, currentLanguage, defaultLanguage);

  let languageSelector = null;
  if (isArray(availableLanguages) && availableLanguages.length > 1) {
    languageSelector = <OerebLanguage />;
  }

  const queryExtract = function (egrid, identdn, number) {
    dispatch(setViewServices([]));
    dispatch(loadExtract({
      egrid,
      identdn,
      number,
      zoom: true
    }));
    queryExtractById(serviceUrl, egrid, identdn, number, config.extract_json_timeout, currentLanguage)
      .then((extract) => {
        dispatch(showExtract(extract));
        dispatch(updateHistory(extract));
      })
      .catch(() => {
        dispatch(showError());
      });
  };

  const queryEgrid = function(coord) {
    dispatch(loadAt({
      posX: coord[0],
      posY: coord[1]
    }));
    queryEgridByCoord(serviceUrl, coord)
      .then((egrids) => {
        const results = egrids.GetEGRIDResponse;
        if (results.length > 1) {
          dispatch(show({
            results
          }));
        }
        else if (results.length === 1) {
          dispatch(hide());
          queryExtract(results[0].egrid);
        }
        else {
          dispatch(hide());
        }
      })
      .catch(() => {
        dispatch(hide());
      });
  };

  const resetSearch = function () {
    setSearch("");
    setSearchResults([]);
  };

  const querySearchResult = function(result) {
    resetSearch();
    if (isString(result.egrid)) {
      queryExtract(result.egrid, null, null);
    }
    else if (isString(result.identdn) && isString(result.number)) {
      queryExtract(null, result.identdn, result.number);
    }
    else if (isArray(result.coordinates)) {
      queryEgrid(result.coordinates);
    }
  };

  const handleSearch = function (evt) {
    const searchValue = evt.target.value;
    setSearch(searchValue);
    if (pendingRequest !== null) {
      pendingRequest.cancel();
    }
    if (searchValue.length > 0) {
      setLoading(true);
      const request = searchTerm(searchUrl, searchValue, currentLanguage);
      const searchPromise = request.promise;
      setPendingRequest(request);
      searchPromise.then((results) => {
        let allResults = [];
        if (isLV95(searchValue)) {
          allResults = allResults.concat([{
            title: t("menu.search.title.coordinates.lv95"),
            results: [{
              label: searchValue,
              coordinates: getCoordinates(searchValue)
            }]
          }]);
        }
        if (isGNSS(searchValue)) {
          allResults = allResults.concat([{
            title: t("menu.search.title.coordinates.wgs84"),
            results: [{
              label: searchValue,
              coordinates: getCoordinates(searchValue)
            }]
          }]);
        }
        allResults = allResults.concat(results);
        setSearchResults(allResults);
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });

    }
    else {
      resetSearch();
    }
  };

  const searchResultList = searchResults.map((resultSet, key1) => {
    if (resultSet.results.length > 0) {
      const results = resultSet.results.map((result, key2) =>
        <button key={key2}
          className="list-group-item list-group-item-action search-result text-start"
          onClick={querySearchResult.bind(this, result)}>
          {result.label}
        </button>
      );
      const title =
        <div key={key1} className="list-group result-list">
          <div className="list-group-item">
            <strong>{resultSet.title}</strong>
            <span className="badge bg-secondary float-end">{resultSet.results.length}</span>
          </div>
          {results}
        </div>;
      return title;
    }
    return null;
  });

  const getSearchResetButton = function () {
    if (search.length === 0) {
      return (
        <button className="btn btn-outline-secondary"
          type="button"
          title={t("menu.search.reset")}
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
        title={t("menu.search.reset")}
        type="button">
        <i className="bi bi-trash"></i>
      </button>
    );
  };

  const searchResetButton = getSearchResetButton();

  const showAvailabilityText = (() => {
    if (showAvailabilityLayer) {
      return (
        <span><i className="bi bi-check-square"></i> {t("menu.settings.availability")}</span>
      );
    }
    return (
      <span><i className="bi bi-square"></i> {t("menu.settings.availability")}</span>
    );
  })();

  const toggleAvailabilityLayer = function () {
    dispatch(showAvailability(!showAvailabilityLayer));
  };

  const symbolZoomText = (() => {
    if (symbolZoomEnabled) {
      return (
        <span><i className="bi bi-check-square"></i> {t("menu.settings.symbol_zoom")}</span>
      );
    }
    return (
      <span><i className="bi bi-square"></i> {t("menu.settings.symbol_zoom")}</span>
    );
  })();

  const toggleSymbolZoom = function () {
    dispatch(enableSymbolZoom(!symbolZoomEnabled));
  }

  const historyElements = history.map((element, key) =>
    <li key={key}>
      <button className="dropdown-item"
        onClick={queryExtract.bind(this, element["EGRID"], element["IdentDN"], element["Number"])}>
        {element["Municipality"]} {element["Number"]} ({element["EGRID"]})
      </button>
    </li>
  );

  let historyButtonClass = "btn btn-outline-secondary dropdown-toggle";
  if (history.length < 1) {
    historyButtonClass += " disabled";
  }

  return (
    <div className="oereb-client-menu d-flex flex-column pb-3">
      <div className="flex-grow-1 row justify-content-evenly">
        <div className="col">
          <img className="img-fluid p-2" src={oerebLogoUrl} />
        </div>
        <div className="col text-end">
          <img className="img-fluid p-2" src={cantonLogoUrl} />
        </div>
      </div>
      <div className="container-fluid">
        <div className="input-group">
          {languageSelector}
          <button className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            title={t("menu.settings.title")}>
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
          <button className={historyButtonClass}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            title={t("menu.history.title")}>
            <i className="bi bi-clock-history"></i>
          </button>
          <ul className="dropdown-menu">
            {historyElements}
          </ul>
          <input type="text"
            className="form-control"
            value={search}
            onChange={handleSearch}
            placeholder={t("menu.search.placeholder")} />
          {searchResetButton}
          <OerebUserGuide />
        </div>
      </div>
      <div className="container-fluid">
        {searchResultList}
      </div>
    </div>
  );
};

export default OerebMenu;
