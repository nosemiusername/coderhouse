import dotenv from 'dotenv';

/** Loading from console if there is parameter */
export const config = {
    port: process.env.PORT || 3000,
}
