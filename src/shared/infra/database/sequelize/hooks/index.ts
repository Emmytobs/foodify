import { UserModel } from '../models/UserModel'
import { DomainEvent } from "../../../../domain/events/DomainEvent";
import UniqueEntityID from "../../../../domain/UniqueEntityID";
// import { sequelize } from "../models";

function dispatchDomainEvent(primaryKeyValue: string) {
    const id = new UniqueEntityID(primaryKeyValue)
    DomainEvent.dispatchEventsForAggregate(id)
}

(function sequelizeHooks() {
    // const {
    //     UserModel
    // } = sequelize.models

    UserModel.addHook('afterSave', (m) => dispatchDomainEvent(m.getDataValue('userId')))
})()