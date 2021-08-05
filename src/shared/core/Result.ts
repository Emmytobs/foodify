export class Result<T> {
    public isSuccess: boolean
    public isFailure: boolean
    public value: T | undefined
    public error: T | string | undefined

    constructor(isSuccess: boolean, error?: T | string, value?: T) {
        if(isSuccess && error) {
            throw new Error('[InvalidOperation]: A result can not be success and failure')
        }
        if(!isSuccess && !error) {
            throw new Error('[InvalidOperation]: A failed result must contain an error message')
        }
        if (!isSuccess && value) {
            throw new Error('[InvalidOperation]: A failed result must not contain a value')
        }

        this.isSuccess = isSuccess
        this.isFailure = !isSuccess
        this.value = value
        this.error = error;
    }

    public getValue(): T {
        if (this.isFailure) {
            throw new Error('Can not get the value of a failed result');
        }
        return this.value as T;
    }

    public errorValue(): T {
        return this.error as T;
    }

    public static combine(results: Result<any>[]): Result<any> {
        for(const result of results) {
           if (result.isFailure) return result;
        }
        return Result.ok<any>()
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, undefined, value)
    }

    public static fail<U>(error: string): Result<U> {
        return new Result<U>(false, error);
    }
}


export type Either<S, F> = Right<S, F> | Left<S, F>

export class Right<S, F> {
    readonly value: S

    constructor(value: S) {
        this.value = value
    }

    isRight(): this is Right<S, F> {
        return true
    }
    
    isLeft(): this is Left<S, F> {
        return false
    }
}


export class Left<S, F> {
    readonly value: F

    constructor(value: F) {
        this.value = value
    }

    isRight(): this is Right<S, F> {
        return false
    }
    
    isLeft(): this is Left<S, F> {
        return true
    }
}

export const right = <S, F>(a: S): Right<S, F> => {
    return new Right(a)
}

export const left = <S, F>(b: F): Left<S, F> => {
    return new Left(b)
}