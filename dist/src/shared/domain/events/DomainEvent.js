"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainEvent = void 0;
var DomainEvent = /** @class */ (function () {
    function DomainEvent() {
    }
    /**
   * @method markAggregateForDispatch
   * @static
   * @desc Called by aggregate root objects that have created domain
   * events to eventually be dispatched when the infrastructure commits
   * the unit of work.
   */
    DomainEvent.markAggregateForDispatch = function (aggregate) {
        var aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);
        if (!aggregateFound) {
            this.markedAggregates.push(aggregate);
        }
    };
    DomainEvent.dispatchAggregateEvents = function (aggregate) {
        var _this = this;
        aggregate.domainEvents.forEach(function (event) { return _this.dispatch(event); });
    };
    DomainEvent.removeAggregateFromMarkedDispatchList = function (aggregate) {
        var index = this.markedAggregates.findIndex(function (a) { return a.equals(aggregate); });
        this.markedAggregates.splice(index, 1);
    };
    DomainEvent.findMarkedAggregateByID = function (id) {
        var found = null;
        for (var _i = 0, _a = this.markedAggregates; _i < _a.length; _i++) {
            var aggregate = _a[_i];
            if (aggregate.id.equals(id)) {
                found = aggregate;
            }
        }
        return found;
    };
    DomainEvent.dispatchEventsForAggregate = function (id) {
        var aggregate = this.findMarkedAggregateByID(id);
        if (aggregate) {
            this.dispatchAggregateEvents(aggregate);
            aggregate.clearEvents();
            this.removeAggregateFromMarkedDispatchList(aggregate);
        }
    };
    DomainEvent.register = function (callback, eventClassName) {
        if (!this.handlersMap.hasOwnProperty(eventClassName)) {
            this.handlersMap[eventClassName] = [];
        }
        this.handlersMap[eventClassName].push(callback);
    };
    DomainEvent.clearHandlers = function () {
        this.handlersMap = {};
    };
    DomainEvent.clearMarkedAggregates = function () {
        this.markedAggregates = [];
    };
    DomainEvent.dispatch = function (event) {
        var eventClassName = event.constructor.name;
        if (this.handlersMap.hasOwnProperty(eventClassName)) {
            var handlers = this.handlersMap[eventClassName];
            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
                var handler = handlers_1[_i];
                handler(event);
            }
        }
    };
    DomainEvent.handlersMap = {};
    DomainEvent.markedAggregates = [];
    return DomainEvent;
}());
exports.DomainEvent = DomainEvent;
