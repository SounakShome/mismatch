import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    team_id:{
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});


export default mongoose.model("Teams", UserSchema) ;