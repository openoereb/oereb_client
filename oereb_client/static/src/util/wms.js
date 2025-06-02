import {getLocalizedText} from "./language";

export const getViewServiceDefinition = function (mapObject, currentLanguage, defaultLanguage) {
  const parts = getLocalizedText(
    mapObject["ReferenceWMS"],
    currentLanguage,
    defaultLanguage
  ).split("?");
  const url = parts[0];
  const definition = {
    "url": url,
    "params": {},
    "opacity": mapObject["layerOpacity"],
    "zIndex": 21000 + mapObject["layerIndex"]
  };
  const params = parts[1].split("&");
  for (let i = 0; i < params.length; i++) {
    const wmsParams = [
      "SERVICE",
      "VERSION",
      "REQUEST",
      "FORMAT",
      "CRS",
      "SRS",
      "LAYERS",
      "STYLES",
      "BBOX",
      "WIDTH",
      "HEIGHT",
      "TRANSPARENT"
    ];
    const param = params[i].split("=");
    const key = param[0];
    const value = param[1];
    if (wmsParams.indexOf(key.toUpperCase()) > -1) {
      definition["params"][key.toUpperCase()] = decodeURIComponent(value);
    }
    else {
      definition["params"][key] = value;
    }
  }
  return definition;
};
