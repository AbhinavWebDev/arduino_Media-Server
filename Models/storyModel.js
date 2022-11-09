import mongoose, { SchemaTypes } from "mongoose";

const storySchema = mongoose.Schema({
    userId: {
        type: SchemaTypes.ObjectId, required: true
    },
    firstName:{
        type: String,
        required:true
    },
    profilePicture:String,
    image: [],
},
    {
        timestamps: true


    })

var StoryModel = mongoose.model("Storys", storySchema)
export default StoryModel