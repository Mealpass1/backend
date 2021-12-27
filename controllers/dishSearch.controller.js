const {dishSearch} = require('../services/searchDish.service');

module.exports.dishSearchController = async(req,res)=>{
    const search_results = await dishSearch(req.body);
    if(search_results){
        return res.status(200).json({
            message:"results: ",
            data: search_results
        })
    }
    return res.status(404).json({
        message:"data not found",
        data: null
    })
}