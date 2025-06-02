import {isArray, isFunction, isNumber} from "lodash";
import ImageLayer from "ol/layer/Image";
import TileLayer from "ol/layer/Tile";
import ImageWMS from "ol/source/ImageWMS";
import TileWMS from "ol/source/TileWMS";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";

import {getViewServiceDefinition} from "../../util/wms";

const OerebTopicLayer = function (props) {
  const topicLayers = props.topicLayers;
  const tiled = props.tiled;
  const viewServices = useSelector((state) => state.accordion).viewServices;
  const callback = useSelector((state) => state.accordion).callback;
  const extractVisible = useSelector((state) => state.extract).visible;
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;

  topicLayers.setVisible(false);
  topicLayers.getLayers().clear();

  if (extractVisible && isArray(viewServices) && viewServices.length > 0) {
    const layers = viewServices.map((viewService) => {
      const definition = getViewServiceDefinition(viewService, currentLanguage, defaultLanguage);
      let LayerClass = ImageLayer;
      let SourceClass = ImageWMS;
      if (tiled) {
        LayerClass = TileLayer;
        SourceClass = TileWMS;
      }
      const opacity = isNumber(definition["opacity"]) ? definition["opacity"] : 1.0;
      const zIndex = isNumber(definition["zIndex"]) ? definition["zIndex"] : 1.0;
      const source = new SourceClass({
        url: definition["url"],
        params: definition["params"],
        projection: "EPSG:2056"
      });
      if (isFunction(callback)) {
        source.on("imageloadstart", () => {
          callback(true);
        });
        source.on("imageloadend", () => {
          callback(false);
        });
        source.on("imageloaderror", () => {
          callback(false);
        });
      }
      return new LayerClass({
        preload: Infinity,
        visible: true,
        opacity,
        zIndex,
        source
      });
    });
    topicLayers.getLayers().extend(layers);
    topicLayers.setVisible(true);
  }

  return null;
};

OerebTopicLayer.propTypes = {
  topicLayers: PropTypes.object.isRequired,
  tiled: PropTypes.bool.isRequired
};

export default OerebTopicLayer;
