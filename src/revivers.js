module.exports = {
    valueof,
    parent,
    setParentPrototype,
    setParentPrototype2,
    objectAssignRecursive
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

function setParentPrototype2(k, v) {
    if (isO(v)) Object.setPrototypeOf(v, this);
    return v;
}

function objectAssignOnlyParent(k, v) {
    return isO(v) ? Object.assign(Object.create(this), v) : v; // works only with direct parent
}

function objectAssignRecursive(k, v) {
    if (isO(v)) {
        const ret = Object.assign(Object.create(this), v);
        fixProto(ret);
        return ret;
    }
    return v;

    /**** helpers ****/
    function fixProto(ret) {
        Object.keys(ret).forEach(function(key) {
            if (isO(ret[key])) {
                ret[key] = Object.assign(Object.create(ret), ret[key]);
                fixProto(ret[key]);
            }
        });
    }

}