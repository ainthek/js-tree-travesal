module.exports = {
    valueof,
    parent,
    setParentPrototype
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

const isO = (it) => Object.prototype.toString.apply(it) == "[object Object]";

function setParentPrototype(k, v) {
    // BEWARE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
    if (isO(v)) {
        for (var p in v) {
            if (isO(v[p])) {
                Object.setPrototypeOf(v[p], v);
            }
        }
    }
    return v;
}