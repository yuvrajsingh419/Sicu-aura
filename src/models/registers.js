const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')

const SicuSchema = new mongoose.Schema({
    hospitalName:{
        type:String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    city:{
        type:String,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    pincode:{
        type: Number,
        require:true
    },
    regDate:{
        type:Date,
        require:true
    },
    ambulanceCount:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phoneNumber:{
        type:Number,
        require:true,
        unique:true
    },
    regNumber:{
        type:Number,
        require:true,
        unique:true
    },
    emergencyWardNumber:{
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    confirmPassword:{
        type:String,
        require:true
    }
})

SicuSchema.pre("save",async function(next){
    if(this.isModified("password")){
    // console.log(`your current password is ${this.password}`)
    this.password=await bcrypt.hash(this.password,10)
    //console.log(`your current password is ${this.password}`)

    this.confirmPassword=undefined
    }
    next()
})


const Register = new mongoose.model("Register",SicuSchema)
module.exports=Register