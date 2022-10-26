import express from "express"
import { createPost, deletePost,getLikeList, getPost, getTimelinePosts, likePost, reportPost, savePost, updatePost } from "../Controllers/PostController.js";
const router =express.Router()

router.post('/',createPost)
router.get('/:id',getPost)
router.put('/:id',updatePost)
router.delete('/:id',deletePost)
router.put('/:id/like',likePost)
router.put('/:id/report',reportPost)
router.put('/:id/save',savePost)
router.delete('/:id/delete',deletePost)
router.get('/:id/timeline',getTimelinePosts)
router.get('/:id/like/user',getLikeList)

    


export default router;