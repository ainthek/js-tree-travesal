module.exports = {
  valueof,
  parent,
  setParentPrototype,
  setParentPrototype2,
  objectAssignRecursive,
  objectAssignRecursiveWhitelist,
  objectAssignRecursiveWhitelistProxy,
  objectAssignRecursiveTraverse,
  objectAssignRecursiveTraverseWhitelist,
  objectAssignRecursiveTraverseWhitelistProxy
};

function self(v) {
  return function() {
    return v;
  };
}

function valueof(k, v) {
  if (typeof v !== 'object') {
    return {
      valueOf: self(v)
    };
  }
  return v;
}

function parent(k, v) {

  if (typeof v !== 'object') {
    return {
      valueOf: self(v)
    };
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

/* TODO: where this was used ?
function objectAssignOnlyParent(k, v) {
  return isO(v) ? Object.assign(Object.create(this), v) : v; // works only with direct parent
}
*/

function objectAssignRecursive(k, v) {
  if (isO(v)) {
    const ret = createObj(this, v);
    fixProto(ret);
    return ret;
  }
  return v;
}

const whitelist = ["limit", "discounts"];

function objectAssignRecursiveWhitelist(k, v) {
  if (isO(v)) {
    const ret = createObj(this, v, whitelist);
    fixProto(ret, whitelist);
    return ret;
  }
  return v;
}

function objectAssignRecursiveWhitelistProxy(k, v) {
  if (isO(v)) {
    const ret = createObj(this, v, whitelist, true);
    fixProto(ret, whitelist, true);
    return ret;
  }
  return v;
}

function objectAssignRecursiveTraverse(obj) {
  Object.keys(obj).forEach(function(key) {
    if (isO(obj[key])) {
      obj[key] = Object.assign(Object.create(obj), obj[key]);
      objectAssignRecursiveTraverse(obj[key]);
    }
  });
}

function objectAssignRecursiveTraverseWhitelist(obj) {
  Object.keys(obj).forEach(function(key) {
    if (isO(obj[key])) {
      const proto = {};
      whitelist.forEach((property) => {
        if (!Object.keys(obj[key]).includes(property)) {
          let getVal;
          Object.defineProperty(proto, property, {
            get() {
              return getVal === undefined ? obj[property] : getVal;
            },
            set(val) {
              getVal = val;
            }
          });
        }
      });
      obj[key] = Object.assign(Object.create(proto), obj[key]);
      objectAssignRecursiveTraverseWhitelist(obj[key]);
    }
  });
}

function objectAssignRecursiveTraverseWhitelistProxy(obj) {
  Object.keys(obj).forEach(function(key) {
    if (isO(obj[key])) {
      const proto = new Proxy(Object.create(obj), {
        get(target, property) {
          if (Object.keys(target).includes(property) || whitelist.includes(property)) {
            return target[property];
          }
        }
      });
      obj[key] = Object.assign(Object.create(proto), obj[key]);
      objectAssignRecursiveTraverseWhitelistProxy(obj[key]);
    }
  });
}

/**** helpers ****/
function fixProto(object, whitelist, useProxy) {
  Object.keys(object).forEach((key) => {
    if (isO(object[key])) {
      object[key] = createObj(object, object[key], whitelist, useProxy);
      fixProto(object[key], whitelist, useProxy);
    }
  });
}

function createObj(object, values, whitelist, useProxy) {
  if (!whitelist) return Object.assign(Object.create(object), values);
  let obj;
  if (useProxy) {
    obj = new Proxy(Object.create(object), {
      get(target, property) {
        if (Object.keys(target).includes(property) || whitelist.includes(property)) {
          return target[property];
        }
      }
    });
  } else {
    obj = {};
    whitelist.forEach((property) => {
      if (!Object.keys(values).includes(property)) {
        let getVal;
        Object.defineProperty(obj, property, {
          get() {
            return getVal === undefined ? object[property] : getVal;
          },
          set(val) {
            getVal = val;
          }
        });
      }
    });
  }
  return Object.assign(obj, values);
}