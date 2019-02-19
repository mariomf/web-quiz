window.addEventListener("load",init);

var sequence ;
isQuestionshow=false;
isQuestion_addition_show=false;

function init(){
    showhideQuestion();
    bindEvents();
}

function bindEvents(){
   
    document.querySelector("#QuestionWrite").addEventListener("click",questionTest_Showhide);
    document.querySelector("#add").addEventListener("click",addQuestion);
    sequence = autoGen();
    document.querySelector("#search").addEventListener("click",search);
}

function addQuestion(){
    var questionId = sequence.next().value;
    var question = document.querySelector("#question").value;
    var ans=[];
        ans[0]= document.getElementById("ans1").value;
        ans[1]= document.getElementById("ans2").value;
        ans[2]= document.getElementById("ans3").value;
        ans[3]= document.getElementById("ans4").value;
    var correct_ans = document.querySelector("#correct_ans").value;
    var questionObject = new Question(questionId,question,ans,correct_ans);
    dbOperations.addQuestion(questionObject);
}

function search(){
    var questionId = document.querySelector("#questionid").value;
    var pr = dbOperations.getQuestionById(questionId);

    pr.then((data)=>{
        console.log("data is ", data);
        document.querySelector("#q_no").innerHTML = data.id ;
        document.querySelector("#ques_name").innerHTML = data.qname ;
        for(var i=0; i<(data.ans).length;i++){
            document.querySelector("#opt"+i).innerHTML = data.ans[i] ;
        }
        document.querySelector("#c-ans").innerHTML = data.correct_ans ;
        
    });
    pr.catch(err=>{
        alert("error found....", err);
    });
}

function questionView_Showhide(){
    isQuestionshow=isQuestionshow?'false':'true';
    isQuestion_addition_show=false;
    showhideQuestion();
}
function questionTest_Showhide(){
    isQuestion_addition_show=isQuestion_addition_show?'false':'true';
    isQuestionshow=false;
    showhideQuestion();
}

function showhideQuestion(){
    document.querySelector("#view_quesdiv").className=isQuestionshow?'show':'hide';
    document.querySelector("#add_quesdiv").className=isQuestion_addition_show?'show':'hide';
}
