const authOperations = {
    addUsers(userObject) {

        //Get email and pass
        const pass = userObject.password;
        const email = userObject.userid;
        const auth = firebase.auth();
        
        // Sign in
        const promise  = auth.createUserWithEmailAndPassword(email,pass);
        //console.log(pass, email, auth, promise);
        promise.catch(e => alert(e.message));
        //promise.catch(e => console.log(e.message));
        //console.log(promise);
        //alert("hello! " + userObject.userid + " You have been registered");
        return promise
    }
}