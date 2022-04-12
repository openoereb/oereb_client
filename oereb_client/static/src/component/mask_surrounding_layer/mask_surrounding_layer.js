import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const OerebMaskSurroundingLayer = function (props) {
  const config = useSelector((state) => state.config).config;
  const visible = config.mask_surrounding.visible;
  const maskSurroundingLayer = props.maskSurroundingLayer;

  maskSurroundingLayer.setVisible(visible);

  return null;
};

OerebMaskSurroundingLayer.propTypes = {
  maskSurroundingLayer: PropTypes.object.isRequired
};

export default OerebMaskSurroundingLayer;
