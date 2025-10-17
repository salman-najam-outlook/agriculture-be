"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
var Publisher = /** @class */ (function () {
    function Publisher(client) {
        this.client = client;
    }
    Publisher.prototype.publish = function (data) {
        this.client.publish(this.subject, JSON.stringify(data), function () {
            console.log('event published');
        });
    };
    return Publisher;
}());
exports.Publisher = Publisher;
