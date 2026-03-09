document.getElementById("loginForm").addEventListener('submit', (event)=>{
  event.preventDefault()

  let username = document.getElementById("username").value
  let password = document.getElementById("password").value

  const user_name = 'admin';
  const user_password = 'admin123';

  if(username === user_name && password === user_password){
   window.location.href = "index.html";
  }
  else{
    document.getElementById("error-message").style.display = 'block';
    document.getElementById("error-message").style.color = 'red';
  }

})