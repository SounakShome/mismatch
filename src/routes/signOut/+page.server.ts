import type { PageServerLoad } from "./$types"
import { change } from "../../store";

export const load: PageServerLoad = async (events) => {

    // Clear the cookie
    events.cookies.delete('deets', { path: '/' });
    change("");
    return {};
}