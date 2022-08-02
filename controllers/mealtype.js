const mealtype = require('../model/meal')

exports.getallmealtype = (req,res)=>{
    mealtype.find()
    .then(result=>{
        res.status(200).json({
            message:"mealtypes fetched successfully",
            data:result
        })
    })
    .catch(error=>{
        res.status(200).json({
            message:"Db error occured",
            data:error
        })

    })
}