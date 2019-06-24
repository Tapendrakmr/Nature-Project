const url='/api/post'
const html_loc=document.querySelector('.users__posts')

async function Profile(){
   let post =await axios(url)
   const id=window.location.href.split('/')[4];
   console.log(id)
   post=post.data
   post.forEach(cur => {
       if(cur.element.userid===id)
       {
        const html=`<div class="main--post" style="width: 800px;">
        <div class="image">
             <img src="/img/man.png" alt="logo" height="50px" style="margin-left: 35px;margin-top:15px;float:left">
        </div>
        <div class="info">
             <h2 style="padding-top:5px"><a href=/Profile/${cur.element.userid}>${cur.usern}</a></h2>
             <p style="margin-top: -15px; margin-left:5px">Country: ${cur.userCountry}</p>
        </div>
        
        <div class="paragraph">
              <p >${cur.element.postinfo}</p>
  
        </div>
        <div class="image--video">
        <img src="data:image/jpg;base64, " height="200px" width="600px;">
        </div>

         <div class="icons">
             <i class="far fa-thumbs-up"></i>
             <i class="fas fa-map-marked-alt"></i>
         </div>


     </div>`
     html_loc.insertAdjacentHTML('afterbegin',html)         
        }
       console.log('check entries')
   });

}
Profile()