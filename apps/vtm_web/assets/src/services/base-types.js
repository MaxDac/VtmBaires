// @flow

export type Roles = "MASTER" | "PLAYER";

export type User = {|
    email: string;
    id: string;
    name: string;
    role: Roles;
|};

export const isUserRoleMaster = (role: ?Roles): boolean =>
    role != null && role === "MASTER";

export const isUserMaster = (user: ?User): boolean =>
    user?.role != null && isUserRoleMaster(user.role);

export type BaseInfo = {
    id: number;
    name: string;
}

export type ChatEntry = {
    id: string;
    text: string;
    result: string;
    offGame: boolean;
    master: boolean;
    character: {
        id: string;
        name: string;
        chatAvatar?: string;
    },
    chatMap: {
        id: string;
    },
    insertedAt: string;
}

export type Map = {
    id: string,
    name: string,
    description: string,
    image: string;
    isChat: boolean;
}

export const convertToMap: any => Map = ({
    id,
    name,
    description,
    image,
    isChat
}) => ({
    id,
    name,
    description,
    image,
    isChat
}: Map);

export type SessionCharacter = {|
    id?: ?string;
    name?: ?string;
    approved?: ?boolean;
    clan?: {
        name?: ?string
    };
|};

export type SessionLocation = {|
    id?: ?string;
    name?: ?string;
|};

export type Session = {|
    user: User,
    character?: ?SessionCharacter,
    location?: ?SessionLocation
|};
