/*global describe:true,it:true,    after:true,before:true,afterEach:true,beforeEach:true */
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
    });







    it.skip("POC - this is the main idea, how it originated", function() {

        // processing is json parse (postOrder)

        var o2 = JSON.parse(str);

        Object.setPrototypeOf(o2.insurance.subjects.HOUSE.BALCONY, o2.insurance.subjects.HOUSE)
        Object.setPrototypeOf(o2.insurance.subjects.HOUSE, o2.insurance.subjects)
        Object.setPrototypeOf(o2.insurance.subjects.GARAGE, o2.insurance.subjects)
        Object.setPrototypeOf(o2.insurance.subjects, o2.insurance)

        assert(o2.insurance.subjects.HOUSE.BALCONY.discounts);
        assert(o2.insurance.subjects.HOUSE.BALCONY.material === "glass");
        assert(o2.insurance.subjects.HOUSE.GARAGE); //not realy needed
        assert(o2.insurance.subjects.GARAGE.HOUSE);
        assert(o2.insurance.subjects.HOUSE.limit);
        assert(o2.insurance.subjects.GARAGE.limit === 4);
        assert(o2.insurance.subjects.HOUSE.limit === 10);

    })



});