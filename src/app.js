const path=require('path')
const express=require('express')
const session = require('express-session');
const hbs =require('hbs')
const multer=require('multer')
const sharp=require('sharp')
const btoa = require('btoa')
const bodyParser = require('body-parser')
const Account=require('./models/account')
const UserPost=require('./models/userpost')
require('./db/mongoose')
const  app=express()
const {sendWelcomeEmail}=require('./email/mail')
const {confirmationotp,ConfirmSignin}=require('./middleware/auth')

const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({secret: 'kakkuisgadha',saveUninitialized: true,resave: true}));
app.use(bodyParser.json())


app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


const upload =multer({
    limits:{
        fileSize:10000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
        {
            return cb(new Error('Please upload a jpg'))
        }
        cb(undefined,true)
    }
})


//to show the page
app.get('/',(req,res)=>{
    res.render('Signup')
})

//fetch data and store in database
app.post('/',upload.single('UserImage'),async (req,res)=>{
    const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
    const UserImage=buffer;
    const userinfo={
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        country:req.body.country,
        image:UserImage
    }
    const account=new Account(userinfo)
    try{
       await account.save()
      const otp=sendWelcomeEmail(account.email,account.username)
       account.otptemp=otp
       console.log("otp in account"+account.otptemp)
      await account.save()
       res.redirect('/Signupconfirm')
       console.log('Successfull')
    }catch(e){
        res.status(404).send(e)
        console.log('Error'+e)
    }
    console.log(req.body)
})


//to show page
app.get('/Signupconfirm',(req,res)=>{
    res.render('Signupconfirm')
})

//confirm the account
app.post('/Signupconfirm',async (req,res)=>{
    const email=req.body.email;
    const otp=Number(req.body.otp);
    console.log('Email :'+email +"otp:"+otp)
    const result=await confirmationotp(email,otp)
    console.log(result)
    res.redirect('/Signin')
    
})



//to show page
app.get('/Signin',(req,res)=>{
    res.render('Signin')
})

app.post('/Signin',async (req,res)=>{
    const email=req.body.email;
    const password=req.body.password;
    console.log('Email :'+email +'password :'+password)
    const check =await ConfirmSignin(email,password)
    if(check===1)
    {   req.session.email=email;
        res.redirect('/Main')
    }
    else{
        console.log('Check your entrie')
    }
    

})

//Main page detail 
app.get('/Main',async(req,res)=>{
    const email=req.session.email
    const user=await Account.find({email})
    const userImage =await user[0].image

    let image = new Uint8Array(userImage)
    
    const base = btoa(new Uint8Array(image).reduce(function (data, byte) {
        return data + String.fromCharCode(byte)
    },''))
    if(email)
    {
        res.render('Main',{
            name :email,
            userImage: base     
        })   
    }
})

app.post('/Main',upload.single('Image'),async(req,res)=>{
 const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer();
 const image=buffer;
 const userid=req.session.email
 const posttype='Image';
 const postinfo=req.body.PostInfo;
 const userpost=new UserPost({
     userid,
     postinfo,
     image,
     posttype
 })
 if( await userpost.save())
 {
     res.redirect('/Main')
 }
})

// For Profile Page
app.get('/Profile/me',async (req,res) => {
    if(!req.session.email) {
        return res.redirect('/Signin')
    }
    const email = req.session.email
    const User = await Account.find({email})  // For Getting User Data
    const Posts = await UserPost.find({userid:req.session.email})
    console.log(User)
    res.render('Profile',{
        username: User[0].username,
        email: User[0].email,
        country: User[0].country,
        posts: Posts.length

    })
})

app.get('/Profile/:id',async (req,res)=>{
    if(!req.session.email)
    {
        return res.redirect('/Signin')
    }
    const email=req.params.id;
    const userinfo=await Account.find({email})
    const Posts = await UserPost.find({userid:email})
   res.render('Profile',{
       username:userinfo[0].username,
       email:userinfo[0].email,
       country:userinfo[0].country,
       posts: Posts.length
   })
})


app.post('/logout',async (req,res) => {
    req.session.destroy()
    res.redirect('/Signin')
})



app.get('/api/post',async (req,res)=>{
  try{
         const post =await UserPost.find()
        const promise=post.map(async element=>{
         const email =await element.userid
         const user=await Account.find({email})
         

         const usern=user[0].username;
         const userImage = user[0].image
       
        const userCountry = user[0].country        // Kaku
       // console.log(userCountry)
         return{
             usern,
             userCountry,       // Kakku
             userImage,
             element
         }
     })

     const fresult =await Promise.all(promise)
     res.send(fresult)
    }
  catch(e){
     console.log('unable to post fetch :'+e)
  }
});


app.listen(3000,()=>{
    console.log('server is up on port 3000')
})