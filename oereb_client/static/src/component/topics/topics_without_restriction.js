import React from 'react';

function OerebTopicsWithoutRestriction(props) {
    const topics = props.data;
    const topicList = topics.map((topic) => {
        return (
            <li class="list-group-item">{topic.Text.Text}</li>
        );
    });

    return (
        <div class="accordion-body">
            <ul class="list-group list-group-flush">
                {topicList}
            </ul>
        </div>
    );
}

export default OerebTopicsWithoutRestriction;
