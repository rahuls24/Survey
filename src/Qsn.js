import React, { Component } from 'react'

class Qsn extends Component {


    







        render() {
            let studentName;
            var questions;
            
                studentName = <h1>Welcome to U-Survey, Rahul </h1>;
                  questions = <div>
                    <h2>Here are some questions: </h2>
                    <form>
                      <div className="card">
                        <label>What kind of courses you like the most: </label> <br />
                        <input type="radio" name="answer1" value="Technology" />Technology
                        <input type="radio" name="answer1" value="Design" />Design
                        <input type="radio" name="answer1" value="Marketing" />Marketing
                      </div>
                      <div className="card">
                        <label>you are a: </label> <br />
                        <input type="radio" name="answer2" value="Student" />Student
                        <input type="radio" name="answer2" value="in-job" />in-job
                        <input type="radio" name="answer2" value="looking-job" />looking-job
                      </div>
                      <div className="card">
                        <label>Is online learning helpful:  </label> <br />
                        <input type="radio" name="answer3" value="yes" />yes
                        <input type="radio" name="answer3" value="no" />no
                        <input type="radio" name="answer3" value="maybe" />maybe
                      </div>
                      <input className="feedback-button" type="submit" value="submit" />
                    </form>
                  </div>




        return (
            <div>
                   {studentName}
                   ==================================================================
                   {questions}
            </div>
        )
    }
}
export default Qsn;
