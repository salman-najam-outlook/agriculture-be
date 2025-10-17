import { Subjects } from "./subjects";

export interface UserFarmCreatedEvent {
    subject: Subjects.userFarmCreated
    data: {
        id: string,
        title: string,
        price: number
    }
}