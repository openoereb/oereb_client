import {Feature} from 'ol';
import MultiPolygon from 'ol/geom/MultiPolygon';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const OerebRealEstateLayer = function(props) {
    const extract = useSelector((state) => state.extract).data;
    const realEstateLayer = props.realEstateLayer;

    realEstateLayer.getSource().clear();

    if (Reflect.apply(Object.prototype.hasOwnProperty, extract, ['GetExtractByIdResponse'])) {
        const geometry = extract['GetExtractByIdResponse']['extract']['RealEstate']['Limit'];
        realEstateLayer.getSource().addFeature(new Feature(new MultiPolygon(
            geometry['coordinates']
        )));
    }

    return null;
};

OerebRealEstateLayer.propTypes = {
    realEstateLayer: PropTypes.object.isRequired
};

export default OerebRealEstateLayer;