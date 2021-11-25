var pass1 = document.getElementById("pass_text1");
var pass2 = document.getElementById("pass_text2");

function password_validation() {
  if (pass1.value !== pass2.value) {
    document.getElementById("pwdError").innerText = "Passwords should match";
    document.getElementById("pwdError").style.display = "inline";
  } 
  else {
    document.getElementById("pwdError").style.display = "none";
  }
}

function set_local_storage(e) {
  var userName = document.getElementById("u-name").value;
  var userEmail = document.getElementById("u-email").value;
  // key user  value 
  if(userName != "" && userEmail != "" && pass1.value != "" && pass2.value != ""){
    if (pass1.value !== pass2.value) {
      e.preventDefault();
      document.getElementById("pwdError").innerText = "Passwords should match";
      document.getElementById("pwdError").style.display = "inline";
    }
    else{
      alert("nooooooooooooooo");
      localStorage.setItem("username", userName);
      localStorage.setItem("password", pass1.value);
      document.getElementById("form-id").action="index.html";
    }
    
  } 
}
