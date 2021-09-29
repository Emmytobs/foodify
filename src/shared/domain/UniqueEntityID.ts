import Identifier from "./Identifier";
import { v4 as uuidv4 } from 'uuid';

export default class UniqueEntityID extends Identifier<string | number> {
    constructor(id?: string | number) {
        super(id ? id : uuidv4())
    }
}