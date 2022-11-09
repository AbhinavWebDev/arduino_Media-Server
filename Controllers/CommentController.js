import mongoose from "mongoose";
import CommentModel from "../Models/CommentModal.js";


//Create Comment

export const createComment = async (req, res) => {
    const newComment = new CommentModel(req.body);
    newComment._id = mongoose.Types.ObjectId();
    try {
        await newComment.save();
        res.status(200).json(newComment);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

//Get all Comments
// export const getComment = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const comment = await CommentModel.find({postID:id});

//         res.status(200).json(comment);
//     } catch (error) {
//         res.status(500).json(error);
//     }
// };


//Get all Comments
export const getComment = async (req, res) => {
    const id = req.params.id;
    try {
        const comment = await CommentModel.find({postID:id});

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json(error);
    }
};








