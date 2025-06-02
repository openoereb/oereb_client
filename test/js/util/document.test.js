import {addDocumentIfNotContained} from "../../../oereb_client/static/src/util/documents";

describe("addDocumentIfNotContained", () => {

  const document1 = {
    Type: {
      Code: "law"
    },
    Title: "foo",
    OfficialTitle: "bar",
    Lawstatus: "inForce",
    ArticleNumber: ["Art. 1"],
    TextAtWeb: ["http://example.com/doc1"]
  };

  const document2 = {
    Type: {
      Code: "law"
    },
    Title: "foo",
    OfficialTitle: "bar",
    Lawstatus: "inForce",
    ArticleNumber: ["Art. 2"],
    TextAtWeb: ["http://example.com/doc2"]
  };

  it("should not add duplicate documents", () => {
    const target = {
      legalProvision: [],
      law: [],
      hint: []
    };
    addDocumentIfNotContained(document1, target);
    expect(target.legalProvision).toHaveLength(0);
    expect(target.law).toHaveLength(1);
    expect(target.hint).toHaveLength(0);
    expect(target.law[0].ArticleNumber).toHaveLength(1);
    expect(target.law[0].TextAtWeb).toHaveLength(1);
    addDocumentIfNotContained(document1, target);
    expect(target.legalProvision).toHaveLength(0);
    expect(target.law).toHaveLength(1);
    expect(target.hint).toHaveLength(0);
    expect(target.law[0].ArticleNumber).toHaveLength(1);
    expect(target.law[0].TextAtWeb).toHaveLength(1);
    addDocumentIfNotContained(document2, target);
    expect(target.legalProvision).toHaveLength(0);
    expect(target.law).toHaveLength(1);
    expect(target.hint).toHaveLength(0);
    expect(target.law[0].ArticleNumber).toHaveLength(2);
    expect(target.law[0].TextAtWeb).toHaveLength(2);
  });
});