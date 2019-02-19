window.addEventListener("load",init);

var index = 0;
var studentQuestions = []

function init(){
    printQuestion();
    document.querySelector('#next').addEventListener('click',nextBtnEvent);
    document.querySelector('#prev').addEventListener('click',prevBtnEvent);
    document.querySelector('#finish').addEventListener('click',finishBtnEvent);
    timer(180,1000,'time',finishBtnEvent);

    if(timer == 0){
        updateOption(studentQuestions[index]);
        calcResult();
    }
}

function printQuestion(){
    var pr = dbOperations.getTestQuestion();
    pr.then((data)=>{
        console.log("data is",data);
        // document.querySelector("#question").innerHTML = data.qname;
        var tempindex = 1;
        for(key in data){
            covert2Question(data[key]);
            document.querySelector('#status').appendChild(createDiv(tempindex));
            tempindex++;
        }
        console.log('Student QUestions is',studentQuestions);
        print(index);
    });
    pr.catch(err=> console.log("error is", err));

}

function print(){
    console.log('Index is',index);

    if(index == 0){
        // index=studentQuestions.length-1;
        document.querySelector('#prev').disabled = true;
    }
    else if(index == studentQuestions.length-1){
        document.querySelector('#next').disabled = true;
    }
    else{
        document.querySelector('#next').disabled = false;
        document.querySelector('#prev').disabled = false;
    }

    console.log('Inside Print..');
    document.querySelector("#question").innerHTML = studentQuestions[index].name;
    document.querySelector("#option0").innerHTML = studentQuestions[index].ans[0];
    document.querySelector("#option1").innerHTML = studentQuestions[index].ans[1];
    document.querySelector("#option2").innerHTML = studentQuestions[index].ans[2];
    document.querySelector("#option3").innerHTML = studentQuestions[index].ans[3];
}

function nextBtnEvent(){
    // console.log('Index is',index);
    updateOption(studentQuestions[index]);
    index++;
    print();
}

function prevBtnEvent(){
    updateOption(studentQuestions[index]);
    index--;
    print();
}

function finishBtnEvent(){
    updateOption(studentQuestions[index]);
    calcResult();
}

function createDiv(value){
    var div = document.createElement('div');
    div.className = 'numChange';
    div.innerHTML = value;
    div.addEventListener('click',()=>{
        index = value-1;
        print();
    });
    return div;
}

function covert2Question(ques){
    var questionObj = new Studentquestion(ques.id,ques.qname,ques.ans,ques.correct_ans,5);
    studentQuestions.push(questionObj);
}

function getSelectedOption(){
    var selectedOption;

    if(document.querySelector('#op1').checked){
        selectedOption = 0;
    }
    else if(document.querySelector('#op2').checked){
        selectedOption = 1;
    }
    else if(document.querySelector('#op3').checked){
        selectedOption = 2;
    }
    else if(document.querySelector('#op4').checked){
        selectedOption = 3;
    }
    else{
        selectedOption = null;
    }

    return selectedOption;
}

function updateOption(quesObj){
    var responseIndex = getSelectedOption();
    quesObj.user_response = quesObj.ans[responseIndex];
}

function calcResult(){
    var result = 0;
    var maxMarks = 0;
    studentQuestions.forEach(quesObj=>{
        if(quesObj.user_response == quesObj.rans){
            result += quesObj.score;
        }
        maxMarks += quesObj.score;
    })

    document.querySelector('#resultContainer').className = 'show';
    document.querySelector('#result').innerHTML = result;
    document.querySelector('#maxMarks').innerHTML = maxMarks;
}