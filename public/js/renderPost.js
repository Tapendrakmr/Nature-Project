const url='/api/post'
const html_loc=document.querySelector('.main--post')
var check;
async function renderPost(){
    let post=await axios(url);
    post=post.data
    var image = post[0].element.image
    check = image
    post.forEach(cur => {
        const html=`<div class="main--post">
        <div class="image">
             <img src="img/man.png" alt="logo" height="50px" style="margin-left: 35px;margin-top:15px;float:left">
        </div>
        <div class="info">
             <h2 style="padding-top:5px"><a href=/Profile/${cur.element.userid}>${cur.usern}</a></h2>
             <p style="margin-top: -15px; margin-left:5px">Country: ${cur.userCountry}</p>
        </div>
        
        <div class="paragraph">
              <p >${cur.element.postinfo}</p>
  
        </div>
        <div class="image--video">
        <img src="data:image/jpg;base64, ${image}" height="200px" width="600px;">
        </div>

         <div class="icons">
             <i class="far fa-thumbs-up"></i>
             <i class="fas fa-map-marked-alt"></i>
         </div>


     </div>`
     html_loc.insertAdjacentHTML('afterbegin',html)
    });   
}    

renderPost()