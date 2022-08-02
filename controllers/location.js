const Locations = require('../model/location')
const fs = require('fs')

exports.getAllLocations=(req,res)=>{
    Locations.find()
    .then(result=>{
            res.status(200).json({
                message:"locations fetched successfully",
                data:result
            })

        }
    )
    .catch(error=>{
            res.status(500).json({
                message:"DB error occured",
                error:error
            })

        }
    )

}