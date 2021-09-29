"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = require("../models/UserModel");
const DomainEvent_1 = require("../../../../domain/events/DomainEvent");
const UniqueEntityID_1 = __importDefault(require("../../../../domain/UniqueEntityID"));
// import { sequelize } from "../models";
function dispatchDomainEvent(primaryKeyValue) {
    const id = new UniqueEntityID_1.default(primaryKeyValue);
    DomainEvent_1.DomainEvent.dispatchEventsForAggregate(id);
}
(function sequelizeHooks() {
    // const {
    //     UserModel
    // } = sequelize.models
    UserModel_1.UserModel.addHook('afterSave', (m) => dispatchDomainEvent(m.getDataValue('userId')));
})();
