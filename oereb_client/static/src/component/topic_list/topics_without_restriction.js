import PropTypes from 'prop-types';
import React from 'react';

const OerebTopicsWithoutRestriction = function(props) {
    const topics = props.data;
    const topicList = topics.map((topic, key) =>
            <li key={key} className="list-group-item">{topic.Text.Text}</li>
        );

    return (
        <div className="accordion-body p-0">
            <ul className="list-group list-group-flush">
                {topicList}
            </ul>
        </div>
    );
};

OerebTopicsWithoutRestriction.propTypes = {
    data: PropTypes.array.isRequired
};

export default OerebTopicsWithoutRestriction;
