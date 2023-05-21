const Com= require("../models/commantaire");


exports.addCommantaire= async(req,res)=>{
    try {
        const com= new Com({...req.body,userId:req.user.id});
        await com.save()
        res.status(201).send({msg:"commantaire created with success",com})
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
        
    }
}
exports.getAll_commantaire = async(req,res)=>{
    try { const coms = await Com.find().populate("userId",["username"])
    res.status(200).json({msg:"allcommantaire",coms})
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
    }
}
exports.delete_com = async(req,res)=>{
    const{id}=req.params
    try { await Com.findByIdAndDelete(id)
    res.status(200).json("commontaire deleted")
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
    }
}
exports.update_com = async(req,res)=>{
    const{id}=req.params
    try { const com_update = await Com.findByIdAndUpdate(id,{$set:{...req.body}},{new:true}).populate("userId",["username"])
    res.status(200).json({msg:"commontaire updated",com_update})
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
    }
}
exports.getone_com = async(req,res)=>{
    const{id}=req.params
    try {const com =  await Com.findById(id).populate("userId",["username"])
    res.status(200).json({msg:"commontaire found",com})
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
    }
}