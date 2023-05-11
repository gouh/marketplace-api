export interface IUser {
    ID: string;
    username: string;
    token: string;
    email: string;
    picture: string;
    isVerified: boolean;
    provider: string;
    socialID: string;
    metadata: any;
    createdAt: string;
    updatedAt: string;
}
