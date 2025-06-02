import {register} from "ol/proj/proj4";
import proj4 from "proj4";

import {getCoordinates, isGNSS, isLV95} from "../../../oereb_client/static/src/util/coordinate";

describe("isLV95", () => {
  it("should return true", () => {
    expect(isLV95("2600000.0 1200000.0")).toBe(true);
    expect(isLV95("2600000,1200000")).toBe(true);
    expect(isLV95("2600000.0, 1200000.0")).toBe(true);
  });
  it("should return false", () => {
    expect(isLV95("260000.0 120000.0")).toBe(false);
    expect(isLV95("foo")).toBe(false);
  });
});

describe("isGNSS", () => {
  it("should return true", () => {
    expect(isGNSS("7.0 47.0")).toBe(true);
    expect(isGNSS("7,47")).toBe(true);
    expect(isGNSS("7.0, 47.0")).toBe(true);
  });
  it("should return false", () => {
    expect(isGNSS("260000.0 120000.0")).toBe(false);
    expect(isGNSS("foo")).toBe(false);
  });
});

describe("getCoordinates", () => {
  it("should return null", () => {
    expect(getCoordinates("foo")).toBe(null);
  });
  it("should return coordinates", () => {
    proj4.defs(
      "EPSG:2056",
      "+proj=somerc +lat_0=46.95240555555556 +lon_0=7.439583333333333 +k_0=1 +x_0=2600000 +y_0=1200000 " +
      "+ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs"
    );
    register(proj4);
    expect(getCoordinates("2600000.0 1200000.0")).toEqual([2600000.0, 1200000.0]);
    expect(getCoordinates("7.0 47.0")).toEqual([2566639.343368421, 1205531.915106859]);
  });
});