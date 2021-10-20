import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import {useSelector} from 'react-redux';

import {sanitizeTopicCode} from '../../request/extract';
import {getLocalizedText} from '../../util/language';
import OerebTopic from '../topic/topic';

const OerebTopicsWithRestriction = function (props) {
  const topics = props.data;
  const restrictions = props.restrictions;
  const accordionEl = useRef(null);
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;

  const topicList = topics.map((topic, key) => {
    const code = sanitizeTopicCode(topic.Code);
    const title = getLocalizedText(topic.Text, currentLanguage, defaultLanguage);
    let inForce = null;
    let changeWithPreEffect = null;
    let changeWithoutPreEffect = null;
    if (restrictions[code].inForce.length > 0) {
      inForce = <OerebTopic restrictions={restrictions[code].inForce} />;
    }
    if (restrictions[code].changeWithPreEffect.length > 0) {
      changeWithPreEffect = <OerebTopic restrictions={restrictions[code].changeWithPreEffect} />;
    }
    if (restrictions[code].changeWithoutPreEffect.length > 0) {
      changeWithoutPreEffect = <OerebTopic restrictions={restrictions[code].changeWithoutPreEffect} />;
    }
    return (
      <div className="accordion-item" key={key}>
        <div className="accordion-item p-2 ps-3">
          {title}
        </div>
        {inForce}
        {changeWithPreEffect}
        {changeWithoutPreEffect}
      </div>
    );
  });

  return (
    <div className="accordion-body p-0 oereb-client-topic-list-with-restrictions">
      <div className="accordion accordion-flush" ref={accordionEl}>
        {topicList}
      </div>
    </div>
  );
};

OerebTopicsWithRestriction.propTypes = {
  data: PropTypes.array.isRequired,
  restrictions: PropTypes.object.isRequired
};

export default OerebTopicsWithRestriction;
