import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const OerebAvailabilityLayer = function(props) {
    const visible = useSelector((state) => state.availability).visible;
    const availabilityLayer = props.availabilityLayer;

    availabilityLayer.setVisible(visible);

    return null;
};

OerebAvailabilityLayer.propTypes = {
    availabilityLayer: PropTypes.object.isRequired
};

export default OerebAvailabilityLayer;
