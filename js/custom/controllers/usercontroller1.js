window.addEventListener("load",init);

isLoginshow=false;
isRegistershow=false;

function init(){
    // doAjax();
    bindEvents();
    clearLocal();
}

const clearLocal=()=>localStorage.clear();

function bindEvents(){
   
    //document.querySelector("#register_btn").addEventListener("click",addUser);
    document.querySelector("#login_btn").addEventListener("click",doLogin);
    //document.querySelector("#login_btn").addEventListener("click",doVerif);
}

function addUser(){
    var type;
    var email_reg = document.querySelector("#email_reg").value;
    var userid_reg = document.querySelector("#userid_reg").value;
    var password_reg = document.querySelector("#password_reg").value;
    var phone_no = document.querySelector("#phone_no").value;

    if(document.querySelector("#teacher").checked){
        type = "teacher";
        var userObject = new UserRegister(email_reg,userid_reg,password_reg,phone_no,type);
        dbOperations.addUsers(userObject);
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if(firebaseUser){
                console.log(firebaseUser);
                typecheck(userObject);
            }else{
                console.log('not logged in');
            }
        });
        // location.href = "question.html" ;
    }
    else{
        type = "student";
        var userObject = new UserRegister(email_reg,userid_reg,password_reg,phone_no,type,'0');
        var dbUserSucces = dbOperations.addUsers(userObject);
        console.log(dbUserSucces);
        if(dbUserSucces.attempts == 0){
            console.log("entro!!!");
            const promise = authOperations.addUsers(userObject);
            firebase.auth().onAuthStateChanged(firebaseUser => {
                if(firebaseUser){
                    if(promise.a == 2){
                        authOperations.sendVerification();
                        //typecheck(userObject);
                    }
                    if(null!=promise.i.user.emailVerified){
                        typecheck(userObject);
                    }
                    
                    //console.log(promise.a);
                }else{
                    console.log('not logged in');
                }
                console.log(promise.i.user.emailVerified);
            });
        }
        // location.href  = "welcome.html";
    }
   
}

function typecheck(data){
    if(data.type == "teacher"){
        localStorage.userid = data.userid;
        console.log("redirecting to question.html")
        location.href  ="question.html";
    }
    else{
        localStorage.userid = data.userid;
        console.log("redirecting to question.html")
        location.href = "welcome_1.html";
    }
}

function doVerif(){

    var user = firebase.auth().currentUser;

    console.log(user.emailVerified);
    if(true==user.emailVerified){
        location.href = "welcome.html";
    }
}

function doLogin(){
    var userid = document.querySelector("#userid_txt").value;
    var password = document.querySelector("#password_txt").value;
    //var pr =  dbOperations.getAlluser(userid);
   
    const auth = firebase.auth();
    console.log(userid,password);
    //Sign in 
    const promise = auth.signInWithEmailAndPassword(userid,password);
    promise.catch(e => console.log(e.message));
    console.log(promise.i.user.emailVerified);
    
    /*pr.then((data)=>{
        // alert("user id is "+data.userid);
        if(data == null){
            document.querySelector("#message").innerHTML = "Invalid Userid";
        }
        else if(data.userid == userid && data.password == password){
                typecheck(data);
        }
        else{
            document.querySelector("#message").innerHTML = "Invalid Password";
        }
    });*/
    /*pr.catch(err=>{
        alert("error found....", err);
    });*/
    
}

// function login_Showhide(){
//     isLoginshow=isLoginshow?'false':'true';
//     isRegistershow=false;
//     showhide();
// }
// function register_Showhide(){
//     isRegistershow=isRegistershow?'false':'true';
//     isLoginshow=false;
//     showhide();
// }

// function showhide(){
//     document.querySelector("#login_div").className=isLoginshow?'show':'hide';
//     document.querySelector("#register_div").className=isRegistershow?'show':'hide';
// }
