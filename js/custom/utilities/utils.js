// Initialize Firebase
var config = {
    apiKey: "AIzaSyBEKcG6hTKGjLZrZePKv1QGwMk6IWUoMm0",
    authDomain: "web-quiz-7290b.firebaseapp.com",
    databaseURL: "https://web-quiz-7290b.firebaseio.com",
    projectId: "web-quiz-7290b",
    storageBucket: "web-quiz-7290b.appspot.com",
    messagingSenderId: "817788984263"
  };
  firebase.initializeApp(config);
  
  function* autoGen(){
    var counter = 1;
    while(true){
    yield counter;
    counter++;
    }
    }

  function timer(counter,delay,id,callback){
    
    var ref = setInterval(()=>{
      counter--;
     // console.log('Counter is',counter);
      document.querySelector(`#${id}`).innerHTML = counter;
      if(counter == 0){
        clearInterval(ref);
        callback();
      }
    },delay);

  }