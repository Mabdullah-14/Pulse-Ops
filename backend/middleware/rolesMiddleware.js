// const authorizeRoles=(...allowedRoles)=>{
//     return (req,res,next)=>{
//         const userRole=req.tenant?.role.toLowerCase()
//         if(!userRole || !allowedRoles.includes(userRole)){
//             return res.status(403).json({
//                 success:false,
//                 message:'Access denied; Only allowed roles can perform this action'
//             })
//         }
//         next()
//     }
// }

// module.exports={
//     authorizeRoles
// }