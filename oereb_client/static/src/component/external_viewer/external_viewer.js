import {isArray, isObject, isString} from "lodash";
import React from "react";
import {useSelector} from "react-redux";

import {getLocalizedText} from "../../util/language";
import {format} from "../../util/string";

const OerebExternalViewer = function () {
  const config = useSelector((state) => state.config).config;
  const extract = useSelector((state) => state.extract);
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;

  const validConfig =
    isObject(config['external_viewer']) &&
    isString(config['external_viewer']['tooltip']) &&
    isString(config['external_viewer']['url']);

  if (!validConfig) {
    return null;
  }

  const title = getLocalizedText(
    config['external_viewer']['tooltip'],
    currentLanguage,
    defaultLanguage
  );

  const openExternalViewer = function () {
    if (extract.visible) {
      const urlParams = new URLSearchParams(window.location.search);
      const realEstate = extract.data['GetExtractByIdResponse']['extract']['RealEstate'];
      const values = {
        'map_x': urlParams.get('map_x'),
        'map_y': urlParams.get('map_y'),
        'map_zoom': urlParams.get('map_zoom'),
        'lang': urlParams.get('lang'),
        'canton': realEstate['Canton'],
        'egrid': realEstate['EGRID'],
        'fosnr': realEstate['FosNr'],
        'identdn': realEstate['IdentDN'],
        'municipality': realEstate['Municipality'],
        'number': realEstate['Number']
      };
      let url = config['external_viewer']['url'];
      if (url.indexOf('?') === -1) {
        url += '?';
      }
      const params = config['external_viewer']['params'];
      if (isArray(params)) {
        url += params.join('&');
      }
      window.open(encodeURI(format(url, values)), '_blank');
    }
  };

  return (
    <button type="button"
      className="btn btn-outline-secondary oereb-client-external-viewer"
      title={title}
      onClick={openExternalViewer}>
      <i className="bi bi-map"></i>
    </button>
  );
};

export default OerebExternalViewer;
