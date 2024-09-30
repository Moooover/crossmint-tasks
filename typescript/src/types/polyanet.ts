import { Entity } from './entity';

export class Polyanet extends Entity {
    constructor() {
        super('polyanets')
    }
    static async create(row: number, column: number) {
        const inst = new Polyanet();
        return await inst.create({
            row, column
        })
    }
    static async remove(row: number, column: number) {
        const inst = new Polyanet();
        return await inst.remove(row, column);
    }
}