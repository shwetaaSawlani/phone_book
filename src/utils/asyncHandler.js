
// const asyncHandler = (funct)=>async()=>{}

// const asyncHandler= (func)=> async (req, res, next)=>{
//     try{
//         await func(req, res, next)

//     }catch(error){
//         res.status(error.code|| 500).json({
//             success: false,
//             message:error.message
//         })

//     }
// }

export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
};
