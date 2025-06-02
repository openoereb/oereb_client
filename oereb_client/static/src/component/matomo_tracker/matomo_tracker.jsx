import PropTypes from "prop-types";
import React, {useEffect} from "react";

const MatomoTracker = ({matomoUrl, siteId}) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.defer = true;
    script.src = `${matomoUrl}/matomo.js`;
    document.body.appendChild(script);
    window._paq = window._paq || [];
    window._paq.push(["trackPageView"]);
    window._paq.push(["enableLinkTracking"]);
    window._paq.push(["setTrackerUrl", `${matomoUrl}/matomo.php`]);
    window._paq.push(["setSiteId", siteId]);
  }, [matomoUrl, siteId]);
  return null;
};

MatomoTracker.propTypes = {
  matomoUrl: PropTypes.string.isRequired,
  siteId: PropTypes.number.isRequired
};

export default MatomoTracker;
