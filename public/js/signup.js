;
function country()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
}
function showPosition(position) {
   const lat=position.coords.latitude;
   const long=position.coords.longitude;
   
   const url='https://api.darksky.net/forecast/1a533605b456afbc85ed992897d017ab/'+lat+','+long+'?';
   console.log(url)
  
//    request({url,json:true},(error,{ body})=>{
//        if(error)
//        {
//            callback('Unable to connect',undefined);
//        }
//        else if(body.error){
//             callback('Sorry,No data availabel',undefined)
//        }
//        else{
            
//           console.log(body)
//        }
//    })
  }