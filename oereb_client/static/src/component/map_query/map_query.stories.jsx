import "ol/ol.css";

import {Map, View} from "ol";
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import React, {useEffect, useRef} from "react";
import {useDispatch} from "react-redux";

import {loadAt, show} from "../../reducer/map_query";
import OerebMapQuery from "./map_query";

export default {
  title: 'API Reference/Component/Map Query',
  component: OerebMapQuery,
  tags: ['autodocs']
};

export const MapQuery = () => {
  const mapElement = useRef(null);
  const map = new Map({
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: [8.0, 47.0],
      zoom: 8
    })
  });
  useEffect(() => {
    map.setTarget(mapElement.current);
  });
  const dispatch = useDispatch();
  const handleClick = function() {
    const center = map.getView().getCenter();
    dispatch(loadAt({
      posX: center[0],
      posY: center[1]
    }));
    setTimeout(() => {
      dispatch(show({
        results: [
          {
            number: '1234',
            egrid: 'CH1234567890',
            type: {
              Code: 'RealEstate',
              Text: [
                {
                  Language: 'de',
                  Text: 'Liegenschaft'
                },
                {
                  Language: 'fr',
                  Text: 'Bien-fonds'
                },
                {
                  Language: 'it',
                  Text: 'Bene immobile'
                },
                {
                  Language: 'rm',
                  Text: 'Bain immobigliar'
                },
                {
                  Language: 'en',
                  Text: 'Property'
                }
              ]
            }
          },
          {
            number: '5678',
            egrid: 'CH1234567890',
            type: {
              Code: 'Distinct_and_permanent_rights.BuildingRight',
              Text: [
                {
                  Language: 'de',
                  Text: 'Baurecht'
                },
                {
                  Language: 'fr',
                  Text: 'Droit de superficie'
                },
                {
                  Language: 'it',
                  Text: 'Diritto di superficie'
                },
                {
                  Language: 'rm',
                  Text: 'Dretg da construcziun'
                },
                {
                  Language: 'en',
                  Text: 'Building right'
                }
              ]
            }
          }
        ]
      }));
    }, 1000);
  };
  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={handleClick}>Show</button>
      <div ref={mapElement} style={{width: '100%',
        height: '300px'}} className="mt-3">
        <OerebMapQuery map={map} />
      </div>
    </div>
  );
};
MapQuery.title = 'Map Query';
