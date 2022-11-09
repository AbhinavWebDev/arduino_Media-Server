import StoryModel from "../Models/storyModel.js";
import userModel from "../Models/UserModal.js";
import mongoose from "mongoose";

//Create new Post

// export const createStory = async (req, res) => {

//     const newStory = new StoryModel(req.body);
//     newStory._id = mongoose.Types.ObjectId();
//     try {
//         await newStory.save();
//         res.status(200).json(newStory);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error);
//     }
// };

export const getStory = async (req, res) => {
    const userid = req.params.id;

        try {
            const followingStory = await userModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(userid),
                    },
                },
                {
                    $lookup: {
                        from: "storys",
                        localField: "following",
                        foreignField: "userId",
                        as: "followingStory",
                    },
                    
                },
                
                {
                    $project: {
                        followingStory: 1,
                        _id: 0,
                    },
                },
            ]);

            res.status(200).json(
                (followingStory[0].followingStory)
                    .sort((a, b) => {
                        return b.createdAt - a.createdAt;
                    })
            )
        } catch (error) {
            res.status(500).json(error);
        }

    }




//     export const createStory = async (req, res) => {

//         const newStory = new StoryModel(req.body);
//         newStory._id = mongoose.Types.ObjectId();
//         const user = req.body.userId;
//         const { image } = req.body;
//         try {
//             const story = await StoryModel.findOne({userId:user});
// if (!story) {
    
//     await newStory.save();
//     res.status(200).json(newStory);
// } else {
    
//     await story.updateOne({ $push: { image: image } });
    
//                 res.status(200).json("Story added");
// }

//         } catch (error) {
//             console.log(error);
//             res.status(500).json(error);
//         }
//     };




    export const createStory = async (req, res) => {

        const newStory = new StoryModel(req.body);
        newStory._id = mongoose.Types.ObjectId();
        const user = req.body.userId;
        const { image } = req.body;
        try {
            const story = await StoryModel.findOne({userId:user});
if (!story) {
    
    await newStory.save();
    res.status(200).json(newStory);
} else {
    
    await story.updateOne({ $push: { image: image } });
    
                res.status(200).json("Story added");
}

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    };






