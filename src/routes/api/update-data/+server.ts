import connectDB from '../../../middleware/mongoose';
import { json } from '@sveltejs/kit';
import teams from '../../../models/teams';
import users from "../../../models/user";

export async function POST({ request }) {
    try {
        await connectDB();
        const data = await request.json();
        const team = data.teams;
        const participants = data.participants;
        console.log(participants);
        for (let i = 0; i < team.length; i++) {
            let newTeam = new teams({ 
                team_id: team[i].id, 
                name: team[i].name 
            });
            await newTeam.save();
        }
        for (let i = 0; i < participants.length; i++) {
            let user = new users({ 
                reg: participants[i].id,
                name: participants[i].name ,
                email: participants[i].email,
                phone: participants[i].phone,
                college: participants[i].college,
                teamId: participants[i].teamId, 
            });
            await user.save();
        }
        return json({ message: "Data uploaded successfully!" });
    } catch (error) {
        console.log(error);
        return json({ message: "Data upload failed!" }, { status: 400 });
    }
}