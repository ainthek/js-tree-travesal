var { postOrder, preOrder, inOrder, levelOrder } = require("../src/");
var assert = require("assert");

describe("traverse", function() {
    var p = {
        F: {
            B: {
                A: "A",
                D: {
                    C: "C",
                    E: "E"
                }
            },
            G: {
                I: {
                    H: "H"
                }
            }
        }
    };

    var expected = {
        postOrder: ['A', 'C', 'E', 'D', 'B', 'H', 'I', 'G', 'F', null],
        preOrder: [null, 'F', 'B', 'A', 'D', 'C', 'E', 'G', 'I', 'H'],
        inOrder: ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'G', null],
        levelOrder: [null, 'F', 'B', 'G', 'A', 'D', 'I', 'C', 'E', 'H']
    };

    var Visitor = function() {
        var order = [];
        return {
            visit: function(key, value, parent) {
                order.push(key);
            },
            getOrder: function() {
                return order;
            }
        }
    }

    it("postOrder", function() {
        var visitor = new Visitor();
        postOrder(null, p, null, visitor.visit);

        assert.deepEqual(visitor.getOrder(), expected.postOrder);
    });
    it("preOrder", function() {
        var visitor = new Visitor();
        preOrder(null, p, null, visitor.visit);
        assert.deepEqual(visitor.getOrder(), expected.preOrder);
    });

    it("inOrder", function() {
        var visitor = new Visitor();
        inOrder(null, p, null, visitor.visit);
        assert.deepEqual(visitor.getOrder(), expected.inOrder);
    });

    it("levelOrder", function() {
        var visitor = new Visitor();
        levelOrder(p, visitor.visit);
        assert.deepEqual(visitor.getOrder(), expected.levelOrder);
    });

    it("json-stringify", function() {
        var order = [];

        function visit(key, value) {
            order.push(key || null);
            return value;
        }

        JSON.stringify(p, visit);
        // JSON parse is preOrder
        assert.deepEqual(order, expected.preOrder);
    });
    it("json-parse", function() {
        var order = [];

        function visit(key) {
            order.push(key || null);
        }

        JSON.parse(JSON.stringify(p), visit);
        // JSON parse is postOrder
        assert.deepEqual(order, expected.postOrder);
    });

    // Object assign is not traversal
    it.skip("object-assign", function() {
        function Object_assign(target) {
            // copied from polyfil code 
            'use strict';
            if (target === undefined || target === null) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source !== undefined && source !== null) {
                    for (var nextKey in source) {
                        if (source.hasOwnProperty(nextKey)) {
                            output[nextKey] = source[nextKey];
                        }
                    }
                }
            }
            return output;
        }
    });
});
