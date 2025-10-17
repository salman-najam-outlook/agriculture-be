"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.natsWrapper = void 0;
var nats = require("node-nats-streaming");
var NatsWrapper = /** @class */ (function () {
    function NatsWrapper() {
    }
    Object.defineProperty(NatsWrapper.prototype, "client", {
        get: function () {
            if (!this._client) {
                throw new Error("NATS not connected yet");
            }
            return this._client;
        },
        enumerable: false,
        configurable: true
    });
    NatsWrapper.prototype.connect = function (clusterId, clientId, url) {
        var _this = this;
        this._client = nats.connect(clusterId, clientId, { url: url });
        return new Promise(function (resolve, reject) {
            _this.client.on('connect', function () {
                console.log('Connected to Nats');
                resolve();
            });
            _this.client.on('error', function (err) {
                reject(err);
            });
        });
    };
    return NatsWrapper;
}());
exports.natsWrapper = new NatsWrapper();
