import axios from 'axios';
import { API_ENDPOINT, CANDIDATE_ID } from '../constants';

export class Cometh {
    constructor() { }
    static async create(row: number, column: number, direction: string) {
        try {
            let result = await axios.post(`${API_ENDPOINT}comeths`, {
                row,
                column,
                direction,
                candidateId: CANDIDATE_ID
            });
            console.log("Cometh created");
            return result.data;
        } catch (e) {
            console.error("Error occured while interacting with API endpoint.");
            console.error(e);
        }
        return null;
    }

    static async remove(row: number, column: number) {
        try {
            let result = await axios.delete(`${API_ENDPOINT}comeths`, {
                data: {
                    row,
                    column,
                    candidateId: CANDIDATE_ID
                }
            });
            console.log("Cometh removed");
            return result.data;
        } catch (e) {
            console.error("Error occured while interacting with API endpoint.");
            console.error(e);
        }
        return null;
    }
}