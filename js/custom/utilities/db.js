const dbOperations = {
    addUsers(userObject) {
        /*var aux = String(userObject.userid);
        aux = aux.charAt(0)+aux.charAt(1)+aux.charAt(2);*/
        var userRef = firebase.database().ref('users/' + userObject.userid);

        userRef.on('value', (snapshot) => {
            var userObject1 = snapshot.val();
            //console.log("userobject is ", userObject1);
            if(userObject1==null){
                userRef.set({
                    password: userObject.password,
                    phoneNo: userObject.phoneNo,
                    type: userObject.type,
                    userid: userObject.userid,
                    attempts: userObject.attempts
                });
                //alert("hello! " + userObject.userid + " You have been registered");
               // break;
            }else{
                if(userObject1.attempts!="0"){
                    alert("elige otro User id!");
                }
            }
            userObject = userObject1;
        }); 
        return userObject;
    },
    getAlluser(userid) {
        var pr = new Promise((resolve, reject) => {
            var userRef = firebase.database().ref('users/' + userid);
            userRef.on('value', (snapshot) => {
                var userObject = snapshot.val();
                console.log("userobject is ", userObject);
                resolve(userObject);
            });
        });
        return pr;
    },
    addQuestion(questionObject) {
        firebase.database().ref('questions/' + questionObject.id).set(questionObject);
        console.log("Question Added...");
        window.alert("Question Added...");
    },
    getQuestionById(id) {
        var pr = new Promise((resolve, reject) => {
            var questionRef = firebase.database().ref('questions/' + id);
            questionRef.on('value', (snapShot) => {
                var questionObject = snapShot.val();
                resolve(questionObject);
                console.log("QuestionObject is ", questionObject);
            });
        });
        return pr;
    },
    getTestQuestion() {
        var pr = new Promise((resolve, reject) => {
            var users =
                firebase.database().ref('questions');
            users.on('value', function (snapshot) {
                var studentObj = snapshot.val();
                console.log("fetch _____ ", studentObj);
                // console.log("Type of ",studentObj);
                // for(let key in studentObj){
                // console.log(key, " ", studentObj[key]);
                // }
                resolve(studentObj);
            });
        });
        return pr;
    }
}