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
            console.log("Soloon created");
            return result.data;
        } catch (e) {
            console.error("Error occured while interacting with API endpoint.");
            console.error(e);
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
            console.log("Soloon removed");
            return result.data;
        } catch (e) {
            console.error("Error occured while interacting with API endpoint.");
            console.error(e);
        }
        return null;
    }
}