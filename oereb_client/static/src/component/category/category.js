import {Collapse} from 'bootstrap';
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {groupRestrictionsByTopic} from '../../api/extract';
import {setActiveCategory, setActiveTopic} from '../../reducer/accordion';
import OerebTopicsWithRestriction from '../topic_list/topics_with_restrictions';
import OerebTopicsWithoutRestriction from '../topic_list/topics_without_restriction';

const OerebCategory = function(props) {
    const title = props.title;
    const topics = props.data;
    const restriction = props.restriction;
    const collapseEl = useRef(null);
    const [active, setActive] = useState(false);
    const activeCategory = useSelector((state) => state.accordion).category;
    const extract = useSelector((state) => state.extract).data.GetExtractByIdResponse.extract;
    const restrictions = groupRestrictionsByTopic(extract.RealEstate.RestrictionOnLandownership);
    const dispatch = useDispatch();

    useEffect(() => {
        const collapse = new Collapse(collapseEl.current, {
            toggle: false
        });
        if (activeCategory === collapseEl.current) {
            if (active) {
                collapse.show();
            }
            else {
                collapse.hide();
            }
        }
        else {
            collapse.hide();
        }
    });

    const buttonClass = (() => {
        if (active && activeCategory === collapseEl) {
            return 'accordion-button ps-1';
        }

            return 'accordion-button collapsed ps-1';

    })();

    const toggle = function() {
        if (activeCategory === collapseEl.current) {
            setActive(!active);
        }
        else {
            setActive(true);
        }
        dispatch(setActiveCategory(collapseEl.current));
        dispatch(setActiveTopic(null));
    }

    const topicList = (() => {
        if (restriction) {
            return (
                <OerebTopicsWithRestriction data={topics} restrictions={restrictions} />
            );
        }

            return (
                <OerebTopicsWithoutRestriction data={topics} />
            );

    })();

    return (
        <div className="accordion-item mt-3">
            <h2 className="accordion-header">
                <button className={buttonClass} type="button" onClick={toggle}>
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
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    restriction: PropTypes.bool.isRequired
};

export default OerebCategory;
