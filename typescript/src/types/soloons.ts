import axios from 'axios';
import { API_ENDPOINT, CANDIDATE_ID } from '../constants';

export class Soloon {
    constructor() { }
    static async create(row: number, column: number, color: string) {
        try {
            let result = await axios.post(`${API_ENDPOINT}soloons`, {
                row,
                column,
                color,
                candidateId: CANDIDATE_ID
            });
            return result.data;
        } catch (e) {
            console.error("Error occured while interacting with API endpoint.");
        }
        return null;
    }

    static async remove(row: number, column: number) {
        try {
            let result = await axios.delete(`${API_ENDPOINT}soloons`, {
                data: {
                    row,
                    column,
                    candidateId: CANDIDATE_ID
                }
            });
            return result.data;
        } catch (e) {
            console.error("Error occured while interacting with API endpoint.");
        }
        return null;
    }
}