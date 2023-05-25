const User = require("../models/user");


exports.getAlluser = async(req,res)=>{
    try { const users = await User.find()
    res.status(200).json({msg:"alluseres",users})
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
    }
}

exports.deleteuser = async(req,res)=>{
    const{id}=req.params
    try { await User.findByIdAndDelete(id)
    res.status(200).json("user deleted")
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
    }
}
exports.updateuser = async(req,res)=>{
    const{id}=req.params
    try { const userupdate = await User.findByIdAndUpdate(id,{$set:{...req.body}},{new:true})
    res.status(200).json({msg:"user updated",userupdate})
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
    }
}
exports.getoneuser = async(req,res)=>{
    const{id}=req.params
    try {const user =  await User.findById(id)
    res.status(200).json({msg:"user found",user})
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
    }
}
exports.updateprofileimg= async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{$set: {imgUrl:req.file.filename}})
        res.send("img uploaded with success")
        
    } catch (error) {
        res.status(500).send({msg:"server error"})
    }
}