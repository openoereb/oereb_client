import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";

import {setActiveCategory, setActiveTopic, setViewServices} from "../../reducer/accordion";

/**
 * This component shows the extract's loading indicator.
 */
const OerebExtractLoading = function () {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setViewServices([]));
    dispatch(setActiveTopic(null));
    dispatch(setActiveCategory(null));
  }, []);

  return (
    <div className="oereb-client-extract oereb-client-extract-loading container-fluid">
      <p className="text-center align-middle pt-5">
        <i className="spinner-grow spinner-grow-sm"></i>&nbsp;
        {t("extract.loading.message")}
      </p>
    </div>
  );
};

export default OerebExtractLoading;
