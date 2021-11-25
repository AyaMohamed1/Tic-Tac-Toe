function sign_in_validation(){
    var username = document.getElementById("u-name").value;
    var passwrd = document.getElementById("pass_text1").value;

    if(username != "" && passwrd != ""){
        var localUserName = localStorage.getItem("username");
        var localPassword = localStorage.getItem("password");
        if (localUserName != null && localPassword != null) {
            if(username == localUserName && passwrd == localPassword){
                document.getElementById("invalid").style.display = "none";
                window.location.href = "game.html";
            }else{
                document.getElementById("invalid").innerText = "Invalid Username or Password!";
                document.getElementById("invalid").style.display = "inline";
            }
        }else{
            document.getElementById("invalid").innerText = "Username doesn't exist!";
            document.getElementById("invalid").style.display = "inline";
        }
    }

}