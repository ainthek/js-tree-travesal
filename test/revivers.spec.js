/*global describe:true,it:true,    after:true,before:true,afterEach:true,beforeEach:true */
var assert = require("assert");

var revivers = require("../src/revivers.js");

describe("JSON.parse revivers", function() {

    var treeObject = {
        x: 10,
        y: {
            y1: "y1",
            y2: "y2",
            y3: {
                "y31": "y32"
            }
        }
    };
    var treeString = JSON.stringify(treeObject);

    it("valueOf", function() {
        var treeObject = JSON.parse(treeString);
        assert.equal(typeof treeObject.x, "number");
        assert(treeObject.x === 10);

        var treeObject2 = JSON.parse(treeString, revivers.valueof);
        //console.log(treeObject2)
        assert.equal(typeof treeObject2.x, "object");
        assert(treeObject2.x.valueOf() === 10);
        assert(treeObject2.x == 10);
        assert(treeObject2.x + 1 === 11);
    });

    it("parents", function() {
        var treeObject = JSON.parse(treeString);
        assert.equal(typeof treeObject.y.y1, "string");
        assert(treeObject.y.y1 === "y1");

        var treeObject2 = JSON.parse(treeString, revivers.parent);
        //console.log(treeObject2)
        assert(treeObject2.y.y1._parent === treeObject2.y);
        assert(treeObject2.y.y3._parent === treeObject2.y);
        assert(treeObject2.y.y3.y31._parent === treeObject2.y.y3);

        assert(treeObject2.y.y1 !== "y1");
        assert(treeObject2.y.y1 == "y1");
    });

});