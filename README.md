# js-tree-traversal

This repo is collection of ideas, available npm modules and other libs related to tree traversal.

<https://en.wikipedia.org/wiki/Tree_traversal>

## JSON.parse and JSON.stringify (reviver and replacer)

These are the basic traversal impls, available out of box.
Also it is the first/last place to perform "transformations", 
and to avoid useless object creation, memory consumption, redundant traversal and other smells 
after deserialization or before serialization to JSON.

JSON parse is postOrder and JSON.stringify is preOrder, what does it mean ?

given this tree (in JSON)

	{
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
    }

JSON.parse(text[, reviver]). Reviver will receive nodes it the following order

    postOrder: ['A', 'C', 'E', 'D', 'B', 'H', 'I', 'G', 'F', null],

JSON.stringify(value[, replacer[, space]]). Replacer will receive nodes it the following order:
	
	preOrder: [null, 'F', 'B', 'A', 'D', 'C', 'E', 'G', 'I', 'H'],

see test/test/spec.js





