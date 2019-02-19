const dbOperations = {
    addUsers(userObject) {
        firebase.database().ref('users/' + userObject.userid).set({
            password: userObject.password,
            phoneNo: userObject.phoneNo,
            type: userObject.type,
            userid: userObject.userid
        });
        alert("hello! " + userObject.userid + " You have been registered");
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