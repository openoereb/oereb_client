import {Collapse} from 'bootstrap';
import {isArray} from 'lodash';
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setActiveCategory, setActiveTopic, setViewServices} from '../../reducer/accordion';
import {groupRestrictionsByTopic} from '../../request/extract';
import OerebTopicsWithRestriction from '../topic_list/topics_with_restrictions';
import OerebTopicsWithoutRestriction from '../topic_list/topics_without_restriction';

/**
 * The container for each category. It uses a bootstrap accordion to show or hide the
 * category's data. Only one category can be shown at once.
 */
const OerebCategory = function (props) {
  const title = props.title;
  const topics = props.data;
  const restriction = props.restriction;
  const collapseEl = useRef(null);
  const collapseButton = useRef(null);
  const [active, setActive] = useState(false);
  const activeCategory = useSelector((state) => state.accordion).category;
  const extract = useSelector((state) => state.extract).data.GetExtractByIdResponse.extract;
  const dispatch = useDispatch();

  useEffect(() => {
    const collapse = new Collapse(collapseEl.current, {
      toggle: false
    });
    if (activeCategory === collapseEl.current) {
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

  const toggle = function () {
    if (activeCategory === collapseEl.current) {
      setActive(!active);
    }
    else {
      setActive(true);
    }
    dispatch(setActiveCategory(collapseEl.current));
    dispatch(setActiveTopic(null));
    dispatch(setViewServices([]));
  }

  const topicList = (() => {
    if (restriction && isArray(extract.RealEstate.RestrictionOnLandownership)) {
      const restrictions = groupRestrictionsByTopic(extract.RealEstate.RestrictionOnLandownership);
      return (
        <OerebTopicsWithRestriction data={topics} restrictions={restrictions} />
      );
    }
    return (
      <OerebTopicsWithoutRestriction data={topics} />
    );
  })();

  return (
    <div className="accordion-item mt-3 oereb-client-category">
      <h2 className="accordion-header">
        <button className="accordion-button collapsed ps-1"
          type="button"
          onClick={toggle}
          ref={collapseButton}>
          <div className="container-fluid">
            <strong>{title}</strong>
            <span className="badge rounded-pill bg-secondary float-end">{topics.length}</span>
          </div>
        </button>
      </h2>
      <div className="accordion-collapse collapse" ref={collapseEl}>
        {topicList}
      </div>
    </div>
  );
};

OerebCategory.propTypes = {

  /** The category title. */
  title: PropTypes.string.isRequired,

  /** The topics contained in this category. */
  data: PropTypes.array.isRequired,

  /** Use `true` to show the restrictions data. */
  restriction: PropTypes.bool.isRequired
};

export default OerebCategory;
