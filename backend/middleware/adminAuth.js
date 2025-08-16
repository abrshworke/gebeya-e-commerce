import jwt from "jsonwebtoken";

const adminAuth = async (req , res , next) => {

    try {

        const {token} = req.headers;

        if (!token ) {
            return res.json({success: false , message: "you are not autherized user"});

        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (decoded.email !== process.env.Admin_Email ||decoded.role !== "admin") {
                return res.json({
                    success: false,
                    message: "you are not autherized user to access this panal"
            });
     }
        
        next();
        
    } catch (error) {
        console.log(error);
        
        res.json({success: false , message: error.message})
    }
}


export default adminAuth;