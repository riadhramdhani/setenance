const multer=require("multer")
const path=require("path")


const storage= multer.diskStorage({
    destination: "../frontend/public/uploads",
    filename:(req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now()+ path.extname(file.originalname))

    }
})

const upload = multer({
    storage:storage,
    fileFilter: (req,file,cb)=>{
        const filetypes= /jpg|jpeg|png|svg|gif/i
        const isvalidtype= filetypes.test("png",file.namestypes)
        if(isvalidtype){
            cb(null,true)
        }
        else{cb(null,false)}
    }
})
module.exports = upload