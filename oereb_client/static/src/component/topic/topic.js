import {Collapse} from 'bootstrap';
import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setActiveTopic, setViewServices} from '../../reducer/accordion';
import {addIfNotContains} from '../../util/array';
import OerebCompleteLegend from '../complete_legend/complete_legend';
import OerebLegend from '../legend/legend';

const OerebTopic = function(props) {
    const topic = props.topic;
    const restrictions = props.restrictions;
    const collapseEl = useRef(null);
    const [active, setActive] = useState(false);
    const activeTopic = useSelector((state) => state.accordion).topic;
    const dispatch = useDispatch();

    const viewServices = [];
    restrictions.forEach((restriction) => {
        const map = restriction['Map'];
        addIfNotContains(map, viewServices);
    });

    useEffect(() => {
        const collapse = new Collapse(collapseEl.current, {
            toggle: false
        });
        if (activeTopic === collapseEl.current) {
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
        if (active && activeTopic === collapseEl) {
            return 'accordion-button';
        }

            return 'accordion-button collapsed';

    })();

    const toggle = function() {
        if (activeTopic === collapseEl.current) {
            setActive(!active);
            dispatch(setActiveTopic(null));
            dispatch(setViewServices([]));
        }
        else {
            setActive(true);
            dispatch(setActiveTopic(collapseEl.current));
            dispatch(setViewServices(viewServices));
        }
    }

    return (
        <div className="accordion-item">
            <h2 className="accordion-header">
                <button className={buttonClass} type="button" onClick={toggle}>
                    {topic.Text.Text}
                </button>
            </h2>
            <div className="accordion-collapse collapse" ref={collapseEl}>
                <div className="accordion-body">
                    <OerebLegend restrictions={restrictions} />
                    <OerebCompleteLegend restrictions={restrictions} />
                </div>
            </div>
        </div>
    );
};

OerebTopic.propTypes = {
    topic: PropTypes.object.isRequired,
    restrictions: PropTypes.array.isRequired
};

export default OerebTopic;
