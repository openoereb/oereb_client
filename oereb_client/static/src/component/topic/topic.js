import {Collapse} from 'bootstrap';
import LayerGroup from 'ol/layer/Group';
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {setActiveTopic, setViewServices} from '../../reducer/accordion';
import {addIfNotContains} from '../../util/array';
import OerebCompleteLegend from '../complete_legend/complete_legend';
import OerebDocuments from '../documents/documents';
import OerebLegend from '../legend/legend';
import OerebResponsibleOffice from '../responsible_office/responsible_office';

const OerebTopic = function (props) {
  const {t} = useTranslation();
  const topic = props.topic;
  const restrictions = props.restrictions;
  const collapseEl = useRef(null);
  const collapseButton = useRef(null);
  const [active, setActive] = useState(false);
  const [opacity, setOpacity] = useState(100);
  const activeTopic = useSelector((state) => state.accordion).topic;
  const topicLayers = useSelector((state) => state.map).topicLayers;
  const dispatch = useDispatch();

  const viewServices = [];
  restrictions.forEach((restriction) => {
    const map = restriction['Map'];
    addIfNotContains(map, viewServices);
  });

  useEffect(() => {
    const collapse = new Collapse(collapseEl.current, {
      toggle: false
    });
    if (activeTopic === collapseEl.current) {
      if (active) {
        collapse.show();
        collapseButton.current.classList.remove('collapsed');
      }
      else {
        collapse.hide();
        collapseButton.current.classList.add('collapsed');
      }
    }
    else {
      collapse.hide();
      collapseButton.current.classList.add('collapsed');
    }
  });

  useEffect(() => {
    if (topicLayers instanceof LayerGroup) {
      topicLayers.setOpacity(opacity / 100);
    }
  });

  const toggle = function () {
    if (activeTopic === collapseEl.current) {
      setActive(!active);
      dispatch(setActiveTopic(null));
      dispatch(setViewServices([]));
    }
    else {
      setActive(true);
      dispatch(setActiveTopic(collapseEl.current));
      dispatch(setViewServices(viewServices));
    }
  }

  const handleOpacity = function (evt) {
    setOpacity(evt.target.value);
  };

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button collapsed"
          type="button"
          onClick={toggle}
          ref={collapseButton}>
          {topic.Text.Text}
        </button>
      </h2>
      <div className="accordion-collapse collapse" ref={collapseEl}>
        <div className="accordion-body">
          <div className="row align-items-center mb-2">
            <div className="col-3">
              <small>{t('extract.topic.opacity')}:</small>
            </div>
            <div className="col-2 pe-2 text-end">
              <small>{opacity}%</small>
            </div>
            <div className="col-7">
              <input type="range"
                className="form-range align-middle"
                min="0"
                max="100"
                value={opacity}
                onChange={handleOpacity} />
            </div>
          </div>
          <OerebLegend restrictions={restrictions} />
          <OerebCompleteLegend restrictions={restrictions} />
          <OerebDocuments restrictions={restrictions} />
          <OerebResponsibleOffice restrictions={restrictions} />
        </div>
      </div>
    </div>
  );
};

OerebTopic.propTypes = {
  topic: PropTypes.object.isRequired,
  restrictions: PropTypes.array.isRequired
};

export default OerebTopic;
