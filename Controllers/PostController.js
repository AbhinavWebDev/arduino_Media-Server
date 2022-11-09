import PostModel from "../Models/postModel.js";
import userModel from "../Models/UserModal.js";
import mongoose from "mongoose";

//Create new Post

export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body);
    newPost._id = mongoose.Types.ObjectId();
    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
};

//Get a Post
export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await PostModel.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
};

//Update a Post

export const updatePost = async (req, res) => {

    const { userId,postId } = req.body;
    try {
        const post = await PostModel.findById(postId);

        if (post.userId == userId) {
            await post.updateOne({ $set: {desc:req.body.desc }});
            await post.updateOne({ $set: {location:req.body.location }});
            res.status(200).json({post})
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

//delete a Post

export const deletePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.body._id;

    console.log('here delete',postId,userId);

    try {
        const post = await PostModel.findById(postId);


        if (post.userId == userId ||'6348e22ae9a98c033fb6d451') {
            await post.deleteOne();
            res.status(200).json("Post deleted Successfully");
        } else {
            res.status(403).json("Action forbidden");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

//like/dislike a Post

export const likePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await PostModel.findById(postId);

        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } });
            res.status(200).json("Post liked");
        } else {
            await post.updateOne({ $pull: { likes: userId } });
            res.status(200).json("Post Disliked");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};


export const reportPost = async (req, res) => {
    const { userId,postID,reason } = req.body;
    try {
        const post = await PostModel.findById(postID);

     
            await post.updateOne({ $push: { report: {userId:userId,reason:reason }} });
            res.status(200).json("Post reported");
        
    } catch (error) {
        res.status(500).json(error);
    }
};

//save/unsave a Post

export const savePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    try {
        const post = await PostModel.findById(postId);

        if (!post.Save.includes(userId)) {
            await post.updateOne({ $push: { Save: userId } });
            res.status(200).json("Post saved");
        } else {
            await post.updateOne({ $pull: { Save: userId } });
            res.status(200).json("Post unsaved");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

//Get Timeline Posts

export const getTimelinePosts = async (req, res) => {
    const userid = req.params.id;

    if (userid === '633edc548a55e6a086e6c834') {

        try {
            const currentUserPosts = await PostModel.find();

            res.status(200).json(
                currentUserPosts
                    .sort((a, b) => {
                        return b.createdAt - a.createdAt;
                    })
            );
        }


        catch (error) {
            res.status(500).json(error);
        }

    }



    else if (userid === '2244') {

        try {
            const currentUserPosts = await PostModel.find();

            res.status(200).json(
                currentUserPosts
                    .sort((a, b) => {
                        return b.likes.length - a.likes.length;
                    })
            );
        }


        catch (error) {
            res.status(500).json(error);
        }

    }



    else {

        try {
            const currentUserPosts = await PostModel.find({ userId: userid });
            const followingPosts = await userModel.aggregate([
                {
                    $match: {
                        _id: new mongoose.Types.ObjectId(userid),
                    },
                },
                {
                    $lookup: {
                        from: "posts",
                        localField: "following",
                        foreignField: "userId",
                        as: "followingPosts",
                    },
                    
                },
                
                {
                    $project: {
                        followingPosts: 1,
                        _id: 0,
                    },
                },
            ]);

            res.status(200).json(
                currentUserPosts
                    .concat(...followingPosts[0].followingPosts)
                    .sort((a, b) => {
                        return b.createdAt - a.createdAt;
                    })
            );
        } catch (error) {
            res.status(500).json(error);
        }

    }


};


export const getSavedpost = async (req, res) => {
    const userid = req.params.id;

        try {
            const currentUserPosts = await PostModel.find({ Save: userid });
            res.status(200).json(currentUserPosts);
        } catch (error) {
            res.status(500).json(error);
        }

    }




//Get getLikeList  

export const getLikeList = async (req, res) => {
    const postId = req.params.id;

    try {
        // const currentUserPosts = await PostModel.find({ userId: userid });
        const likedList = await PostModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(postId),
                },
            },
            {
                $lookup: {
                    from: "users",
                    localField: "likes",
                    foreignField: "_id",
                    as: "User",

                },
            },
            {
                $project: {
                    User: {
                        _id: 1,
                        username: 1,
                        firstname: 1,
                        followers: 1,
                        following: 1,
                        profilePicture: 1
                    },
                    _id: 0,
                },
            },
        ]);

        res.status(200).json(likedList[0].User);
    } catch (error) {
        res.status(500).json(error);
    }
};
