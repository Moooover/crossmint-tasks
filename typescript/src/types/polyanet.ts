import axios from 'axios';
import { API_ENDPOINT, CANDIDATE_ID } from '../constants';

export class Polyanet {
    constructor() { }
    static async create(row: number, column: number) {
        try {
            let result = await axios.post(`${API_ENDPOINT}polyanets`, {
                row,
                column,
                candidateId: CANDIDATE_ID
            });
            console.log("Polyanet created");
            return result.data;
        } catch (e) {
            console.error("Error occured while interacting with API endpoint.");
            console.error(e);
        }
        return null;
    }

    static async remove(row: number, column: number) {
        try {
            let result = await axios.delete(`${API_ENDPOINT}polyanets`, {
                data: {
                    row,
                    column,
                    candidateId: CANDIDATE_ID
                }
            });
            console.log("Polyanet removed");
            return result.data;
        } catch (e) {
            console.error("Error occured while interacting with API endpoint.");
            console.error(e);
        }
        return null;
    }
}