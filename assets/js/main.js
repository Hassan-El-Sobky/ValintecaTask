// Varaibles
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password_confirmation = document.getElementById('password_confirmation');
const apiUrl='https://goldblv.com/api/hiring/tasks/register';
const createBtn= document.getElementById("createBtn");
let flag=false;

// ----------------------------------

// Call Api
const userRegistration = async (data) => {

    const apiCall = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  const response = await apiCall.json();
       return response;
  }

// --------------

//Show input error messages
function showError(input, message) {
    const small = document.getElementById(`${input.name}`);
    small.className = 'error';
    small.innerText = message;
    createBtn.disabled=false;
    flag=false;
}

//Show input API error messages
function showApiError(input, message) {
    let el=document.getElementById(`${input}`);
    const small = document.getElementById(`${el.name}`);
    small.className = 'error';
    small.innerText = message;
    createBtn.disabled=false;
    flag=false;
}


//show success colour
function showSucces(input) {
  
    const small = document.getElementById(`${input.name}`);
    small.innerText='';
    flag=true;
    createBtn.removeAttribute('disabled');
}

//check email is valid
function checkEmail(input) {
   
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
      
    }else {
        showError(input,'Email is not invalid');
     
    }
}


//checkRequired fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input,`${getFieldName(input)} is required`)
            return false;
        } else {
            showSucces(input);
            return true
        }
    });
}


//check input Length
function checkLength(input, min ,max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    }else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    }else {
        showSucces(input);
    }
}

//get FieldName
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// check passwords match
function checkPasswordMatch(input) {
   
    if(JSON.stringify(input.value) !== JSON.stringify(password.value)) {
        showError(password_confirmation, 'Passwords do not match');
        flag=false;
    }else {
        showSucces(input)
    }
}




// //Event Listeners
form.addEventListener('submit',function(e) {

    e.preventDefault();
  
  checkRequired([username, email, password, password_confirmation]);

  
   const data={
      username:username.value,
      email:email.value, 
      password:password.value, 
      password_confirmation:password_confirmation.value
    };
     if(flag){
         userRegistration(data).then(res=>{
                if(res.errors){
                    for(const err in res.errors) {    
                          res.errors[err].map(message=>{
                            showApiError(err,message)
                          })
                    }
                } else {
             localStorage.setItem('useremail',res['email'])
             location.href=`${location.origin}/pages/succeed.html`;
                }
         }).catch(err=>{
            console.log(err);
         })

     };
});


