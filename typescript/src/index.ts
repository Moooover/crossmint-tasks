import { Polyanet, Map, Soloon, Cometh } from './types';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const main = async () => {
    const goalMap: Array<Array<string>> | null = await Map.getGoal();
    if (!goalMap) {
        console.error("Error while getting a goal Map.");
        return;
    }
    const isRemove = false;
    if (isRemove) {
        for (let row = 0; row < goalMap.length; row++) {
            let goalRow = goalMap[row];
            for (let col = 0; col < goalRow.length; col++) {
                if (goalRow[col].includes("SOLOON")) {
                    await Soloon.remove(row, col);
                    // to avoid 429: Too many requests
                    await sleep(1000);
                } else if (goalRow[col].includes("COMETH")) {
                    await Cometh.remove(row, col);
                    // to avoid 429: Too many requests
                    await sleep(1000);
                } else if (goalRow[col] === 'POLYANET') {
                    await Polyanet.remove(row, col);
                    // to avoid 429: Too many requests
                    await sleep(1000);
                }
            }
        }
    }
    else {
        for (let row = 0; row < goalMap.length; row++) {
            let goalRow = goalMap[row];
            for (let col = 0; col < goalRow.length; col++) {
                if (goalRow[col].includes("SOLOON")) {
                    const color = goalRow[col].split('_')[0].trim();
                    await Soloon.create(row, col, color.toLowerCase());
                    // to avoid 429: Too many requests
                    await sleep(1000);
                } else if (goalRow[col].includes("COMETH")) {
                    const dir = goalRow[col].split('_')[0].trim();
                    await Cometh.create(row, col, dir.toLowerCase());
                    // to avoid 429: Too many requests
                    await sleep(1000);
                } else if (goalRow[col] === 'POLYANET') {
                    await Polyanet.create(row, col);
                    // to avoid 429: Too many requests
                    await sleep(1000);
                }
            }
        }
    }

}

main();