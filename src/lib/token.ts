import { getUser } from './getUser';
import { v4 as uuidv4 } from 'uuid';
import verification from '../models/verification';

export async function createToken(email: string): Promise<string> {
    //Generate a random token
    const token = uuidv4();
    const expires = new Date().getTime() + 1000 * 60 * 60; // 60 minutes

    //check if the token exists for the user
    const existingToken = await getUser(email);

    if (existingToken) {
        //delete the token
        await verification.deleteOne({ _id: existingToken._id });
    }

    //Create a new token
    const newToken = new verification({ token, email, expires: new Date(expires) });
    await newToken.save();

    return token;
}