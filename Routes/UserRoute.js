import  express  from "express";
import { blockUser,getUserList, deleteUser, followUser, getAllUser, getTopUser, getUser,unBlockUser,unfollowUser,unVerifyUser,updateUser, verifyUser, getFollowingList } from "../Controllers/UserController.js";
const router =express.Router();

router.get('/',getAllUser)
router.get('/top',getTopUser)
router.get('/:id',getUser)
router.get('/:id/followingList',getFollowingList)
router.get('/:id/list',getUserList)
router.put('/',updateUser)
router.delete('/:id',deleteUser)
router.put('/:id/follow',followUser)
router.put('/:id/unfollow',unfollowUser)
router.put('/:id/block',blockUser)
router.put('/:id/unBlock',unBlockUser)
router.put('/:id/verify',verifyUser)
router.put('/:id/unverify',unVerifyUser)





export default router