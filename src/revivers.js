
module.exports = {
    valueof,
    parent,
    mixin
}

function self(v) {
    return function() {
        return v;
    }
}

function valueof(k, v) {
    if (typeof v !== 'object') {
        return {
            valueOf: self(v)
        }
    }
    return v;
}

function parent(k, v) {

    if (typeof v !== 'object') {
        return {
            valueOf: self(v)
        }
    } else {

        Object.keys(v).forEach((p) => v[p]._parent = v);
        return v;
    }
}

function mixin(k, v) {
    // var a = {a: 1}; 
    // // a ---> Object.prototype ---> null

    // var b = Object.create(a);
    // // b ---> a ---> Object.prototype ---> null
    // console.log(b.a); // 1 (inherited)
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain
    if (typeof v !== 'object') {
        return v;
    } else {
        Object.keys(v).forEach((p) => {
            if (typeof v[p] == 'object') {
                v[p] =_d(v, v[p]);
            }
        });
        return v;
    }
}

