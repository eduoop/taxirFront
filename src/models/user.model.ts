export type User = {
    id: number;
    name: string;
    role: string;
    phone: string;
    email: string;
    performed_travels: number;
    created_at: string;
    updated_at: string;
    remember_me_token: null;
    avatar?: {
        url: string;
    }
}