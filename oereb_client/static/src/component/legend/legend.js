import './legend.scss';

import {Popover} from 'bootstrap';
import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

import {getLocalizedText} from '../../util/language';

const getLegendEntries = function (restrictions) {
  var legendEntries = [];
  for (var i = 0; i < restrictions.length; i++) {
    var existing = false;
    for (var j = 0; j < legendEntries.length; j++) {
      if (legendEntries[j]['TypeCode'] === restrictions[i]['TypeCode']) {
        existing = true;
        if (Reflect.apply(Object.prototype.hasOwnProperty, restrictions[i], ['NrOfPoints'])) {
          legendEntries[j]['NrOfPoints'] += restrictions[i]['NrOfPoints'];
        }
        if (Reflect.apply(Object.prototype.hasOwnProperty, restrictions[i], ['LengthShare'])) {
          legendEntries[j]['LengthShare'] += restrictions[i]['LengthShare'];
        }
        if (Reflect.apply(Object.prototype.hasOwnProperty, restrictions[i], ['AreaShare'])) {
          legendEntries[j]['AreaShare'] += restrictions[i]['AreaShare'];
        }
        if (Reflect.apply(Object.prototype.hasOwnProperty, restrictions[i], ['PartInPercent'])) {
          legendEntries[j]['PartInPercent'] += restrictions[i]['PartInPercent'];
        }
        break;
      }
    }
    if (!existing) {
      var legendEntry = {
        'TypeCode': restrictions[i]['TypeCode'],
        'Information': restrictions[i]['Information'],
        'SymbolRef': restrictions[i]['SymbolRef'],
        'SubTheme': restrictions[i]['SubTheme']
      };
      if (Reflect.apply(Object.prototype.hasOwnProperty, restrictions[i], ['NrOfPoints'])) {
        legendEntry['NrOfPoints'] = restrictions[i]['NrOfPoints'];
      }
      if (Reflect.apply(Object.prototype.hasOwnProperty, restrictions[i], ['LengthShare'])) {
        legendEntry['LengthShare'] = restrictions[i]['LengthShare'];
      }
      if (Reflect.apply(Object.prototype.hasOwnProperty, restrictions[i], ['AreaShare'])) {
        legendEntry['AreaShare'] = restrictions[i]['AreaShare'];
      }
      if (Reflect.apply(Object.prototype.hasOwnProperty, restrictions[i], ['PartInPercent'])) {
        legendEntry['PartInPercent'] = restrictions[i]['PartInPercent'];
      }
      legendEntries.push(legendEntry);
    }
  }
  return legendEntries;
};

const getPercent = function (entry) {
  if (Reflect.apply(Object.prototype.hasOwnProperty, entry, ['PartInPercent'])) {
    return entry['PartInPercent'].toFixed(1) + '%';
  }
  return null;
};

const getPart = function (entry) {
  if (Reflect.apply(Object.prototype.hasOwnProperty, entry, ['NrOfPoints'])) {
    return entry['NrOfPoints'].toFixed(0);
  }
  if (Reflect.apply(Object.prototype.hasOwnProperty, entry, ['LengthShare'])) {
    return entry['LengthShare'].toFixed(0) + ' m';
  }
  if (Reflect.apply(Object.prototype.hasOwnProperty, entry, ['AreaShare'])) {
    return <span>{entry['AreaShare'].toFixed(0)} m<sup>2</sup></span>;
  }
  return null;
};

const OerebLegend = function (props) {
  const language = useSelector((state) => state.language).current;
  const symbolZoomEnabled = useSelector((state) => state.symbolZoom).enabled;
  const restrictions = props.restrictions;
  const tableBody = useRef(null);


  const legendEntries = getLegendEntries(restrictions).map((entry, key) => {
    const information = getLocalizedText(entry['Information'], language);
    const symbolRef = entry['SymbolRef'];
    const part = getPart(entry);
    const percent = getPercent(entry);
    return (
      <tr key={key}>
        <td>{information}</td>
        <td>
          <img className="oereb-client-symbol" src={symbolRef} />
        </td>
        <td className="text-end">{part}</td>
        <td className="text-end">{percent}</td>
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
          <th>Typ</th>
          <th></th>
          <th className="text-end">Anteil</th>
          <th className="text-end">Anteil in %</th>
        </tr>
      </thead>
      <tbody ref={tableBody}>
        {legendEntries}
      </tbody>
    </table>
  );
};

OerebLegend.propTypes = {
  restrictions: PropTypes.array.isRequired
};

export default OerebLegend;