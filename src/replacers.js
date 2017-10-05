module.exports = {
    undefinedAsNull: (k, v) => v === undefined ? null : v,
    undefinedAsError: function(k, v) {
        if (v === undefined) throw new Error("Undefined !");
        return v;
    }

}


