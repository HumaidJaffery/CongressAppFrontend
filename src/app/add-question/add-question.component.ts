import { AfterViewInit, Component, Input, OnInit, Output, Renderer2, ViewChild, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Question } from '../Question';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements AfterViewInit, OnInit  {
  @ViewChild('choicesDiv') choicesDiv: any; 
  question: string = "";
  correctAnswer: string = ""
  questionType: any;;
  explanation: string = "";
  roomInfo: any;
  questionNumber: any;
  roomKey: any; 
  errorMsg: string = "";

  constructor(private renderer: Renderer2, private route: ActivatedRoute, private questionService: QuestionService, private router: Router) { }

  ngOnInit() {
    //getting Room info
    this.route.queryParams.subscribe((params) => {
      this.roomInfo = JSON.parse( decodeURIComponent(params['roomInfo']));
      console.log(this.roomInfo);
      this.questionType = this.roomInfo.allowedQuestionTypes[0];
    })

    

    //question Number (out of total questionsRequiredPerUser)
    this.route.paramMap.subscribe(params => {
      this.questionNumber = params.get('number');
      this.questionNumber = parseInt(this.questionNumber);
      this.roomKey = params.get('key')
    })
    console.log(this.roomKey);

  }

  ngAfterViewInit() {
    for (let i = 0; i < 4; i++) {
      this.addChoice();
    }
  }

  //-----------------------------------------Topics
  selectedTopics: number[] = [];

  //submit
  addQuestion(){
    console.log("here")
    //base
    var questionModel: Question = {
      questionType: this.questionType,
      roomKey: this.roomKey,
      question: this.question,
      answers: [],
      correctAnswer: this.correctAnswer,
      explanation: this.explanation,
      topicIds: this.selectedTopics
    }

    //Multiple Choice
    if(this.questionType == 'MULTIPLECHOICE'){
      var answers: string[] = [];
      for(let i=0; i<this.choicesArray.length; i++){
        if(this.choicesArray[i] != null){
          console.log(this.choicesArray[i])
          if(this.choicesArray[i].firstChild.value == '') {
            this.errorMsg = "None of your choices can be empty";
            return;
          }
          answers.push(this.choicesArray[i].firstChild.value);
        }
      } 
      console.log(answers)
      if(answers.length < 2) {
        this.errorMsg = "You have to have atleast 2 choices"
        this.addChoice();
        if(answers.length == 0) this.addChoice();
        return;
      } 
      questionModel.answers = answers;
    //Free Response
    } else if (this.questionType == 'TRUEFALSE')  {
      questionModel.answers = ['true', 'false'];
    }

    this.questionService.createQuestion(questionModel).subscribe(
      (response: any) => {
        console.log(response);
        console.log(this.questionNumber + " " + (this.roomInfo.questionsRequiredPerUser-1));
        if(this.questionNumber >= this.roomInfo.questionsRequiredPerUser){
          this.router.navigate([`/quiz/${this.roomKey}`]);
          return;
        }
        this.router.navigate([`/question/${this.roomKey}/${parseInt(this.questionNumber) +1}`], 
        {queryParams: {roomInfo: encodeURIComponent(JSON.stringify(this.roomInfo))}});
      }, (error: any) => {
        console.log("Error: " + error);
      }
    )
  }

  //-----------------------------------------MULTIPLE CHOICE:
  //containing all divs of choices (input field  + removeButton + selectAsCorrectBtn), the index of the choice is the id of the div, 
  //and the button is set to delete based on that id 
  //Everytime it deletes, the index in that array is not deleted, but rather set to null, 
  //so it doesnt mess up the other choices indexes
  choicesArray: any[] = [];
  numOfChoices = 0;

  addChoice(){
    this.numOfChoices++;
    this.errorMsg = "";
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, "my-2");
    this.renderer.addClass(div, "p-2");
    this.renderer.addClass(div, "w-full");
    this.renderer.addClass(div, "flex");
    this.renderer.addClass(div, "gap-4");
    div.id = this.choicesArray.length;
    
    const input =  this.renderer.createElement('input');
    this.renderer.addClass(input, "mx-5");
    this.renderer.addClass(input, "my-0");
    this.renderer.addClass(input, "p-2");
    this.renderer.addClass(input, "border-b-2");
    this.renderer.addClass(input, "border-slate-950");
    this.renderer.addClass(input, "w-2/3");
    this.renderer.addClass(input, "border-b");
    this.renderer.addClass(input, "bg-transparent");
    
    const removeButton = this.renderer.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove Choice';
    this.renderer.listen(removeButton, 'click', () => {
      this.removeChoice(div.id)
    })
    this.renderer.addClass(removeButton, "1/6");
    this.renderer.addClass(removeButton, "p-3");
    this.renderer.addClass(removeButton, "outline");
    this.renderer.addClass(removeButton, "rounded-xl");
    this.renderer.addClass(removeButton, "text-red-500");
    

    const addCorrectChoiceButton = this.renderer.createElement('button');
    addCorrectChoiceButton.type = 'button';
    addCorrectChoiceButton.id = 'addCorrectChoice';
    addCorrectChoiceButton.textContent = 'Select as Correct Choice';
    this.renderer.listen(addCorrectChoiceButton, 'click', () => {
      this.selectChoice(div.id)
    })
    this.renderer.addClass(addCorrectChoiceButton, "1/6");
    this.renderer.addClass(addCorrectChoiceButton, "p-3");
    this.renderer.addClass(addCorrectChoiceButton, "outline");
    this.renderer.addClass(addCorrectChoiceButton, "rounded-xl");
    this.renderer.addClass(addCorrectChoiceButton, "text-green-500");

    // const removeCorrectChoiceButton = this.renderer.createElement('button');
    // removeCorrectChoiceButton.type = 'button';
    // removeCorrectChoiceButton.id = 'removeCorrectChoice';
    // removeCorrectChoiceButton.textContent = 'Remove Correct Choice';
    // this.renderer.listen(removeCorrectChoiceButton, 'click', () => {
    //   this.removeCorrectChoice(div.id)
    // })
    // removeCorrectChoiceButton.hidden = true;

    this.choicesArray.push(div);
    this.renderer.appendChild(div, input);
    this.renderer.appendChild(div, removeButton);
    this.renderer.appendChild(div, addCorrectChoiceButton);
    // this.renderer.appendChild(div, removeCorrectChoiceButton);
    this.renderer.appendChild(this.choicesDiv.nativeElement, div);
  }

  removeChoice(index: number): void{
    if(this.numOfChoices<3){
      this.errorMsg = "You Can't have less than two choices";
      return;
    }
    this.numOfChoices--;
    this.renderer.removeChild(this.choicesDiv.nativeElement, this.choicesArray[index]);
    this.choicesArray[index] = null;
  }

  

  selectChoice(index: number){
    var correctChoice: any = this.choicesArray[index];
    this.correctAnswer = correctChoice.firstChild.value;

    this.renderer.setStyle(correctChoice, 'outline', '8px solid green');
    this.renderer.setStyle(correctChoice, 'border-radius', '20px');

    for(let i=0; i<this.choicesArray.length; i++){
      if(i != index && this.choicesArray[i] != null) this.choicesArray[i].style.outline = "";
    }
  }

  // removeCorrectChoice(index: number){
  //   var correctChoice: any = this.choicesArray[index];
  //   this.correctChoices.splice(this.correctChoices.indexOf(correctChoice), 1);
  
  //   correctChoice.querySelector('#addCorrectChoice').hidden = false;
  //   correctChoice.querySelector('#removeCorrectChoice').hidden = true;
  //   this.renderer.removeStyle(correctChoice, 'outline');
  // }
  
}
