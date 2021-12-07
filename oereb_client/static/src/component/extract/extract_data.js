import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {setActiveCategory, setActiveTopic, setViewServices} from '../../reducer/accordion';
import {hideExtract, toggleCollapsed, toggleInformationPanel} from '../../reducer/extract';
import OerebCategory from '../category/category';
import OerebExternalViewer from '../external_viewer/external_viewer';
import OerebPermalink from '../permalink/permalink';
import OerebRealEstate from '../real_estate/real_estate';
import OerebStaticExtract from '../static_extract/static_extract';

/**
 * This component contains the loaded extract data, including the extract menu and the real
 * estate information.
 */
const OerebExtractData = function () {
  const {t} = useTranslation();
  const extract = useSelector((state) => state.extract);
  const dispatch = useDispatch();

  const closeExtract = function () {
    dispatch(setViewServices([]));
    dispatch(setActiveTopic(null));
    dispatch(setActiveCategory(null));
    dispatch(hideExtract());
  };

  const extractData = extract.data['GetExtractByIdResponse']['extract'];
  const collapsed = extract.collapsed;

  const toggleInfo = function () {
    dispatch(toggleInformationPanel());
  };

  const collapseExtract = function () {
    dispatch(toggleCollapsed());
  };

  const collapseButton = (() => {
    let title = t('extract.hide');
    let iconClass = 'bi bi-chevron-up';
    if (collapsed) {
      title = t('extract.show');
      iconClass = 'bi bi-chevron-down';
    }
    return (
      <button type="button"
        className="btn btn-outline-secondary collapse-extract"
        title={title}
        onClick={collapseExtract}>
        <i className={iconClass}></i>
      </button>
    );
  })();

  const dataClasses = [
    'oereb-client-extract',
    'data container-fluid',
    'd-flex',
    'flex-column',
    'justify-content-start',
    'align-items-stretch'
  ];

  return (
    <div className={dataClasses.join(' ')}>
      <div>
        <div className="btn-group float-end" role="group">
          {collapseButton}
          <button onClick={closeExtract}
            className="btn btn-outline-secondary"
            type="button">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <div className="btn-group float-start" role="group">
          <OerebPermalink />
          <OerebExternalViewer />
          <OerebStaticExtract />
          <button type="button"
            className="btn btn-outline-secondary"
            title={t('extract.information_panel.button.title')}
            onClick={toggleInfo}>
            <i className="bi bi-info-square"></i>
          </button>
        </div>
      </div>
      <OerebRealEstate data={extractData.RealEstate} />
      <div className="accordion accordion-flush flex-grow-1 mt-1 mb-2 oereb-client-extract-data">
        <OerebCategory title={t('extract.category.concerned_theme')}
          data={extractData.ConcernedTheme}
          restriction={true} />
        <OerebCategory title={t('extract.category.not_concerned_theme')}
          data={extractData.NotConcernedTheme}
          restriction={false} />
        <OerebCategory title={t('extract.category.theme_without_data')}
          data={extractData.ThemeWithoutData}
          restriction={false} />
      </div>
    </div>
  )
};

export default OerebExtractData;
