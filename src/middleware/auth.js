const account=require('../models/account')

const confirmationotp=async (email,otp)=>{

    const user=await account.findOne({email});
    if(user.otptemp===otp)
    {
        user.confirmation=true;
        user.otpconfirm=otp
        await user.save()
        return 'Account created Successfully'
    }
    return 'check your otp'

}

const ConfirmSignin=async (email,password)=>{
    const user =await account.findOne({email});
   if(user.email===email && user.password===password && user.confirmation===true)
   {
       return 1
   }
   else
      return 0
}




module.exports={
    confirmationotp,
    ConfirmSignin
}