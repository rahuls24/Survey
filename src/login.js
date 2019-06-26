import React, { Component } from 'react'
var firebase = require('firebase');


//you can take this setup by resistering on firebase
var firebaseConfig = {
  apiKey: "Your Api Key",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
class Login extends Component {


    // Method for signup

    signup() {
        const email=this.refs.email.value
        const password=this.refs.password.value
        this.setState({password: password})
        const auth = firebase.auth()
  
        const promise = auth.createUserWithEmailAndPassword(email,password)
        promise.then(userCreds => {
            var err ="welcome"+userCreds.user.email;
            firebase.database().ref('users/'+userCreds.user.uid).set({
              email: userCreds.user.email
            })
            localStorage.setItem('email',userCreds.user.email);
            this.setState({err: err})
            this.setState({email: userCreds.user.email});
            this.setState({users: userCreds})
            this.setState({studentName: userCreds.user.email})
        });
        promise.catch(e => {
            var err = e.message;
            this.setState({err: err});
            
  
  
        });
    }    
  
    // method for sinin
    sinin()
    {
      const email = this.refs.email.value;
      const password = this.refs.password.value;
      this.setState({password: password})
      const auth = firebase.auth();
  
      const promise = auth.signInWithEmailAndPassword(email, password);
  
      promise.then(userCreds => {
        var err= "welcome"+userCreds.user.email;
        localStorage.setItem('email',userCreds.user.email);
        this.setState({err: err})
        this.setState({email: userCreds.user.email})
        this.setState({users: userCreds})
        this.setState({studentName: userCreds.user.email})
      
  
    })
  
    promise.catch(e => {
        var err = e.message
        this.setState({err: err})
    })
  
    }
  // methods to store response of users
  answerSelected(event){
    var answers = this.state.answers;
    if(event.target.name === 'answer1'){
      answers.answer1 = event.target.value;
    } else if(event.target.name === 'answer2'){
      answers.answer2 = event.target.value;
    } else if(event.target.name === 'answer3'){
      answers.answer3 = event.target.value;
    }

    this.setState({answers: answers}, function(){
    });
  }

  //method to store respond on firebase
  questionSubmit(){
    var answers=this.state.answers

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var email = user.email;
        var uid = user.uid;
        var providerData = user.providerData;
       firebase.database().ref('users/'+uid+"res").set({
         email: email,
        answers: answers
      });
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
    this.setState({isSubmitted: true})

   
}
//constructor for setting the state and binding of method
      constructor(props) {
      super(props)
    
      this.state = {
        answers: {
          answer1: '',
          answer2: '',
          answer3: ''
          },
          studentName: '',
          email: '',
        err: '',
      isSubmitted: false
       
         
      }
      this.signup = this.signup.bind(this)
      this.sinin = this.sinin.bind(this)
      this.answerSelected = this.answerSelected.bind(this);
      this.questionSubmit = this.questionSubmit.bind(this);
    }

    render() {
        let gitty;
        let questions;
        let mark1;
       if(this.state.email==='') {
           gitty=<div>
           <input id="email" ref="email" type="email" placeholder="Enter Your Email" /> <br />
           <input id="pass" ref="password" type="password" placeholder="Enter Your Password" /> <br />
           <button onClick={this.signup}> signup </button>
           <button onClick={this.sinin}> sinin </button>
       </div>
       }
        else if (this.state.studentName !== '' && this.state.isSubmitted === false){
            gitty = <h1>Welcome to Silicon-Survey, {this.state.studentName}</h1>;
            mark1='----------------------------------------------------------';
              questions = <div>
                <h2>Here are some questions: </h2>
                <form onSubmit={this.questionSubmit}>
                  <div className="card">
                    <label>What kind of  extra courses you like the most: </label> <br />
                    <input type="radio" name="answer1" value="Technology" onChange={this.answerSelected} />Technology
                    <input type="radio" name="answer1" value="Design" onChange={this.answerSelected} />Design
                    <input type="radio" name="answer1" value="Marketing" onChange={this.answerSelected} />Marketing
                  </div>
                  <div className="card">
                    <label>Your Branch is : </label> <br />
                    <input type="radio" name="answer2" value="Student" onChange={this.answerSelected} />CSE
                    <input type="radio" name="answer2" value="in-job" onChange={this.answerSelected} />EEE
                    <input type="radio" name="answer2" value="looking-job" onChange={this.answerSelected} />ETC
                  </div>
                  <div className="card">
                    <label> Which time slot you will prefer:  </label> <br />
                    <input type="radio" name="answer3" value="yes" onChange={this.answerSelected} />8AM To 10 AM
                    <input type="radio" name="answer3" value="no" onChange={this.answerSelected} /> 12 PM To 2PM
                    <input type="radio" name="answer3" value="maybe" onChange={this.answerSelected} />5 PM To 7PM
                  </div>
                  <input className="feedback-button" type="submit" value="submit" />
                </form>
              </div>
          } else if(this.state.isSubmitted === true){
            gitty = <h1 className="App">Thanks, {this.state.studentName}</h1>
          }
        return (
            <div className="App">
            {gitty}
            {mark1}
            {questions}
            </div>
        )
    }
}
export default Login;
