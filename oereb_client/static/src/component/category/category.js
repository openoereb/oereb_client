import { Collapse } from 'bootstrap';

import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { groupRestrictionsByTopic } from '../../api/extract';

import { setActiveCategory, setActiveTopic } from '../../reducer/accordion';
import OerebTopicsWithoutRestriction from '../topic_list/topics_without_restriction';
import OerebTopicsWithRestriction from '../topic_list/topics_with_restrictions';

function OerebCategory(props) {
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
            active ? collapse.show() : collapse.hide();
        }
        else {
            collapse.hide();
        }
    });

    const buttonClass = (() => {
        if (active && activeCategory === collapseEl) {
            return 'accordion-button ps-1';
        }
        else { 
            return 'accordion-button collapsed ps-1';
        }
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
        else {
            return (
                <OerebTopicsWithoutRestriction data={topics} />
            );
        }
    })();

    return (
        <div class="accordion-item mt-3">
            <h2 class="accordion-header">
                <button class={buttonClass} type="button" onClick={toggle}>
                    <div class="container-fluid">
                        <strong>{title}</strong>
                        <span class="badge rounded-pill bg-secondary float-end">{topics.length}</span>
                    </div>
                </button>
            </h2>
            <div class="accordion-collapse collapse" ref={collapseEl}>
                {topicList}
            </div>
        </div>
    );
}

export default OerebCategory;
