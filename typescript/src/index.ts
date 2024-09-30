import { Polyanet, Map } from './types';

const main = async () => {
    const goalMap: Array<Array<string>> | null = await Map.getGoal();
    if (!goalMap) {
        console.error("Error while getting a goal Map.");
        return;
    }
    for (let row = 0; row < goalMap.length; row ++) {
        let goalRow = goalMap[row];
        for (let col = 0; col < goalRow.length; col++) {
            if (goalRow[col] === 'POLYANET') {
                await Polyanet.create(row, col);
            }
        }
    }
}

main();