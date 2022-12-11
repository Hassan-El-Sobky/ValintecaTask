const useremail=localStorage.getItem('useremail');

if(useremail){
    let user=document.querySelector('.userEmail');
    user.innerHTML=useremail
}