import UserModel from "../Models/UserModal.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import twilio from 'twilio'

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const serviceSid = process.env.TWILIO_SERVICE_SID;
// const client = twilio('AC59d5f04d351ff8916e6ede90bd445557', '838ba78f85bc76c441a5c63c6c991cdc',{
//     lazyLoading:true
// })


//Send OTP TO User

// export const registerUser = async (req, res) => {
// const userData=req.body;
// const {number,username}=req.body;

// try {

//             const oldUsername=await UserModel.findOne({username})
//             const oldNumber=await UserModel.findOne({number})
    
//             if(oldUsername)
//             {
//                 return res.status(400).json({message:'username is already registered'})
//             }
//             else if(oldNumber)
//             {
//                 return res.status(400).json({message:'user number is already registered'})
//             }
//             const otpResponse = await client.verify
//                 .services('VA51d2797b41d3d20afcc65917e2e09db6')
//                 .verifications.create({
//                     to:`+91${number}`,
//                     channel:'sms'
//                 });
//                 res.status(200).json({userData});
//         } catch (error) {
//             res.status(500).json({ message: error.message })
    
//         }
//     }


// export const otpVerify = async (req, res) => {
//     const {otp,data}=req.body;
//     console.log('body',req.body);
//     const salt = await bcrypt.genSalt(10)
//     const hashedPass = await bcrypt.hash(req.body.password, salt)
//     req.body.password=hashedPass


//     const newUser = new UserModel(req.body )
    
//     try {

        
//         const verifiedResponse = await client.verify
//         .services('VA51d2797b41d3d20afcc65917e2e09db6')
//         .verificationChecks.create({
//             to:`+91${data.number}`,
//             channel:'sms',
//             code:otp,
//         });
//         res.status(200).send(`OTP Verified sucessfully!:${JSON.stringify(verifiedResponse)}`);
//        console.log('here respones',verifiedResponse);

//        console.log('ready to save');
//        const user=await newUser.save();
//        const token = jwt.sign({
//            username:user.username,id:user._id
//        },process.env.JWT_KEY,{expiresIn:"1h"})
//        res.status(200).json({user,token})
    
        
//     } catch (error) {
//         res.status(error?.status||'something went wrong!');
        
//     }
    
    
//     }


// Registering a new User

export const registerUser = async (req, res) => {
   
    console.log('goin to save',req.body);

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    req.body.password=hashedPass


    const newUser = new UserModel(req.body )

    try {

        console.log('ready to save');
        const user=await newUser.save();
        const token = jwt.sign({
            username:user.username,id:user._id
        },process.env.JWT_KEY,{expiresIn:"1h"})
        res.status(200).json({user,token})
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

//login User

export const loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await UserModel.findOne({ username: username })

        if (user) {
            const validity = await bcrypt.compare(password, user.password)
            if(!validity){
                res.status (400).json('Wrong Password')
            }
            else{
                const token = jwt.sign({
                    username:user.username,id:user._id,isAdmin:user.isAdmin
                },process.env.JWT_KEY,{expiresIn:"5h"})
                res.status(200).json({user,token})
            }
        }
        else{
            res.status(404).json('user does not exists') 
        }
    } catch (error) {

    }
}

