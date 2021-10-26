import {isArray} from 'lodash';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

import {getViewServiceDefinition} from '../../util/wms';

const OerebTopicLayer = function (props) {
  const topicLayers = props.topicLayers;
  const viewServices = useSelector((state) => state.accordion).viewServices;
  const extractVisible = useSelector((state) => state.extract).visible;
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;

  topicLayers.setVisible(false);
  topicLayers.getLayers().clear();

  if (extractVisible && isArray(viewServices) && viewServices.length > 0) {
    const layers = viewServices.map((viewService) => {
      const definition = getViewServiceDefinition(viewService, currentLanguage, defaultLanguage);
      return new TileLayer({
        preload: Infinity,
        visible: true,
        opacity: definition['layerOpacity'],
        zIndex: definition['layerIndex'],
        source: new TileWMS({
          url: definition['url'],
          params: definition['params'],
          projection: 'EPSG:2056'
        })
      });
    });
    topicLayers.getLayers().extend(layers);
    topicLayers.setVisible(true);
  }

  return null;
};

OerebTopicLayer.propTypes = {
  topicLayers: PropTypes.object.isRequired
}

export default OerebTopicLayer;
