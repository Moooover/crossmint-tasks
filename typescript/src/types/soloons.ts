import { Entity } from './entity';

export class Soloon extends Entity {
    constructor() { 
        super('soloons')
    }
    static async create(row: number, column: number, color: string) {
        const inst = new Soloon();
        return await inst.create({
            row, column, color
        })
    }
    static async remove(row: number, column: number) {
        const inst = new Soloon();
        return await inst.remove(row, column);
    }
}