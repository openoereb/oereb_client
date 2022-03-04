import {mount} from "enzyme";
import toJson from "enzyme-to-json";
import React from "react";
import {render} from "react-dom";
import {act} from "react-dom/test-utils";
import {Provider} from "react-redux";

import OerebPermalink from "../../../../oereb_client/static/src/component/permalink/permalink";
import {initLanguages} from "../../../../oereb_client/static/src/reducer/language";
import MainStore from "../../../../oereb_client/static/src/store/main";

describe('permalink component', () => {

  let component;

  const modal =
    <div className="modal fade" id="permalinkModal" tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Permalink</h5>
            <button type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close">
            </button>
          </div>
          <div className="modal-body">
            <input className="form-control" />
          </div>
        </div>
      </div>
    </div>;
  beforeEach(() => {
    act(() => {
      MainStore.dispatch(initLanguages({
        default: 'de',
        available: ['de']
      }));
    });
    const el = document.createElement('div');
    document.body.append(el);
    render(modal, el);
    component = mount(
      <Provider store={MainStore}>
        <OerebPermalink />
      </Provider>
    );
  });

  it('should render permalink modal', () => {
    expect(toJson(component)).toMatchSnapshot();
    component.find('button').simulate('click');
    expect(toJson(component)).toMatchSnapshot();
  });

});