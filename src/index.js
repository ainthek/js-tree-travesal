// Executes visitor on the object and its children (recursively).
// https://en.wikipedia.org/wiki/Tree_traversal
module.exports = {
    postOrder: postOrder,
    preOrder: preOrder,
    inOrder: inOrder,
    levelOrder: levelOrder
};
// Post-order: A, C, E, D, B, H, I, G, F, null
function postOrder(key, obj, parent, visitor /*(nodeName, nodeValue, parentNode)*/ ) {
    typeof obj === "object" && Object.keys(obj).forEach(function(key) {
        var obj = this;
        postOrder(key, obj[key], obj, visitor);
        visitor(key, obj[key], obj);
    }, obj);
    key === null && visitor(null, obj, null);
}

// Pre-order: null, F, B, A, D, C, E, G, I, H.
function preOrder(key, obj, parent, visitor /*(nodeName, nodeValue, parentNode)*/ ) {
    key === null && visitor(null, obj, null);
    // FIXME: null values and other that are typeof object and have no Object.keys(obj)
    // probably all these are buggy and are suitable only for keys print
    typeof obj === "object" && Object.keys(obj).forEach(function(key) {
        var obj = this;
        visitor(key, obj[key], obj);
        preOrder(key, obj[key], obj, visitor);
    }, obj);
}

// in-order: A, B, C, D, E, F, G, H, I.
// NOTE:
// however we return A, B, C, D, E, F, H, I, G, null, since we have no left/right notion. 
// Single child is always left
function inOrder(key, obj, parent, visitor /*(nodeName, nodeValue, parentNode)*/ ) {
    if (obj === null) return;
    var children = (typeof obj === "object" ? Object.keys(obj) : []);
    var left = children.slice(0, 1);
    var right = children.splice(1);

    left.forEach(function(key) {
        inOrder(key, obj[key], obj, visitor);
    });

    visitor(key, obj, parent);

    right.forEach(function(key) {
        inOrder(key, obj[key], obj, visitor);
    });

}
// Level-order: F, B, G, A, D, I, C, E, H.
function levelOrder(obj, visitor) {
    var root = obj;
    visitor(null, root, null); // visit root

    var queue = [root];
    while (queue.length) { // iterate while some node is not visited yet
        var curr = queue.shift();
        processCurrentNode(curr, queue, visitor);
    }

    function processCurrentNode(n, /*array*/ q, /*function*/ v) {
        typeof n == "object" && Object.keys(n).forEach(function(key) {
            v(key, n[key], n);
            q.push(n[key]);
        });
    }
}
