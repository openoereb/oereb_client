import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import {useSelector} from 'react-redux';

import {sanitizeTopicCode} from '../../request/extract';
import {getLocalizedText} from '../../util/language';
import OerebTopic from '../topic/topic';

/**
 * This component shows the list of topics which contain restrictions for the currently loaded extract.
 */
const OerebTopicsWithRestriction = function (props) {
  const topics = props.data;
  const restrictions = props.restrictions;
  const accordionEl = useRef(null);
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;

  const topicList = topics.map((topic, key1) => {
    const mainCode = sanitizeTopicCode(topic);
    const subCodes = Object.keys(restrictions)
      .filter((key) => key === mainCode || key.startsWith(mainCode + '_'));
    const list = subCodes.map((code, key2) => {
      const themeRestrictions = restrictions[code];
      let title = getLocalizedText(themeRestrictions.themeText, currentLanguage, defaultLanguage);
      if (themeRestrictions.subThemeText !== null) {
        title += ': ' + getLocalizedText(themeRestrictions.subThemeText, currentLanguage, defaultLanguage);
      }
      let inForce = null;
      let changeWithPreEffect = null;
      let changeWithoutPreEffect = null;
      if (themeRestrictions.inForce.length > 0) {
        inForce = <OerebTopic restrictions={themeRestrictions.inForce} />;
      }
      if (themeRestrictions.changeWithPreEffect.length > 0) {
        changeWithPreEffect = <OerebTopic restrictions={themeRestrictions.changeWithPreEffect} />;
      }
      if (themeRestrictions.changeWithoutPreEffect.length > 0) {
        changeWithoutPreEffect = <OerebTopic restrictions={themeRestrictions.changeWithoutPreEffect} />;
      }
      return (
        <div className="accordion-item" key={`${key1}_${key2}`}>
          <div className="accordion-item p-2 ps-3">
            <strong>{title}</strong>
          </div>
          {inForce}
          {changeWithPreEffect}
          {changeWithoutPreEffect}
        </div>
      );
    });

    return list;
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

  /** The list of topics. */
  data: PropTypes.array.isRequired,

  /** The restrictions grouped by topic. */
  restrictions: PropTypes.object.isRequired

};

export default OerebTopicsWithRestriction;
