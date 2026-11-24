const jwt=require('jsonwebtoken')
const authMiddleware=async(req,res,next)=>{
    try{
        
       const authHeader=req.headers.authorization
       const token=authHeader && authHeader.startsWith('Bearer') ? authHeader.split(' ')[1] : null

          if (!token || token === 'undefined') {
            return res.status(401).json({
                message: 'Access Denied. Forbidden Access'
            });
        }
     req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();

    }catch(error){
         return res.status(401).json({
            message: error.name === 'TokenExpiredError'
                ? 'Session expired. Please log in again.'
                : 'Invalid token. Please log in again.'
        });
    }
}

module.exports={authMiddleware}