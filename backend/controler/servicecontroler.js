const Service= require("../models/service");
exports.addService= async(req,res)=>{
    const { title, img_url, vedio_url ,phone_number,adresse,description} = req.body;
    try {
        const service= new Service({title,img_url,vedio_url,phone_number,adresse,description,userId:req.user.id});
        await service.save()
        res.status(201).send({msg:"service created with success",service})
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
        
    }
}
exports.getAllservice = async(req,res)=>{
    try { const services = await Service.find().populate("userId",["username"]);
    res.status(200).json({msg:"allservice",services})
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
    }
}
exports.deleteservice = async(req,res)=>{
    const{id}=req.params
    try { await Service.findByIdAndDelete(id)
    res.status(200).json("service deleted")
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
    }
}
exports.updateservice = async(req,res)=>{
    const{id}=req.params
    try { const serviceupdate = await Service.findByIdAndUpdate(id,{$set:{...req.body}},{new:true}).populate("userId",["username"])
    res.status(200).json({msg:"service updated",serviceupdate})
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
    }
}
exports.getoneservice = async(req,res)=>{
    const{id}=req.params
    try {const service =  await Service.findById(id).populate("userId",["username"])
    res.status(200).json({msg:"service found",service})
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
    }
}