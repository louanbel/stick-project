import {createAvatar} from "@dicebear/core";
import {avataaars} from "@dicebear/collection";

export function generateAvatar(name: string) {
    return createAvatar(avataaars, {
        size: 128,
        seed: name
    }).toDataUriSync();
}

export async function fetchParticipantList() {
    try {
        const response = await fetch('https://stick-api.vercel.app/items'); // Replace 'API_URL_HERE' with your API endpoint.
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching participant list:', error);
        return [];
    }
}

