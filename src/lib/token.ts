import { getUser } from './getUser';
import otp from 'otp-generator';
import verification from '../models/verification';

export async function createToken(email: string): Promise<string> {
    //Generate a random token
    const token = otp.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
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