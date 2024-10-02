import axios from 'axios';

const githubUsername = "sakshamahluwalia";
const BASE_URL = 'https://recruiting.verylongdomaintotestwith.ca/api';

export const saveCharacter = async (characterData: any) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/${githubUsername}/character`,
            characterData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to save character.');
    }
};

export const getCharacter = async () => {
    try {
        const response = await axios.get(
            `${BASE_URL}/${githubUsername}/character`
        );
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch character.');
    }
};
