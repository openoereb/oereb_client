import { Collapse } from 'bootstrap';

import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setActiveCategory } from '../../reducer/category';
import OerebTopicsWithoutRestriction from '../topics/topics_without_restriction';

function OerebCategory(props) {
    const title = props.title;
    const topics = props.data;
    const restriction = props.restriction;
    const collapseEl = useRef(null);
    const [active, setActive] = useState(false);
    const activeCategory = useSelector((state) => state.category).category;
    const dispatch = useDispatch();

    useEffect(() => {
        const collapse = new Collapse(collapseEl.current, {
            toggle: false
        });
        if (activeCategory === collapseEl) {
            active ? collapse.show() : collapse.hide();
        }
        else {
            collapse.hide();
        }
    });

    const buttonClass = (() => {
        if (active && activeCategory === collapseEl) {
            return 'accordion-button';
        }
        else { 
            return 'accordion-button collapsed';
        }
    })();

    const toggle = function() {
        if (activeCategory === collapseEl) {
            setActive(!active);
        }
        else {
            setActive(true);
        }
        dispatch(setActiveCategory(collapseEl));
    }

    const topicList = (() => {
        if (restriction) {
            return (
                <div class="accordion-body">
                    foo
                </div>
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
