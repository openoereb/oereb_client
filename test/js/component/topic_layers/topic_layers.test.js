import {mount} from "enzyme";
import toJson from "enzyme-to-json";
import LayerGroup from "ol/layer/Group";
import ImageLayer from "ol/layer/Image";
import TileLayer from "ol/layer/Tile";
import React from "react";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebTopicLayer from
  "../../../../oereb_client/static/src/component/topic_layers/topic_layers";
import {setViewServices} from "../../../../oereb_client/static/src/reducer/accordion";
import {loadExtract, showExtract} from "../../../../oereb_client/static/src/reducer/extract";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

describe('topic layers component', () => {

  let component;
  let layers;
  const callback = jest.fn();

  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: 'de',
        available: ['de']
      }));
    });
    act(() => {
      MainStore.dispatch(loadExtract({
        egrid: 'CH1234',
        zoom: false
      }));
    });
    act(() => {
      MainStore.dispatch(showExtract(extract));
    });
    act(() => {
      MainStore.dispatch(setViewServices({
        viewServices: [
          extract.GetExtractByIdResponse.extract.RealEstate.RestrictionOnLandownership[0].Map
        ],
        callback: callback
      }));
    });
    layers = new LayerGroup();
  });

  it('should render untiled topic layer element', () => {
    component = mount(
      <Provider store={MainStore}>
        <OerebTopicLayer topicLayers={layers} tiled={false} />
      </Provider>
    );
    expect(toJson(component)).toMatchSnapshot();
    expect(layers.getLayers().getLength()).toBe(1);
    expect(layers.getLayers().item(0)).toBeInstanceOf(ImageLayer);
    act(() => {
      layers.getLayers().item(0).getSource().dispatchEvent({
        type: 'imageloadstart'
      });
    });
    expect(toJson(component)).toMatchSnapshot();
    expect(callback).toHaveBeenCalledWith(true);
  });

  it('should render tiled topic layer element', () => {
    component = mount(
      <Provider store={MainStore}>
        <OerebTopicLayer topicLayers={layers} tiled={true} />
      </Provider>
    );
    expect(toJson(component)).toMatchSnapshot();
    expect(layers.getLayers().getLength()).toBe(1);
    expect(layers.getLayers().item(0)).toBeInstanceOf(TileLayer);
    act(() => {
      layers.getLayers().item(0).getSource().dispatchEvent({
        type: 'imageloadend'
      });
    });
    expect(toJson(component)).toMatchSnapshot();
    expect(callback).toHaveBeenCalledWith(false);
  });

});