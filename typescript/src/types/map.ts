import axios from 'axios';
import { API_ENDPOINT, CANDIDATE_ID } from '../constants';

export class Map {
    constructor() { }
    static async getGoal() {
        try {
            let result = await axios.get(`${API_ENDPOINT}map/${CANDIDATE_ID}/goal`);
            return result.data.goal;
        } catch (e) {
            console.error("Error occured while interacting with API endpoint.\n e: ", e);
        }
        return null;
    }
}