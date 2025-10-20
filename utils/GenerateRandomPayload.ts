import fs from 'fs';
import path from 'path';

export interface RandomPayload {
    name: string;
    job: string;
}

export function generateRandomPayload(): RandomPayload {
    const randomName = `User_${Math.random().toString(36).substring(2, 7)}`;
    const randomJob = `Job_${Math.random().toString(36).substring(2, 7)}`;

    const data: RandomPayload = { name: randomName, job: randomJob };
    const filePath = path.join(__dirname, '../data/user_info.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    return data;
}
