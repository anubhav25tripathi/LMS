import { Webhook } from "svix";
import User from "../models/User.js";
export const clerkWebhook = async (req, res) => {
     try {
        const whook= new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });
        const {data,type} = req.body;
        switch (type) {
            case "user.created":{
                const { id, name, email_addresses, imageUrl } = data;
                const user = new User({
                    _id: id,
                    name: name,
                    email: email_addresses[0].email_address,
                    imageUrl: profile_image_url,
                })
                await user.save();
                res.status(200).json({ message: "User created successfully" });
                break;
            }
            case "user.updated":{
                const userData={
                    email: data.email_addresses[0].email_address,
                    name: data.name,
                    imageUrl: data.profile_image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }
            case "user.deleted":{
                await User.findByIdAndDelete(data.id);
                res.json({ message: "User deleted successfully" });
                break;
            } 
            default:
                //res.status(400).json({ message: "Unhandled event type" });
                break;
        }
        
     } catch (error) {
         res.json({success:false, message: error.message});
     }

}