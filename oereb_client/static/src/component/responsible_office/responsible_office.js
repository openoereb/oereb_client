import './responsible_office.scss';

import {isArray} from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {useSelector} from 'react-redux';

import {addIfNotContains} from '../../util/array';
import {getLocalizedText} from '../../util/language';

const OerebResponsibleOffice = function (props) {
  const restrictions = props.restrictions;
  const language = useSelector((state) => state.language).current;
  const offices = [];

  restrictions.forEach((restriction) => {
    addIfNotContains(restriction['ResponsibleOffice'], offices);
    if (isArray(restriction['Geometry'])) {
      restriction['Geometry'].forEach((geometry) => {
        addIfNotContains(geometry['ResponsibleOffice'], offices);
      });
    }
  });

  const officeElements = offices.map((office, key) => {
    const localizedName = getLocalizedText(office['Name'], language);
    return (
      <dd key={key} className="ms-2">
        <a href={office['OfficeAtWeb']} target="_blank" rel="noreferrer">
          {localizedName}
        </a>
      </dd>
    );
  });

  return (
    <dl className="oereb-responsible-office border-top pt-2 mb-2">
      <dt>Zuständige Stelle</dt>
      {officeElements}
    </dl>
  );
};

OerebResponsibleOffice.propTypes = {
  restrictions: PropTypes.array.isRequired
};

export default OerebResponsibleOffice;
