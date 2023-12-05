import {createAvatar} from "@dicebear/core";
import {avataaars} from "@dicebear/collection";

export function generateAvatar(name: string) {
    return createAvatar(avataaars, {
        size: 128,
        seed: name
    }).toDataUriSync();
}


