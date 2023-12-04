import './responsible_office.scss';

import PropTypes from 'prop-types';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {addIfNotContains} from '../../util/array';
import {getLocalizedText} from '../../util/language';

/**
 * This component shows the topic's responsible offices.
 */
const OerebResponsibleOffice = function (props) {
  const {t} = useTranslation();
  const restrictions = props.restrictions;
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;
  const offices = [];

  restrictions.forEach((restriction) => {
    addIfNotContains(restriction['ResponsibleOffice'], offices);
  });

  const officeElements = offices.map((office, key) => {
    const localizedName = getLocalizedText(office['Name'], currentLanguage, defaultLanguage);
    const localizedUrl = getLocalizedText(office['OfficeAtWeb'], currentLanguage, defaultLanguage);
    if (localizedUrl === null) {
      return (
        <dd key={key} className="ms-2">
          {localizedName}
        </dd>
      );
    }
    else {
      return (
        <dd key={key} className="ms-2">
          <a href={localizedUrl} target="_blank" rel="noreferrer">
            {localizedName}
          </a>
        </dd>
      );
    }
  });

  return (
    <dl className="oereb-client-responsible-office border-top pt-2 mb-2">
      <dt>{t('extract.topic.responsible_office')}</dt>
      {officeElements}
    </dl>
  );
};

OerebResponsibleOffice.propTypes = {

  /** The topic's restrictions to collect the responsible offices for. */
  restrictions: PropTypes.array.isRequired

};

export default OerebResponsibleOffice;
