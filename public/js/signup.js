
const country=async ()=>{
  const ip=await axios('https://ipapi.co/json/')  
 // let url_info= await axios('http://api.ipstack.com/117.225.105.152?access_key=7bf0fa755ad5c218f978e0659dd21fe2')
 console.log(ip.data) 
 const user_region=ip.data.region;
  const user_country =ip.data.country_name;
  let user=user_region+' , '+user_country;
  document.querySelector('.country').value=user;
}

