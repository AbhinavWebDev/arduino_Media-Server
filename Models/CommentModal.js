import mongoose, { SchemaTypes } from "mongoose";

const commentsSchema = mongoose.Schema({
    userId: {
        type: SchemaTypes.ObjectId, required: true
    },
    postID: {
        type: SchemaTypes.ObjectId, required: true
    },
    comment:{
        type: String,
        required:true
    },
    profilePicture:String,
    firstName:{
        type: String,
        required:true
    },
    
},
    {
        timestamps: true


    })

var CommentModel = mongoose.model("Comments", commentsSchema)
export default CommentModel