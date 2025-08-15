import{u as s,s as c,j as n}from"./iframe-BRWzqT9J.js";import{d as o}from"./extract-TNCqLbQV.js";import{O as a}from"./category-R7AB8XBt.js";import"./preload-helper-D9Z9MdNV.js";import"./bootstrap.esm-BjiTvFHt.js";import"./index-BU0F9OOB.js";import"./extract-BJCNn7ce.js";import"./topics_with_restrictions-BIGsmhCg.js";import"./language-BZZFEiCU.js";import"./topic-CVIfVEma.js";import"./Group-BItj5V-c.js";import"./math-4uH4-Zr4.js";import"./array-BA2iV-RQ.js";import"./documents-1gd9bJBz.js";import"./useTranslation-BgpURjWR.js";import"./legend-BOj98600.js";import"./responsible_office-BIuZf-cI.js";import"./topics_without_restriction-0iWAxWKO.js";const w={title:"API Reference/Component/Category",component:a,tags:["autodocs"]},t=()=>(s()(c(o)),n.jsx(a,{title:"Concerned theme",data:o.GetExtractByIdResponse.extract.ConcernedTheme,restriction:!0}));t.title="Concerned theme";const e=()=>(s()(c(o)),n.jsx(a,{title:"Not concerned theme",data:o.GetExtractByIdResponse.extract.NotConcernedTheme}));e.title="Not concerned theme";const r=()=>(s()(c(o)),n.jsx(a,{title:"Theme without data",data:o.GetExtractByIdResponse.extract.ThemeWithoutData}));r.title="Theme without data";t.__docgenInfo={description:"",methods:[],displayName:"ConcernedTheme"};e.__docgenInfo={description:"",methods:[],displayName:"NotConcernedTheme"};r.__docgenInfo={description:"",methods:[],displayName:"ThemeWithoutData"};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
  const dispatch = useDispatch();
  dispatch(showExtract(data));
  return <OerebCategory title="Concerned theme" data={data["GetExtractByIdResponse"]["extract"]["ConcernedTheme"]} restriction={true} />;
}`,...t.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => {
  const dispatch = useDispatch();
  dispatch(showExtract(data));
  return <OerebCategory title="Not concerned theme" data={data["GetExtractByIdResponse"]["extract"]["NotConcernedTheme"]} />;
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const dispatch = useDispatch();
  dispatch(showExtract(data));
  return <OerebCategory title="Theme without data" data={data["GetExtractByIdResponse"]["extract"]["ThemeWithoutData"]} />;
}`,...r.parameters?.docs?.source}}};const B=["ConcernedTheme","NotConcernedTheme","ThemeWithoutData"];export{t as ConcernedTheme,e as NotConcernedTheme,r as ThemeWithoutData,B as __namedExportsOrder,w as default};
