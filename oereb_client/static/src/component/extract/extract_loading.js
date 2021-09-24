import React from 'react';
import {useTranslation} from 'react-i18next';

const OerebExtractLoading = function () {
  const {t} = useTranslation();
  return (
    <div className="oereb-client-extract container-fluid">
      <p className="text-center align-middle pt-5">
        <i className="spinner-grow spinner-grow-sm"></i>&nbsp;
        {t('extract.loading.message')}
      </p>
    </div>
  )
};

export default OerebExtractLoading;
