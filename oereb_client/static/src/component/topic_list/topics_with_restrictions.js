import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sanitizeTopicCode } from '../../api/extract';
import { setActiveTopic } from '../../reducer/accordion';
import OerebTopic from '../topic/topic';

function OerebTopicsWithRestriction(props) {
    const topics = props.data;
    const restrictions = props.restrictions;
    const accordionEl = useRef(null);
    const activeTopic = useSelector((state) => state.accordion).topic;
    const dispatch = useDispatch();

    const topicList = topics.map((topic) => {
        const code = sanitizeTopicCode(topic.Code);
        return (
            <OerebTopic topic={topic} restrictions={restrictions[code]} />
        );
    });

    return (
        <div class="accordion-body p-0">
            <div class="accordion accordion-flush" ref={accordionEl}>
                {topicList}
            </div>
        </div>
    );
}

export default OerebTopicsWithRestriction;
