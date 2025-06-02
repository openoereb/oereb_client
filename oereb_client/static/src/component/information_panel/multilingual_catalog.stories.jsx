import React, {useState} from "react";
import {useDispatch} from "react-redux";

import data from "../../../../../samples/extract.json";
import {showExtract} from "../../reducer/extract";
import OerebMultilingualCatalog from './multilingual_catalog';

export default {
  title: 'API Reference/Component/Information Panel/Multilingual Catalog',
  component: OerebMultilingualCatalog,
  tags: ['autodocs']
};

export const MultilingualCatalog = () => {
  const [search, setSearch] = useState(null);
  const handleSearch = function (evt) {
    setSearch(evt.target.value);
  }
  return (
    <div>
      <input className="form-control float-end mb-3" placeholder="Search..." onChange={handleSearch} />
      <div className="clearfix"></div>
      <OerebMultilingualCatalog catalog="Glossary" search={search} />
    </div>
  );
};
MultilingualCatalog.title = 'Multilingual Catalog';
MultilingualCatalog.decorators = [
  (Story) => {
    const dispatch = useDispatch();
    dispatch(showExtract(data));
    return <Story />
  }
];
