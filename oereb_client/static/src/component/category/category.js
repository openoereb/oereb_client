import { Collapse } from 'bootstrap';

import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setActiveCategory } from '../../reducer/category';

function OerebCategory(props) {
    const title = props.title;
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

    return (
        <div class="accordion-item mt-3">
            <h2 class="accordion-header">
                <button class={buttonClass} type="button" onClick={toggle}>
                    <strong>{title}</strong>
                </button>
            </h2>
            <div class="accordion-collapse collapse" ref={collapseEl}>
                <div class="accordion-body">
                    foo
                </div>
            </div>
        </div>
    );
}

export default OerebCategory;
