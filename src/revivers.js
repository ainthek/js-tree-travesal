// just inspiration, simplified not fully correct

module.exports = {
    valueof,
    parent
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