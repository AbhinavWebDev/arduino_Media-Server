
import mongoose, { SchemaTypes } from "mongoose";

const UserSchema=mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        number:{
            type:String,
            required:true
        },
        password:{
            type: String,
            required:true
        },
        firstName:{
            type: String,
            required:true
        },
        lastName:{
            type: String,
            required:true
        },
        isAdmin:{
            type: Boolean,
            default:false
        },
        block:{
            type: Boolean,
            default:false
        },
        verify:{
            type: Boolean,
            default:false

        },
        profileImg:String,
        coverImg:String,
        about:String,
        Country:String,
        livesin:String,
        worksAt:String,
        Relationship:String,
        followers:[SchemaTypes.ObjectId],
        following:[SchemaTypes.ObjectId]
    },
    {timestamps:true}
)

const UserModel=mongoose.model('Users',UserSchema);
export default UserModel