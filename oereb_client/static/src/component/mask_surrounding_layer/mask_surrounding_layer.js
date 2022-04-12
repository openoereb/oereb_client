import PropTypes from 'prop-types';

const OerebMaskSurroundingLayer = function (props) {
  const visible = true;
  const maskSurroundingLayer = props.maskSurroundingLayer;

  maskSurroundingLayer.setVisible(visible);

  return null;
};

OerebMaskSurroundingLayer.propTypes = {
  maskSurroundingLayer: PropTypes.object.isRequired
};

export default OerebMaskSurroundingLayer;
