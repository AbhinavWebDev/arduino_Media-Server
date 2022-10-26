import UserModel from "../Models/UserModal.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



//get all users


export const getAllUser = async (req, res) => {
    try {
        let users = await UserModel.find();
        users = users.map((user)=>{
            const {password,...otherDetails}=user._doc
            return otherDetails
        })
        res.status(200).json(users)

    } catch (error) {
        res.status(500).json(error)
    }
}




export const getTopUser = async (req, res) => {
    try {
     
        let users = await UserModel.find();
        users = users.map((user)=>{
            const {password,...otherDetails}=user._doc
            return otherDetails
        })
        res.status(200).json(users.sort((a, b) => {
            return b.followers.length - a.followers.length
        }))

    } catch (error) {
        res.status(500).json(error)
    }
}



//get a user

export const getUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id)
        if (user) {
            const { password, ...otherDetails } = user._doc
            res.status(200).json(otherDetails)
        }
        else {
            res.status(404).json('No such  user exists')
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

//update a user

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { _id, currentUserAdminStatus, password } = req.body

    if (id === _id) {
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(password, salt)
            }
            const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true })
            const token = jwt.sign(
                { username: user.username, id: user._id },
                process.env.JWT_KEY, { expiresIn: "1h" }

            )
            res.status(200).json({user,token})
        }
        catch (error) {
            res.status(500).json(error)
        }
    }

    else {
        res.status(403).json('Access Denied! you can only update your own profile')
    }
}

//Delete a user



export const deleteUser = async (req, res) => {
    
    const isAdmin=req.isAdmin
    const id = req.params.id;
    const { _id} = req.body

    if (id === _id || isAdmin) {
        try {

            const user = await UserModel.findByIdAndDelete(id)
            res.status(200).json('User deleted sucessfully')
        }
        catch (error) {
            res.status(500).json(error)
        }
    }

    else {
        res.status(403).json('Access Denied! you can only delete your own profile')
    }
}

//Follow a user

export const followUser = async (req, res) => {
   
    const id = req.params.id

    const { _id } = req.body
    if (_id === id) {
        res.status(403).json("Action forbidden")
    }

    else {
        try {
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(_id)
            if (!followUser.followers.includes(_id)) {
                await followUser.updateOne({ $push: { followers: _id } })
                await followingUser.update({ $push: { following: id } })
                res.status(200).json("User followed!")
            }
            else {
                res.status(403).json("user is Already followed by you")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

//unfollow a user

export const unfollowUser = async (req, res) => {
    const id = req.params.id
    
    const { _id  } = req.body
    if (_id  === id) {
      
        res.status(403).json("Action forbidden")
    }

    else {
        try {

         
            const followUser = await UserModel.findById(id)
            const followingUser = await UserModel.findById(_id )
            if (followUser.followers.includes(_id)) {
                await followUser.updateOne({ $pull: { followers: _id  } })
                await followingUser.update({ $pull: { following: id } })
                res.status(200).json("User unfollowed!")
            }
            else {
                res.status(403).json("user is not followed by you")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}





//Block a user

export const blockUser = async (req, res) => {
    const isAdmin=req.isAdmin
    const id = req.params.id;

    // if (id ===isAdmin) {
        try {

         
            const followUser = await UserModel.findById(id)
           
                await followUser.updateOne({ $set: { block:true  } })
                res.status(200).json("User Blocked!")
            }
            
            
         catch (error) {
            res.status(500).json(error)
        }
    }



//UNBlock a user

export const unBlockUser = async (req, res) => {
   
    const isAdmin=req.isAdmin
    const id = req.params.id;

    
        try {

         
            const followUser = await UserModel.findById(id)
           
                await followUser.updateOne({ $set: { block:false  } })
                res.status(200).json("User Blocked!")
            }
            
            
         catch (error) {
            res.status(500).json(error)
        }
    }



    //Verify a user

export const verifyUser = async (req, res) => {
    const isAdmin=req.isAdmin
    const id = req.params.id;

    // if (id ===isAdmin) {
        try {

         
            const verifyUser = await UserModel.findById(id)
           
                await verifyUser.updateOne({ $set: { verify:true  } })
                res.status(200).json("User Verified!")
            }
            
            
         catch (error) {
            res.status(500).json(error)
        }
    }



//UNVerify a user

export const unVerifyUser = async (req, res) => {
   
    const isAdmin=req.isAdmin
    const id = req.params.id;

    
        try {

         
            const verifyUser = await UserModel.findById(id)
           
                await verifyUser.updateOne({ $set: { verify:false  } })
                res.status(200).json("User Un-Verified!")
            }
            
            
         catch (error) {
            res.status(500).json(error)
        }
    }
    

