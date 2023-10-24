export type Question = {
    id: number;
    text: string;
};

export type Answer = {
    seatIndex: number;
    studentName: string;
    text: string;
};

type Status = [string, string, string];

interface Period {
    periodNumber: number;
    startTime: string;
    endTime: string;
}

export interface Settings {
    teacherName: string;
    missingSeatIndexes: number[];
    chatEnabled: boolean;
    sharesEnabled: boolean;
    checksEnabled: boolean;
    shares: string[];  // Assuming shares is an array of strings
    statuses: Status[];
    chatDelayMs: number;
    chatMessageMaxLen: number;
    allowedSharesDomains: string[];
    normalColor: [number, number, number];
    warningColor: [number, number, number];
    columns?: number;  // The '?' means it's an optional property
    rows?: number;
    periods?: Period[];
}
