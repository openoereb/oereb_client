import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const OerebMaskSurroundingLayer = function (props) {
  const visible = useSelector((state) => state.maskSurrounding).visible;
  const maskSurroundingLayer = props.maskSurroundingLayer;

  maskSurroundingLayer.setVisible(visible);

  return null;
};

OerebMaskSurroundingLayer.propTypes = {
  maskSurroundingLayer: PropTypes.object.isRequired
};

export default OerebMaskSurroundingLayer;
