/*global describe:true,it:true */
var assert = require("assert");
var revivers = require("../src/revivers.js");

describe("[POC] Implement inheritance, using various methods", function() {
  var o = {
    insurance: {
      discounts: [10, 20, 30],
      limit: 10,
      subjects: {
        HOUSE: {
          discounts: [15],
          price: null,
          BALCONY: {
            material: "glass"
            // discounts: [15],
            // price: null,
            // limit: 10,
          }
        },
        GARAGE: {
          floorArea: 34.56,
          limit: 4
          // discounts: [10, 20, 30],
        }
      }
    }
  };
  var str = JSON.stringify(o);

  it("revivers.setParentPrototype", function() {
    // BEWARE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
    var o2 = JSON.parse(str, revivers.setParentPrototype);

    assert(o2.insurance.subjects.HOUSE.BALCONY.discounts);
    assert(o2.insurance.subjects.HOUSE.BALCONY.material === "glass");
    assert(o2.insurance.subjects.HOUSE.GARAGE); //not realy needed
    assert(o2.insurance.subjects.GARAGE.HOUSE);
    assert(o2.insurance.subjects.HOUSE.limit);
    assert(o2.insurance.subjects.GARAGE.limit === 4);
    assert(o2.insurance.subjects.HOUSE.limit === 10);
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [10, 20, 30]);
    // live reference
    o2.insurance.discounts = [1, 2, 4];
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [1, 2, 4]);

    // but not back !
    o2.insurance.subjects.GARAGE.discounts = [];
    assert.deepEqual(o2.insurance.discounts, [1, 2, 4]);

    o2.insurance.limit = 12;
    assert.deepEqual(o2.insurance.subjects.HOUSE.limit, 12);
  });

  it("revivers.setParentPrototype2", function() {
    // BEWARE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
    var o2 = JSON.parse(str, revivers.setParentPrototype2);

    assert(o2.insurance.subjects.HOUSE.BALCONY.discounts);
    assert(o2.insurance.subjects.HOUSE.BALCONY.material === "glass");
    assert(o2.insurance.subjects.HOUSE.GARAGE); //not realy needed
    assert(o2.insurance.subjects.GARAGE.HOUSE);
    assert(o2.insurance.subjects.HOUSE.limit);
    assert(o2.insurance.subjects.GARAGE.limit === 4);
    assert(o2.insurance.subjects.HOUSE.limit === 10);
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [10, 20, 30]);
    // live reference
    o2.insurance.discounts = [1, 2, 4];
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [1, 2, 4]);

    // but not back !
    o2.insurance.subjects.GARAGE.discounts = [];
    assert.deepEqual(o2.insurance.discounts, [1, 2, 4]);

    o2.insurance.limit = 12;
    assert.deepEqual(o2.insurance.subjects.HOUSE.limit, 12);
  });
  it("revivers.objectAssignRecursive", function() {
    // BEWARE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
    var o2 = JSON.parse(str, revivers.objectAssignRecursive);

    assert(o2.insurance.subjects.HOUSE.BALCONY.discounts);
    assert(o2.insurance.subjects.HOUSE.BALCONY.material === "glass");
    assert(o2.insurance.subjects.HOUSE.GARAGE); //not realy needed
    assert(o2.insurance.subjects.GARAGE.HOUSE);
    assert(o2.insurance.subjects.HOUSE.limit);
    assert(o2.insurance.subjects.GARAGE.limit === 4);
    assert(o2.insurance.subjects.HOUSE.limit === 10);
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [10, 20, 30]);
    // live reference
    o2.insurance.discounts = [1, 2, 4];
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [1, 2, 4]);

    // but not back !
    o2.insurance.subjects.GARAGE.discounts = [];
    assert.deepEqual(o2.insurance.discounts, [1, 2, 4]);

    o2.insurance.limit = 12;
    assert.deepEqual(o2.insurance.subjects.HOUSE.limit, 12);
  });
  it("revivers.objectAssignRecursiveWhitelist", function() {
    // BEWARE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
    var o2 = JSON.parse(str, revivers.objectAssignRecursiveWhitelist);

    assert(o2.insurance.subjects.HOUSE.BALCONY.discounts);
    assert(o2.insurance.subjects.HOUSE.BALCONY.material === "glass");
    assert(o2.insurance.subjects.HOUSE.limit);
    assert(o2.insurance.subjects.GARAGE.limit === 4);
    assert(o2.insurance.subjects.HOUSE.limit === 10);
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [10, 20, 30]);
    // live reference
    o2.insurance.discounts = [1, 2, 4];
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [1, 2, 4]);

    // but not back !
    o2.insurance.subjects.GARAGE.discounts = [];
    assert.deepEqual(o2.insurance.discounts, [1, 2, 4]);

    o2.insurance.limit = 12;
    assert.deepEqual(o2.insurance.subjects.HOUSE.limit, 12);
  });
  it("revivers.objectAssignRecursiveWhitelistProxy", function() {
    // BEWARE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
    var o2 = JSON.parse(str, revivers.objectAssignRecursiveWhitelistProxy);

    assert(o2.insurance.subjects.HOUSE.BALCONY.discounts);
    assert(o2.insurance.subjects.HOUSE.BALCONY.material === "glass");
    assert(o2.insurance.subjects.HOUSE.limit);
    assert(o2.insurance.subjects.GARAGE.limit === 4);
    assert(o2.insurance.subjects.HOUSE.limit === 10);
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [10, 20, 30]);
    // live reference
    o2.insurance.discounts = [1, 2, 4];
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [1, 2, 4]);

    // but not back !
    o2.insurance.subjects.GARAGE.discounts = [];
    assert.deepEqual(o2.insurance.discounts, [1, 2, 4]);

    o2.insurance.limit = 12;
    assert.deepEqual(o2.insurance.subjects.HOUSE.limit, 12);
  });
  it("revivers.objectAssignRecursiveTraverse", function() {
    var o2 = JSON.parse(str);
    revivers.objectAssignRecursiveTraverse(o2);

    assert(o2.insurance.subjects.HOUSE.BALCONY.discounts);
    assert(o2.insurance.subjects.HOUSE.BALCONY.material === "glass");
    assert(o2.insurance.subjects.HOUSE.limit);
    assert(o2.insurance.subjects.GARAGE.limit === 4);
    assert(o2.insurance.subjects.HOUSE.limit === 10);
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [10, 20, 30]);
    // live reference
    o2.insurance.discounts = [1, 2, 4];
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [1, 2, 4]);

    // but not back !
    o2.insurance.subjects.GARAGE.discounts = [];
    assert.deepEqual(o2.insurance.discounts, [1, 2, 4]);

    o2.insurance.limit = 12;
    assert.deepEqual(o2.insurance.subjects.HOUSE.limit, 12);
  });
  it("revivers.objectAssignRecursiveTraverseWhitelist", function() {
    var o2 = JSON.parse(str);
    revivers.objectAssignRecursiveTraverseWhitelist(o2);

    assert(o2.insurance.subjects.HOUSE.BALCONY.discounts);
    assert(o2.insurance.subjects.HOUSE.BALCONY.material === "glass");
    assert(o2.insurance.subjects.HOUSE.limit);
    assert(o2.insurance.subjects.GARAGE.limit === 4);
    assert(o2.insurance.subjects.HOUSE.limit === 10);
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [10, 20, 30]);
    // live reference
    o2.insurance.discounts = [1, 2, 4];
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [1, 2, 4]);

    // but not back !
    o2.insurance.subjects.GARAGE.discounts = [];
    assert.deepEqual(o2.insurance.discounts, [1, 2, 4]);

    o2.insurance.limit = 12;
    assert.deepEqual(o2.insurance.subjects.HOUSE.limit, 12);
  });
  it("revivers.objectAssignRecursiveTraverseWhitelistProxy", function() {
    var o2 = JSON.parse(str);
    revivers.objectAssignRecursiveTraverseWhitelist(o2);

    assert(o2.insurance.subjects.HOUSE.BALCONY.discounts);
    assert(o2.insurance.subjects.HOUSE.BALCONY.material === "glass");
    assert(o2.insurance.subjects.HOUSE.limit);
    assert(o2.insurance.subjects.GARAGE.limit === 4);
    assert(o2.insurance.subjects.HOUSE.limit === 10);
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [10, 20, 30]);
    // live reference
    o2.insurance.discounts = [1, 2, 4];
    assert.deepEqual(o2.insurance.subjects.GARAGE.discounts, [1, 2, 4]);

    // but not back !
    o2.insurance.subjects.GARAGE.discounts = [];
    assert.deepEqual(o2.insurance.discounts, [1, 2, 4]);

    o2.insurance.limit = 12;
    assert.deepEqual(o2.insurance.subjects.HOUSE.limit, 12);
  });

  describe.skip("large-parse", function() {
    // FIXME: missing sample file
    /*
    var large = JSON.stringify(require("./sample-data.json"));
    it("large - parse()", function() {
      JSON.parse(large)
    });
    it("large - parse(revivers.setParentPrototype)", function() {
      JSON.parse(large, revivers.setParentPrototype);
    });
    it("large - parse(revivers.objectAssignRecursive)", function() {
      JSON.parse(large, revivers.objectAssignRecursive);
    });
    it("large - parse(revivers.objectAssignRecursiveWhitelist)", function() {
      JSON.parse(large, revivers.objectAssignRecursiveWhitelist);
    });
    it("large - parse(revivers.objectAssignRecursiveWhitelistProxy)", function() {
      JSON.parse(large, revivers.objectAssignRecursiveWhitelistProxy);
    });
    it("large - parse(revivers.objectAssignRecursiveTraverse)", function() {
      JSON.parse(large, revivers.objectAssignRecursiveTraverse);
    });
    it("large - parse(revivers.objectAssignRecursiveTraverseWhitelist)", function() {
      JSON.parse(large, revivers.objectAssignRecursiveTraverseWhitelist);
    });
    it("large - parse(revivers.objectAssignRecursiveTraverseWhitelistProxy)", function() {
      JSON.parse(large, revivers.objectAssignRecursiveTraverseWhitelistProxy);
    });
    */
  });
  it("POC - this is the main idea, how it originated", function() {

    // processing is json parse (postOrder)

    var o2 = JSON.parse(str);

    Object.setPrototypeOf(o2.insurance.subjects.HOUSE.BALCONY, o2.insurance.subjects.HOUSE);
    Object.setPrototypeOf(o2.insurance.subjects.HOUSE, o2.insurance.subjects);
    Object.setPrototypeOf(o2.insurance.subjects.GARAGE, o2.insurance.subjects);
    Object.setPrototypeOf(o2.insurance.subjects, o2.insurance);

    assert(o2.insurance.subjects.HOUSE.BALCONY.discounts);
    assert(o2.insurance.subjects.HOUSE.BALCONY.material === "glass");
    assert(o2.insurance.subjects.HOUSE.GARAGE); //not realy needed
    assert(o2.insurance.subjects.GARAGE.HOUSE);
    assert(o2.insurance.subjects.HOUSE.limit);
    assert(o2.insurance.subjects.GARAGE.limit === 4);
    assert(o2.insurance.subjects.HOUSE.limit === 10);

  });



});