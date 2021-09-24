import './complete_legend.scss';

import {Collapse} from 'bootstrap';
import {isString} from 'lodash';
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';

import {addIfNotContains} from '../../util/array';

const OerebCompleteLegend = function(props) {
  const {t} = useTranslation();
  const collapseEl = useRef(null);
  const [visible, setVisible] = useState(false);
  const restrictions = props.restrictions;
  const graphicUrls = [];

  restrictions.forEach((restriction) => {
    if (Reflect.apply(
      Object.prototype.hasOwnProperty,
      restriction['Map'],
      ['LegendAtWeb']
    )) {
      const graphic = restriction['Map']['LegendAtWeb'];
      if (isString(graphic)) {
        addIfNotContains(graphic, graphicUrls);
      }
    }
  });

  const graphics = graphicUrls.map((url, key) =>
    <img key={key} src={url} />
  );

  const toggle = function () {
    setVisible(!visible);
  };

  useEffect(() => {
    const collapse = new Collapse(collapseEl.current, {
      toggle: false
    });
    if (visible) {
      collapse.show();
    }
    else {
      collapse.hide();
    }
  });

  const buttonText = function () {
    if (visible) {
      return (
        <span>
          <i className="bi bi-chevron-up"></i> {t('extract.topic.complete_legend.hide')}
        </span>
      );
    }
    return (
      <span>
        <i className="bi bi-chevron-down"></i> {t('extract.topic.complete_legend.show')}
      </span>
    );
  };

  return (
    <div className="oereb-complete-legend mb-2">
      <span onClick={toggle}>{buttonText()}</span>
      <div className="collapse" ref={collapseEl}>
        {graphics}
      </div>
    </div>
  );
};

OerebCompleteLegend.propTypes = {
  restrictions: PropTypes.array.isRequired
};

export default OerebCompleteLegend;