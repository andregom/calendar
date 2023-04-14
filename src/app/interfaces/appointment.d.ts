export interface Appointment {
    id: number;
    title: string;
    participants?: string;
    start: Date;
    finnish: Date;
    description?: string
}