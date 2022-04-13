import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';

const OerebMaskSurroundingLayer = function (props) {
  const config = useSelector((state) => state.config).config;
  const maskSurroundingLayer = props.maskSurroundingLayer;

  maskSurroundingLayer.setVisible(config.mask_surrounding.url == 'no_url' ? false : true);

  return null;
};

OerebMaskSurroundingLayer.propTypes = {
  maskSurroundingLayer: PropTypes.object.isRequired
};

export default OerebMaskSurroundingLayer;
