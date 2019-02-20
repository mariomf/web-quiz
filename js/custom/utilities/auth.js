const authOperations = {
    addUsers(userObject) {

        //Get email and pass
        const pass = userObject.password;
        const email = userObject.email;
        const auth = firebase.auth();
        // Sign in
        var user = firebase.auth().currentUser;

        // create user and sign in 

        var promise = auth.createUserWithEmailAndPassword(email, pass);

        /* promise.then(function() {// You are forgetting this reference.
          user.sendEmailVerification().then(function() {
          // Email sent.
            console.log('mail sended!');
            }, function(error) {
          // An error happened.
            });
        }); */
        //console.log(pass, email, auth, promise);
        promise.catch(e => alert(e.message));
        //promise.catch(e => console.log(e.message));
        //console.log(promise);
        //alert("hello! " + userObject.userid + " You have been registered");
        return promise
    },

    sendVerification(){
        var user = firebase.auth().currentUser;

        user.sendEmailVerification().then(function(){
            //Email sent
            window.alert("VerificationSent");
        }).catch(function(error){
            //An error happened.
            window.alert('Error: ' + error.message);
        });

    }
}