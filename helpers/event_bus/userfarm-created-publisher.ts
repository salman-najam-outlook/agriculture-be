import { Publisher } from "./base-publisher";
import { UserFarmCreatedEvent } from "./userfarm-created-event";
import { Subjects } from "./subjects";

export class UserFarmCreatedPublisher extends Publisher<UserFarmCreatedEvent> {
    subject: Subjects.userFarmCreated = Subjects.userFarmCreated;
}
