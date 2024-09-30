import { Entity } from './entity';

export class Cometh extends Entity {
    constructor() { 
        super('comeths')
    }
    static async create(row: number, column: number, direction: string) {
        const inst = new Cometh();
        return await inst.create({
            row, column, direction
        })
    }
    static async remove(row: number, column: number) {
        const inst = new Cometh();
        return await inst.remove(row, column);
    }
}