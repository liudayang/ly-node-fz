'use strict';

var Promise = /** @class */ (function () {
    function Promise(executor) {
        var _this = this;
        this.status = "PENDING" /* pending */;
        this.value = undefined;
        this.reason = undefined;
        this.onFulfilledCbs = [];
        this.onRejectedCbs = [];
        var reslove = function (value) {
            if (_this.status === "PENDING" /* pending */) {
                _this.status = "FULFILLED" /* fulfilled */;
                _this.value = value;
                _this.onFulfilledCbs.forEach(function (fn) { return fn(); });
            }
        };
        var reject = function (reason) {
            if (_this.status === "PENDING" /* pending */) {
                _this.status = "REJECTED" /* rejected */;
                _this.reason = reason;
                _this.onRejectedCbs.forEach(function (fn) { return fn(); });
            }
        };
        try {
            executor(reslove, reject);
        }
        catch (error) {
            reject(error);
        }
    }
    Promise.prototype.resolvePromise = function (promise2, x, reslove, reject) {
        var _this = this;
        if (promise2 === x) {
            reject(new TypeError('循环吊用promise 啦啦啦'));
        }
        if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
            var called_1 = false;
            try {
                var then = x.then;
                if (typeof then === 'function') {
                    then.call(x, function (y) {
                        if (called_1)
                            return;
                        called_1 = true;
                        _this.resolvePromise(promise2, y, reslove, reject);
                        // reslove(y)
                    }, function (r) {
                        if (called_1)
                            return;
                        called_1 = true;
                        reject(r);
                    });
                }
                else {
                    reslove(x);
                }
            }
            catch (e) {
                console.log(e);
                if (called_1)
                    return;
                called_1 = true;
                reject(e);
            }
        }
        else {
            reslove(x);
        }
    };
    Promise.prototype.then = function (onFulfilled, onRejected) {
        var _this = this;
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function (val) { return val; };
        onRejected = typeof onRejected === 'function' ? onRejected : function (err) { throw err; };
        var promise2 = new Promise(function (reslove, reject) {
            if (_this.status === "FULFILLED" /* fulfilled */) {
                setTimeout(function () {
                    try {
                        var x = onFulfilled(_this.value);
                        console.log(promise2, x, promise2 === x, '----');
                        _this.resolvePromise(promise2, x, reslove, reject);
                    }
                    catch (error) {
                        reject(error);
                    }
                }, 0);
            }
            if (_this.status === "REJECTED" /* rejected */) {
                setTimeout(function () {
                    try {
                        var x = onRejected(_this.reason);
                        _this.resolvePromise(promise2, x, reslove, reject);
                    }
                    catch (error) {
                        reject(error);
                    }
                }, 0);
            }
            if (_this.status === "PENDING" /* pending */) {
                _this.onFulfilledCbs.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onFulfilled(_this.value);
                            _this.resolvePromise(promise2, x, reslove, reject);
                        }
                        catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
                _this.onRejectedCbs.push(function () {
                    setTimeout(function () {
                        try {
                            var x = onRejected(_this.reason);
                            _this.resolvePromise(promise2, x, reslove, reject);
                        }
                        catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
            }
        });
        return promise2;
    };
    return Promise;
}());
var p = new Promise(function (reslove, reject) {
    reslove('ok');
});
p.then(null, function (err) {
    throw new Error("000");
}).then(null, function (err) {
    throw new Error("000");
}).then(function (data) {
    console.log(data);
}, function (err) {
    console.log(err);
});

module.exports = Promise;
