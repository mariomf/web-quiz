redirect();
window.addEventListener("DOMContentLoaded",init);

function init(){
    s_name();
    document.querySelector("#start_test").addEventListener("click",testRedirect);
}

function redirect(){
    if(!localStorage.userid){
        location.href = "index.html";
        }
}

function s_name(){
    if(localStorage.userid){
        document.querySelector("#username").innerHTML = localStorage.userid;
        }
}

function testRedirect(){
    location.href = "student.html";
}