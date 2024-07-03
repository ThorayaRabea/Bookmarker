var BookName=document.getElementById('BookName')
var WebName=document.getElementById('WebName')
var bbtn=document.getElementById('bbtn')
var arrayOfBook=[];
var tableBody=document.getElementById('tabeBody')
var HeaderOfAlert=document.getElementById('header')
var AlertMessage=document.getElementById('AlertMessage')
var exit=document.getElementById('exit')

if(localStorage.getItem('bookmarker')!=null){
    arrayOfBook=JSON.parse(localStorage.getItem('bookmarker'))
    Display();
}

function AlertFun(){
    AlertMessage.classList.replace('d-none','d-flex')
}

AlertMessage.addEventListener('click',function(e){
    e.stopPropagation();
    AlertMessage.classList.replace('d-flex','d-none')
})

exit.addEventListener('click',function(e){
    e.stopPropagation();
   AlertMessage.classList.replace('d-flex','d-none')
})

function NoRepeat(){
    if(arrayOfBook.length==0){
        Testvalidation();
    }else{
        for(var i=0;i<arrayOfBook.length;i++)
            {
                if(arrayOfBook[i].Bname!=BookName.value)
                {
                   Testvalidation();
                }else{
                    alert('this bookmarker is already existing')
                }
            }
    }
    
}
function Creatbookmarker(){
    var Book={
        Bname:BookName.value,
        Wname:WebName.value
       }

    arrayOfBook.push(Book);
    localStorage.setItem('bookmarker',JSON.stringify(arrayOfBook))
    Display();

}

function Testvalidation(){
    var urlCheck=/^[h][t]{2}[p][s][:][w]{3}[.][a-z]{2,}[.](com)$/
    var nameCheck=/^[A-Za-z]{3,}$/ 
    if(urlCheck.test(WebName.value)&&nameCheck.test(BookName.value)){
         Creatbookmarker()
    }else{
        AlertFun()
    }
    
}

function Display(){
   var Raws=``;
   for(var i=0;i<arrayOfBook.length;i++){
    Raws+=`
    <tr>
    <td class="">${i+1}</td>
    <td>${arrayOfBook[i].Bname}</td>
    <td><a href="${arrayOfBook[i].Wname}"><button class="btn btn-success" id='visit'><i class="fa-solid fa-eye"></i>&nbsp;Visit</button></a></td>
    <td><button class="btn btn-danger" onclick="Delete(${i})"><i class="fa-solid fa-trash"></i>&nbsp;Delete</button></td>
    </tr>
    `
   }
   tableBody.innerHTML=Raws
}

bbtn.addEventListener('click',function(){
    if(BookName.value==''&&WebName.value==''){
        AlertFun()
    }else{
        NoRepeat();
        Clear();
    }
   
})


function Delete(index){
   arrayOfBook.splice(index,1)
   localStorage.setItem('bookmarker',JSON.stringify(arrayOfBook))
   Display();
}

function Clear(){
    BookName.value='';
   WebName.value='';
}



