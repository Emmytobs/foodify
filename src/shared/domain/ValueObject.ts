interface ValueObjectProps {
    [key: string]: any
}

export abstract class ValueObject<V extends ValueObjectProps> {
    public props: V;
    constructor(props: V) {
        this.props = props;
    }

    public equals(vo?: ValueObject<V>): boolean {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.props === undefined) {
            return false;
        }
        return JSON.stringify(this.props) === JSON.stringify(vo.props);
    }
}