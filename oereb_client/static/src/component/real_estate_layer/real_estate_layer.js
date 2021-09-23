import {Feature} from 'ol';
import MultiPolygon from 'ol/geom/MultiPolygon';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const OerebRealEstateLayer = function (props) {
  const extract = useSelector((state) => state.extract).data;
  const zoom = useSelector((state) => state.extract).zoom;
  const realEstateLayer = props.realEstateLayer;
  const map = props.map;

  realEstateLayer.getSource().clear();

  if (Reflect.apply(Object.prototype.hasOwnProperty, extract, ['GetExtractByIdResponse'])) {
    const limit = extract['GetExtractByIdResponse']['extract']['RealEstate']['Limit'];
    const geometry = new MultiPolygon(limit['coordinates']);
    realEstateLayer.getSource().addFeature(new Feature(geometry));
    if (zoom) {
      let padding = [10, 10, 10, 500];
      if (document.body.offsetWidth < 1200) {
        padding = [190, 10, 10, 10];
      }
      map.getView().fit(geometry, {
        padding: padding
      });
    }
  }

  return null;
};

OerebRealEstateLayer.propTypes = {
  map: PropTypes.object.isRequired,
  realEstateLayer: PropTypes.object.isRequired
};

export default OerebRealEstateLayer;