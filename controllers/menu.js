
const menu = require('../model/menu')

exports.getallmenu = (req,res)=>{
    let filter={
        restaurantName:req.params.rName
    }
    menu.find(filter)
    .then(result=>{
        res.status(200).json({
            message:"menu fetched successfully",
            data:result
        })

    })
    .catch(error=>{
        res.status(500).json({
            message:"DB error occured",
            error:error
        })

    })
}

