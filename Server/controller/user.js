const User=require("../models/User")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


const signUp = async (req, res) => {
    const { email, password, confirmPassword, name } = req.body;

    try {
        // 1. Validation
        if (!email || !password || !confirmPassword || !name) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

        // 2. Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        // 3. Password match check
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        // 4. Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // 5. Create User (Mapping 'name' from frontend to 'userName' in DB)
        const result = await User.create({ 
            email, 
            password: hashedPassword, 
            userName: name 
        });

        // 6. Generate Token
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};

const signIn=async(req,res)=>{
    const{email,password}=req.body
    try{
       const existing_user=await User.findOne({email})
       if(!existing_user) return res.json({msg:"the user doesn't exist"})

       const isPasswordCorrect=await bcrypt.compare(password,existing_user.password)
       if(!isPasswordCorrect) return res.json({msg:"the password is not correct"})


       return res.json({msg:"signed in succesfully",token});
    }
    catch(err){
        return res.json({msg:"server error"});
    }
}


module.exports={
     signUp,
     signIn
     
}








