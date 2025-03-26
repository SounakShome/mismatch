import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    reg:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    college: {
        type: String,
        required: true,
    },
    teamId: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        default: "dummy",
        required: true,
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: "participant",
        required: true
    },
    onBoarded: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});


export default mongoose.model("User", UserSchema) ;