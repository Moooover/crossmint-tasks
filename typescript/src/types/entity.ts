import axios from 'axios';
import { API_ENDPOINT, CANDIDATE_ID } from '../constants';

export abstract class Entity {
    protected endpoint: string;
    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    async create(data: object) {
        try {
            let result = await axios.post(`${API_ENDPOINT}${this.endpoint}`, {
                ...data,
                candidateId: CANDIDATE_ID
            });
            console.log(`${this.endpoint} created`);
            return result.data;
        } catch (e) {
            console.error("Error occured while interacting with API endpoint.\n e: ", e);
        }
        return null;
    }

    async remove(row: number, column: number) {
        try {
            let result = await axios.delete(`${API_ENDPOINT}${this.endpoint}`, {
                data: {
                    row,
                    column,
                    candidateId: CANDIDATE_ID
                }
            });
            console.log(`${this.endpoint} removed`);
            return result.data;
        } catch (e) {
            console.error("Error occured while interacting with API endpoint.\n e: ", e);
        }
        return null;
    }
}