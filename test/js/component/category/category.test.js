import {mount} from "enzyme";
import React from "react";
import {Provider} from "react-redux";

import OerebCategory from "../../../../oereb_client/static/src/component/category/category";
import {showExtract} from "../../../../oereb_client/static/src/reducer/extract";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";
import extract from "../../../../samples/extract.json";

describe('category component', () => {

  let component;

  beforeEach(() => {
    MainStore.dispatch(initLanguages({
      default: 'de',
      available: ['de']
    }));
    MainStore.dispatch(showExtract(extract));
    component = mount(
      <Provider store={MainStore}>
        <OerebCategory title="Test with restrictions initially shown"
          data={extract.GetExtractByIdResponse.extract.ConcernedTheme}
          restriction={true}
          initial={true} />
        <OerebCategory title="Test with restrictions"
          data={extract.GetExtractByIdResponse.extract.ConcernedTheme}
          restriction={true} />
        <OerebCategory title="Test without restrictions"
          data={extract.GetExtractByIdResponse.extract.NotConcernedTheme}
          restriction={false} />
      </Provider>
    );
  });

  it('should render category with and without restrictions', () => {
    expect(component).toMatchSnapshot();
    const categories = component.find('.oereb-client-category');
    expect(categories).toHaveLength(3);
    categories.at(1).simulate('click');
    expect(component).toMatchSnapshot();
    categories.at(2).simulate('click');
    expect(component).toMatchSnapshot();
    categories.at(0).simulate('click');
    expect(component).toMatchSnapshot();
  });

});