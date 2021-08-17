import Identifier from "./Identifier";
import uuid from 'uuid';

export default class UniqueEntityID extends Identifier<string | number> {
    constructor(id?: string | number) {
        super(id ? id : uuid.v4())
    }
}