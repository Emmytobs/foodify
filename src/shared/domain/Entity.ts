import UniqueEntityID from "./UniqueEntityID";

const isEntity = (v: any): v is Entity<any> => {
    return v instanceof Entity
}

export abstract class Entity<E> {
    protected props: E;
    protected _id: UniqueEntityID;

    constructor(props: E, id?: UniqueEntityID) {
        this.props = props
        this._id = id ? id : new UniqueEntityID();
    }

    public equals(object?: Entity<E>): boolean {
        if (object === null || object === undefined) {
            return false;
        }
        if (this === object) {
            return true;
        }
        if (!isEntity(object)) {
            return false;
        }
        return this._id.equals(object._id);
    }
}