import { User } from "./user.model";

export type Travel = {
    id: string;
    from: string;
    to: string;
    occupiedplaces: string;
    emptyplaces: string;
    start: string;
    internship: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    from_state: string;
    to_state: string;
    user: User
    users: User[]
}