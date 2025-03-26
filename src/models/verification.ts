import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    token: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    expires: {
        type: Date,
        required: true
    }
}, {timestamps: true});

UserSchema.index({email: 1, token: 1}, {unique: true});


export default mongoose.model("VerificationToken", UserSchema) ;