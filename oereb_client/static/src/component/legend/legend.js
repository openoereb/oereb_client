import './legend.scss';

import {Popover} from 'bootstrap';
import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import {getLocalizedText} from '../../util/language';

export const getGeomType = function(item) {
  if (Reflect.apply(Object.prototype.hasOwnProperty, item, ['NrOfPoints'])) {
    return 'Point';
  }
  if (Reflect.apply(Object.prototype.hasOwnProperty, item, ['LengthShare'])) {
    return 'LineString';
  }
  if (Reflect.apply(Object.prototype.hasOwnProperty, item, ['AreaShare'])) {
    return 'Polygon';
  }
  return null;
};

const getLegendEntries = function (restrictions) {
  var legendEntries = [];
  for (var i = 0; i < restrictions.length; i++) {
    const geomType = getGeomType(restrictions[i]);
    var existing = false;
    for (var j = 0; j < legendEntries.length; j++) {
      if (
        legendEntries[j]['TypeCode'] === restrictions[i]['TypeCode'] &&
        legendEntries[j]['GeomType'] === geomType
      ) {
        existing = true;
        if (geomType === 'Point') {
          legendEntries[j]['NrOfPoints'] += restrictions[i]['NrOfPoints'];
        }
        if (geomType === 'LineString') {
          legendEntries[j]['LengthShare'] += restrictions[i]['LengthShare'];
        }
        if (geomType === 'Polygon') {
          legendEntries[j]['AreaShare'] += restrictions[i]['AreaShare'];
          legendEntries[j]['PartInPercent'] += restrictions[i]['PartInPercent'];
        }
        break;
      }
    }
    if (!existing) {
      var legendEntry = {
        'GeomType': geomType,
        'TypeCode': restrictions[i]['TypeCode'],
        'LegendText': restrictions[i]['LegendText'],
        'SymbolRef': restrictions[i]['SymbolRef'],
        'SubTheme': restrictions[i]['SubTheme']
      };
      if (geomType === 'Point') {
        legendEntry['NrOfPoints'] = restrictions[i]['NrOfPoints'];
      }
      if (geomType === 'LineString') {
        legendEntry['LengthShare'] = restrictions[i]['LengthShare'];
      }
      if (geomType === 'Polygon') {
        legendEntry['AreaShare'] = restrictions[i]['AreaShare'];
        legendEntry['PartInPercent'] = restrictions[i]['PartInPercent'];
      }
      legendEntries.push(legendEntry);
    }
  }
  return legendEntries.sort((a, b) => {
    if ((a['AreaShare'] || 0) > (b['AreaShare'] || 0))
      return -1;
    if ((a['AreaShare'] || 0) < (b['AreaShare'] || 0))
      return 1;
    if ((a['LengthShare'] || 0) > (b['LengthShare'] || 0))
      return -1;
    if ((a['LengthShare'] || 0) < (b['LengthShare'] || 0))
      return 1;
    if ((a['NrOfPoints'] || 0) > (b['NrOfPoints'] || 0))
      return -1;
    if ((a['NrOfPoints'] || 0) < (b['NrOfPoints'] || 0))
      return 1;
    return 0;
  });
};

const getPercent = function (entry) {
  if (getGeomType(entry) === 'Polygon') {
    return entry['PartInPercent'].toFixed(1) + '%';
  }
  return null;
};

const getPart = function (entry) {
  const geomType = getGeomType(entry);
  if (geomType === 'Point') {
    return entry['NrOfPoints'].toFixed(0);
  }
  if (geomType === 'LineString') {
    return entry['LengthShare'].toFixed(0) + ' m';
  }
  if (geomType === 'Polygon') {
    return <span>{entry['AreaShare'].toFixed(0)} m<sup>2</sup></span>;
  }
  return null;
};

/**
 * This component contains the legend for a certain topic.
 */
const OerebLegend = function (props) {
  const {t} = useTranslation();
  const language = useSelector((state) => state.language);
  const currentLanguage = language.current;
  const defaultLanguage = language.default;
  const symbolZoomEnabled = useSelector((state) => state.symbolZoom).enabled;
  const restrictions = props.restrictions;
  const tableBody = useRef(null);


  const legendEntries = getLegendEntries(restrictions).map((entry, key) => {
    const information = getLocalizedText(entry['LegendText'], currentLanguage, defaultLanguage);
    const symbolRef = entry['SymbolRef'];
    const part = getPart(entry);
    const percent = getPercent(entry);
    return (
      <tr key={key}>
        <td>{information}</td>
        <td>
          <img className="oereb-client-symbol" src={symbolRef} />
        </td>
        <td className="text-end text-nowrap">{part}</td>
        <td className="text-end text-nowrap">{percent}</td>
      </tr>
    );
  });

  useEffect(() => {
    const symbols = tableBody.current.querySelectorAll('.oereb-client-symbol');
    symbols.forEach((symbol) => {
      const url = symbol.getAttribute('src');
      const popover = new Popover(symbol, {
        content: '<img src="' + url + '" />',
        html: true,
        trigger: 'hover'
      });
      if (symbolZoomEnabled) {
        popover.enable();
      }
      else {
        popover.disable();
      }
    });
  });

  return (
    <table className="table table-sm mb-2 oereb-client-legend">
      <thead>
        <tr>
          <th>{t('extract.topic.legend.type')}</th>
          <th></th>
          <th className="text-end text-nowrap">{t('extract.topic.legend.part')}</th>
          <th className="text-end text-nowrap">{t('extract.topic.legend.part_in_percent')}</th>
        </tr>
      </thead>
      <tbody ref={tableBody}>
        {legendEntries}
      </tbody>
    </table>
  );
};

OerebLegend.propTypes = {

  /** The restrictions to show the legend for. */
  restrictions: PropTypes.array.isRequired

};

export default OerebLegend;