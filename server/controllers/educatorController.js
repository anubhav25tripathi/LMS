import {clerkClient} from '@clerk/express';

export const updateRollToEducator= async (req,res)=>{
    try{
        const userId= req.auth.userId
        await clerkClient.users.updateUser(userId, {
            publicMetadata: {
                role: 'educator',
            }
        });
        res.status(200).json({message: "you can publish your courses now"});
    }
    catch(error){
        res.status(500).json({success: false, message: error.message});
    }
}