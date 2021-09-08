// @flow

export opaque type Id = string | number;

export type Clan = {
    id: number;
    name: string;
};

export type CharacterInfo = {
    id: Id;
    name: string;
    avatar: string;
};

export type Character = {
    info: CharacterInfo,
    biography: string;
    description: string;
    clan: ?Clan;
    isComplete: boolean;
    isNpc: boolean;
    stage: number;
    humanity: number;
    approved: boolean;
};
