// @flow

import {atom, RecoilState} from "recoil";
import type {Session, SessionCharacter, SessionLocation} from "../services/base-types";
import {localStorageEffect} from "./effects";

export const storageUserInfoKey = "vtm-baires-session-info";
export const storageCharacterInfoKey = "vtm-baires-character-info";
export const storageLocationInfoKey = "vtm-baires-location-info";

export const sessionStateAtom: RecoilState<?Session> = atom<?Session>({
    key: 'userSession',
    default: null,
    effects: [localStorageEffect(storageUserInfoKey)]
})

export const sessionCharacterStateAtom: RecoilState<?SessionCharacter> = atom<?SessionCharacter>({
    key: 'characterSession',
    default: null,
    effects: [localStorageEffect(storageCharacterInfoKey)]
})

export const sessionMapStateAtom: RecoilState<?SessionLocation> = atom<?SessionLocation>({
    key: 'userLocation',
    default: null,
    effects: [localStorageEffect(storageLocationInfoKey)]
})
