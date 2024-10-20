const form = document.querySelector('#signupform');
const username = document.querySelector('.username');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const btn = document.querySelector('button')


function validateInput(e) {
  e.preventDefault();

  checkInput();
  
  // set info to local storage 
  if (checkInput()) {
    setToStorage();
  }
}


function setToStorage() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  const validateUsername = users.some(user => user.username === username.value);
  
  const validateEmail = users.some(user => user.email === email.value)
  
  let existingInfo = false;
  
  if (validateUsername) {
    alert('Username already exists!');
      existingInfo = true;
  }
  
  if (validateEmail) {
    alert('Email already exists!');
       existingInfo = true;
  }
  
  if (!existingInfo) {
      let newUser = {
        username: username.value,
        email: email.value,
        password: password.value
      };
  
  users.push(newUser);
  
  localStorage.setItem('users', JSON.stringify(users));
  
  
  alert('Sign Up Successful');
  
  form.reset()
 } 
}


 function checkInput() {
  let valid = true;
  
  if (username.value.trim() === '') {
    showError(username, 'Enter a Valid Username');
    valid = false;
  } else {
    showsuccess(username)
  }
  
  if (email.value.trim() === '') {
    showError(email, 'Enter a valid email address');
    valid = false;
  } else {
    showsuccess(email)
  }
  
  if (password.value.trim() === '') {
    showError(password, 'Enter Password');
    valid = false;
  } else {
    showsuccess(password)
  }
  
  return valid;
}


function showError(input, message){
  const formControl = input.parentElement;
  const span = formControl.querySelector('span');
  
  span.textContent = message;
  
  span.classList.add('show');
}

function showsuccess(input){
  const formControl = input.parentElement;
  const span = formControl.querySelector('span');
  
  span.classList.remove('show');
}

form.addEventListener('submit', validateInput);