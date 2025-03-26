import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import bcrypt from 'bcryptjs';
import User from '../../../models/user';

// TODO: Import your database client here
// Example: import { db } from '$lib/server/db';

export const POST: RequestHandler = async ({ request }) => {
    try {
        // Parse the request body
        const data = await request.json();
        const { email, password } = data;

        // TODO: Check if email already exists in database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.findOne({ email: email }).updateOne({
            password: hashedPassword,
            emailVerified: true,
            onBoarded: true
        });
        // Return success response
        return json({ success: true, message: 'User credentials stored successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error storing password:', error);
        return json({ success: false, message: 'Failed to store credentials' }, { status: 500 });
    }
};
