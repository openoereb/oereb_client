import { Collapse } from 'bootstrap';

import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setActiveTopic } from '../../reducer/accordion';
import OerebLegend from '../legend/legend';

function OerebTopic(props) {
    const topic = props.topic;
    const restrictions = props.restrictions;
    const collapseEl = useRef(null);
    const [active, setActive] = useState(false);
    const activeTopic = useSelector((state) => state.accordion).topic;
    const dispatch = useDispatch();

    console.log(restrictions);

    useEffect(() => {
        const collapse = new Collapse(collapseEl.current, {
            toggle: false
        });
        if (activeTopic === collapseEl.current) {
            active ? collapse.show() : collapse.hide();
        }
        else {
            collapse.hide();
        }
    });

    const buttonClass = (() => {
        if (active && activeTopic === collapseEl) {
            return 'accordion-button';
        }
        else { 
            return 'accordion-button collapsed';
        }
    })();

    const toggle = function() {
        if (activeTopic === collapseEl.current) {
            setActive(!active);
        }
        else {
            setActive(true);
        }
        dispatch(setActiveTopic(collapseEl.current));
    }

    return (
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class={buttonClass} type="button" onClick={toggle}>
                    {topic.Text.Text}
                </button>
            </h2>
            <div class="accordion-collapse collapse" ref={collapseEl}>
                <div class="accordion-body">
                    <OerebLegend />
                </div>
            </div>
        </div>
    );
}

export default OerebTopic;
