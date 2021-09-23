import PropTypes from 'prop-types';
import React, {useRef} from 'react';

import {sanitizeTopicCode} from '../../api/extract';
import OerebTopic from '../topic/topic';

const OerebTopicsWithRestriction = function (props) {
  const topics = props.data;
  const restrictions = props.restrictions;
  const accordionEl = useRef(null);

  const topicList = topics.map((topic, key) => {
    const code = sanitizeTopicCode(topic.Code);
    return (
      <OerebTopic key={key} topic={topic} restrictions={restrictions[code]} />
    );
  });

  return (
    <div className="accordion-body p-0">
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
