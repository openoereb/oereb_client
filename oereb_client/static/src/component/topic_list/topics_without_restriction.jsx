import PropTypes from 'prop-types';
import React from 'react';
import {useSelector} from 'react-redux';

import {getLocalizedText} from '../../util/language';

/**
 * This component shows the list of topics which do not contain restrictions for the currently loaded
 * extract.
 */
const OerebTopicsWithoutRestriction = function (props) {
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;
  const topics = props.data;

  const topicList = topics.map((topic, key) => {
    const title = getLocalizedText(topic.Text, currentLanguage, defaultLanguage);
    return <li key={key} className="list-group-item">{title}</li>;
  });

  return (
    <div className="accordion-body p-0 oereb-client-topic-list-without-restrictions">
      <ul className="list-group list-group-flush">
        {topicList}
      </ul>
    </div>
  );
};

OerebTopicsWithoutRestriction.propTypes = {

  /** The list of topics. */
  data: PropTypes.array.isRequired

};

export default OerebTopicsWithoutRestriction;
