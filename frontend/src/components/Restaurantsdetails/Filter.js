import React from 'react'

import '../../style/Filter2.css'

import { useState, useEffect } from 'react'

export default function Filter2() {

    const[filter,setfilter]=useState({
        city_id:'',
        cuisine:[],
        lcost:'',
        hcost:'',
        sort:1
    })



    const[locations,setlocations] =useState([])
    const[Restaurants,setRestaurants]=useState([])
    const[pageCount,setPageCount]=useState(0)
    const[currentPageno,setCurrentPageno]=useState(1)




    const requestoption={
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(filter)
    }


    useEffect(()=>{


        fetch(`http://localhost:6767/restaurant/filter/${currentPageno}`,requestoption)
        .then(request=>request.json())
        .then(data=>{
            setRestaurants(data.data);
            setPageCount(data.totalRecords/2)    
        })
            

    },[filter,currentPageno])


    useEffect(()=>{
        fetch('http://localhost:6767/location',{method:'GET'})
        .then(response=>response.json())
        .then(data=> setlocations(data.data))
    },[])






    const handlecuisineChange=(event)=>{
        if(event.target.checked)
        filter.cuisine.push(event.target.name)
        else
        {
            let index=filter.cuisine.indexOf(event.target.name)
            if(index>-1)
            filter.cuisine.splice(index,1)
        }
        setfilter({...filter})

    }

    const handleCostChange=(lcost,hcost)=>{
        filter.lcost=lcost;
        filter.hcost=hcost;
        setfilter({...filter})
    }


    const handleSort=(s)=>{
        filter.sort=s;
        setfilter({...filter})
      }
  

      const paginationItems=[];
      for(let i=1;i<=pageCount;i++){
        paginationItems[i]=<a href='#' key={i} onClick={()=>setCurrentPageno(i)} >{i} </a>
      }
      const dec=()=>{
        if(currentPageno>1)
        setCurrentPageno(currentPageno-1)
        else
        setCurrentPageno(currentPageno==1)
      }

      const inc=()=>{
        if(currentPageno<5)
        setCurrentPageno(currentPageno+1)
        else
        setCurrentPageno(currentPageno==5)
      }


      const handleLocation=(event)=>{
            console.log(event.target.value)
            filter.city_id=(event.target.value)
            setfilter({...filter})




      }

      let locationList = locations.length && locations.map((item)=><option key={item.name} value={item.city_id}>{item.name}</option>)




  return (
    
    <div>

        <div className="logobar">
        
            <div>
                <span id="e">e!</span>
            </div>

            <div>
            <label id="l">Login</label>
            <label id="c">Create an account</label>
            </div>
        </div>

        <div className="heading">
                <span>Breakfast Places in Mumbai</span>
            </div>

            <div className="rectangle">
         <span id="filters">Filters</span>
         <span id="sl">Select Location</span>
         <span>
             <select id="selectl" onChange={(e)=>handleLocation(e)} >
                    <option >Select location</option>
                    {locationList}
             </select>
         </span> 
         <span id="cui">Cuisine</span>   

         <div className="options">
             <input type="checkbox" name="North Indian"  onChange={(e)=>handlecuisineChange(e)} />North Indian </div>

             <div className="options">
                <input type="checkbox" name="South Indian" onChange={(e)=>handlecuisineChange(e)} />South Indian </div>
                
            <div className="options">
                    <input type="checkbox" name="Chinese" onChange={(e)=>handlecuisineChange(e)} />Chinese </div>  

            <div className="options">
                        <input type="checkbox" name="Fast Food" onChange={(e)=>handlecuisineChange(e)}  />Fast Food </div>    
            <div className="options">
                        <input type="checkbox" name="Street Food" onChange={(e)=>handlecuisineChange(e)} />Street Food</div>   
                        
             <span id="cot">Cost For Two</span>    
             
          
             <div className="check">
                <input type="radio" name="cost"  onChange={()=>handleCostChange(1,500)}  />Less than &#8377; 500</div>
            <div className="check">
                <input type="radio" name="cost" onChange={()=>handleCostChange(500,1000)}  />&#8377; 500 to &#8377; 1000</div>
            <div className="check">
                <input type="radio" name="cost" onChange={()=>handleCostChange(1000,1500)}  />&#8377; 1000 to &#8377; 1500</div>
            <div className="check">
                <input type="radio" name="cost" onChange={()=>handleCostChange(1500,2000)}  />&#8377; 1500 to &#8377; 2000</div>
            <div className="check">
                <input type="radio" name="cost"  onChange={()=>handleCostChange(2000,10000)} />&#8377; 2000 +</div>
            <div className="check">
                <input type="radio" name="cost"  onChange={()=>handleCostChange(1,10000)} />All</div>    

           <span id="sort">Sort</span>

           <div className="sor">
            <input type="radio" name="s" checked={filter.sort==1} onChange={()=>handleSort(1)}  />Price low to high</div>
        <div className="sor">
            <input type="radio" name="s" checked={filter.sort==-1} onChange={()=>handleSort(-1)} />Price high to low</div>
    </div>


    <div className="searchresult">
        <div >
            
            {
                Restaurants.length > 0 ? Restaurants.map((item)=>

                    <div className='rec'>
                            
                            <label id="tbcc">{item.name}</label>
                            <label id="f">{item.locality}</label>
                            <label id="s">{item.city_name}</label>
                            <div className="partition"></div>
                            <label id="ccf">CUISINES : {item.Cuisine.length && item.Cuisine.map((item)=> item.name+' ')}</label>
                            <label id="rup">COST FOR TWO : {item.cost} </label>
                            <img className="img1" src={require('../../Assets/breakfast.jpg')} height="140px" width="100px"/>   

                    </div>     


                            ):<div className="noData"> No Data Found</div>

                      
            
                    }


                        <div>
                            <div className="pagination">
                                 <a href="#" onClick={dec} >&laquo;</a>
                                    {paginationItems} 
                                 <a href="#" onClick={inc}>&raquo;</a>
                            </div>
                        </div>
                

                             
            
            

            </div>

        </div>

    </div>
  )
}
