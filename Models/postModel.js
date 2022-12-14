import mongoose, { SchemaTypes } from "mongoose";

const postSchema = mongoose.Schema({
    userId: {
        type: SchemaTypes.ObjectId, required: true
    },
    firstName:{
        type: String,
        required:true
    },
    profilePicture:String,
    desc: String,
    location: String,
    likes: [SchemaTypes.ObjectId],
    report: [],
    Save: [],
    image: String,
},
    {
        timestamps: true


    })

var PostModel = mongoose.model("Posts", postSchema)
export default PostModel