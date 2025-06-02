import {getViewServiceDefinition} from "../../../oereb_client/static/src/util/wms";

describe("getViewServiceDefinition", () => {

  const mapObject = {
    ReferenceWMS: [
      {
        Language: "en",
        Text: "http://exmaple.com/wms?SERVICE=WMS&Version=1.3.0&REQUEST=GetMap&layers=test1,test2" +
              "&FORMAT=image/png&TRANSPARENT=true&foo=bar"
      }
    ],
    layerOpacity: 0.5,
    layerIndex: 1
  };

  it("should return valid parameters for an OL WMS source", () => {
    expect(getViewServiceDefinition(mapObject, "en", "en")).toEqual({
      url: "http://exmaple.com/wms",
      opacity: 0.5,
      zIndex: 21001,
      params: {
        SERVICE: "WMS",
        VERSION: "1.3.0",
        REQUEST: "GetMap",
        LAYERS: "test1,test2",
        FORMAT: "image/png",
        TRANSPARENT: "true",
        foo: "bar"
      }
    });
  });
});