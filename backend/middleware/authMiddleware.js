import jwt from "jsonwebtoken";
export const authentication =(req,res,next) =>{
    const token = req?.cookies.token;
    if (!token) {
        return res.status(401).json({ error: true, message: "re-Login no token found", redirect: '/login' });
    }
    jwt.verify(token, `abcdefghijklmnopqrstuvwxys`, (err,decoded)=>{
        if (err) {
            console.log("error at authenticaton")
            return res.status(401).json({ error: true, message: "invalid token", redirect: '/' });
            
        }
        req.user = {...decoded};
        next();
    })


}