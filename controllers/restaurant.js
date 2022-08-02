// const restaurant = require('../model/restaurant.json')
const Restaurants = require('../model/restaurant')
// const fs  = require('fs')


// functionality
exports.getAllRestaurant=(req,res)=>{
    Restaurants.find()
    .then(result=>{
            res.status(200).json({
                message:"restaurant fetched successfully",
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



exports.getRestaurantBycity=(req,res)=>{
   
    let criteria = {city:req.params.cName}
   
    Restaurants.find(criteria).then(result=>{
        res.status(200).json({
            message:"filtered successfully",
            data:result
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:"error occured",
            error:error
        })
    })


}


exports.getRestaurantDetails = (req,res)=>{

    let filter={}


    if(req.params.name){
        filter.name = req.params.name
    }


    Restaurants.findOne(filter)
    .then(result=>{
        res.status(200).json({
            message:"restaurant fetched successfully",
            data:result
        })

    })
    .catch(error=>{
        res.status(500).json({
            message:"db error occured",
            error:error
        })
    })

}


exports.getAllRestaurantsByFilter=(req,res)=>{
 
      let filter = {}

      if(req.body.city_id){
         filter.city= req.body.city_id;
       }

      if(req.body.cuisine && req.body.cuisine.length>0 ){
        filter['Cuisine.name']={ $in : req.body.cuisine }
       }
     
       console.log("lcost:",req.body.lcost=='')
       console.log("hcost:",req.body.hcost)

         if( req.body.lcost!='' &&  req.body.lcost==0){
             filter.cost ={
                 $lte :req.body.hcost
             }
         }else
         if(req.body.lcost && req.body.hcost)
         {
            filter.cost= {
                $lt: req.body.hcost,
                $gt: req.body.lcost
            } 
         }
     


     let sort=1;

    if(req.body.sort){
        sort=req.body.sort
    }


     console.log("filter:",filter)
    //logic of pagination achieved through limit and skip 
    Restaurants.find(filter).limit(2).skip(2*(req.params.pageNo-1)).sort({"cost":sort})
    .then(
        result=>{
            Restaurants.find(filter).count((err,count)=>{

                if(err)
                console.log(err)
                else{
                    res.status(200).json({ 
                        message:"data fetched successfully" ,
                        data:result,
                        totalRecords:count })
                    }


            })
            
        }
    ).catch(error=>{
            res.status(500).json({ message:"Error in database" , error:error })
    })
 
    
}











// to add restaurant
exports.getRestaurant=(req,res)=>{
    restaurant.push(req.body)
    // fs.writeFile('C:\Users\Aashish Sharma\Documents\INTERSHIP EDUREKA 2022\NODE JS - EXPRESS - Router - MVC\model\restaurant.json',JSON.stringify(restaurant),(err)=>{
        // if(err)
        //   console.log('error')
        // console.log("file updated");
    // })
    res.status(200).json({
        message:"restaurant addedd successfull",
        data:restaurant
    })


}


// to update restaurant

  exports.updateRestaurant = (req,res)=>{
     const index = restaurant.findIndex((item)=>item.name==req.body.name)
     restaurant[index].city=req.body.city;

     res.status(200).json({
         message:"restaurant updated successfull",
         data:restaurant
    })
 }

//  to deleted restaurant

exports.deleteRestaurant = (req,res)=>{
    const index = restaurant.findIndex((item)=>item.id == req.params.id)
    restaurant.splice(index,1);
    res.status(200).json({
        message:"restaurant delete successfull",
        data:restaurant
   })
}