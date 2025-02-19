import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const error = url.searchParams.get('error');
    if (error) {
        // Handle the error query parameter
        // console.error('Error:', error);
        if (error === 'CredentialsSignin') {
            return {
                 error: 'User Not Found.' 
            };
        }
        return {
            status: 400,
            body: { message: 'An error occurred', error }
        };
    }

    return {
        status: 200,
        body: { message: 'No error' }
    };
};