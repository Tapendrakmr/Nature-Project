
const sendmail = require('sendmail')();
 

const sendWelcomeEmail=(email,name)=>
{
  const otp=Math.floor(Math.random()*1000000);

sendmail({
    from: 'tapendraxtra72@gmail.com',
    to: email,
    subject: 'Thanks for joining in!', 
    html: `Welcome to the app,${name}. Please enter your otp .
    Here is your OTP   <center><h1> ${otp} </h1> <center>`,
     }, function(err, reply)
       {
       console.log(err && err.stack);
        console.dir(reply);
     }
     );  
   return otp;
}


module.exports={
    sendWelcomeEmail
}