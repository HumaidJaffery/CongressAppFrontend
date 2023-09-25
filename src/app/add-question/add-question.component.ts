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
  @Input() questionNumber: any;
  @Input() questionTypesAllowed: any;
  @Input() roomKey: any;
  question: string = "";
  questionType: string = "MULTIPLECHOICE";
  explanation: string = "";
  @Input() questionsRequiredPerUser: any; 
  

  constructor(private renderer: Renderer2, private route: ActivatedRoute, private questionService: QuestionService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    for (let i = 0; i < 4; i++) {
      this.addChoice();
    }
  }
  //-----------------------------------------Topics
  @Input() topics: any;
  selectedTopics: number[] = [];

  //-----------------------------------------FREE RESPONSE: 
  freeResponseAnswer: string = "";

  //-----------------------------------------TrueOrFalse:
  isTrue: boolean = true;


  //submit
  @Output() nextQuestion = new EventEmitter();
  addQuestion(){
    //base
    var questionModel: Question = {
      questionType: this.questionType,
      roomKey: this.roomKey,
      question: this.question,
      answers: [],
      correctAnswer: [],
      explanation: this.explanation,
      topicIds: this.selectedTopics
    }

    //Multiple Choice
    if(this.questionType == 'MULTIPLECHOICE'){
      var answers: string[] = [];
      for(let i=0; i<this.choicesArray.length; i++){
        if(this.choicesArray[i] != null){
          answers.push(this.choicesArray[i].firstChild.value);
        }
      }  
      questionModel.answers = answers;
      var correctAnswers: string[] = [];
      for(let i=0; i<this.correctChoices.length; i++){
        correctAnswers.push(this.correctChoices[i].firstChild.value);
      } 
      questionModel.correctAnswer = correctAnswers;
    //Free Response
    } else if (this.questionType == 'FREERESPONSE') {
      questionModel.correctAnswer = [this.freeResponseAnswer]; 
    //True Or False
    } else if (this.questionType == 'TRUEFALSE')  {
      questionModel.answers = ['true', 'false'];
      questionModel.correctAnswer = [this.isTrue.toString()];
    }


    this.questionService.createQuestion(questionModel).subscribe(
      (reponse: any) => {
        this.nextQuestion.emit(this.questionNumber);
        if(this.questionNumber == this.questionsRequiredPerUser-1){
          this.router.navigate(["/home"]);
        }
        console.log(this.questionNumber);
      }, (error: any) => {
        console.log("Error: ");
        console.log(error);
      }
    )
  }

  //-----------------------------------------MULTIPLE CHOICE:
  
  //If two or less choices remaining
  cantRemoveChoiceMsg: boolean = false;
  //containing all divs of choices (input field  + removeButton), the index of the choice is the id of thediv, and the button is set to delete based on that id 
  //Everytime it deletes, the index in that array is not delete, but rather set to null, so it doesnt mess up the other choices indexes
  choicesArray: any[] = [];
  numOfChoices = 0;
  correctChoices: any[] = [];
  addcorrectChoiceEvent = (index: number) =>  {
    this.addCorrectChoice(index);    
  };

  addChoice(){
    this.numOfChoices++;
    const div = this.renderer.createElement('div');
    this.renderer.addClass(div, "my-2");
    this.renderer.addClass(div, "p-2");
    this.renderer.addClass(div, "w-3/4");
    div.id = this.choicesArray.length;
    
    const input =  this.renderer.createElement('input');
    this.renderer.addClass(input, "mx-5");
    this.renderer.addClass(input, "my-0");
    this.renderer.addClass(input, "p-2");
    this.renderer.addClass(input, "border-b-2");
    this.renderer.addClass(input, "border-slate-950");
    this.renderer.addClass(input, "w-3/4");
    
    const removeButton = this.renderer.createElement('button');
    removeButton.type = 'button';
    removeButton.textContent = 'Remove Choice';
    this.renderer.listen(removeButton, 'click', () => {
      this.removeChoice(div.id)
    })

    const addCorrectChoiceButton = this.renderer.createElement('button');
    addCorrectChoiceButton.type = 'button';
    addCorrectChoiceButton.id = 'addCorrectChoice';
    addCorrectChoiceButton.textContent = 'Add Correct Choice';
    this.renderer.listen(addCorrectChoiceButton, 'click', () => {
      this.addCorrectChoice(div.id)
    })

    const removeCorrectChoiceButton = this.renderer.createElement('button');
    removeCorrectChoiceButton.type = 'button';
    removeCorrectChoiceButton.id = 'removeCorrectChoice';
    removeCorrectChoiceButton.textContent = 'Remove Correct Choice';
    this.renderer.listen(removeCorrectChoiceButton, 'click', () => {
      this.removeCorrectChoice(div.id)
    })
    removeCorrectChoiceButton.hidden = true;

    this.choicesArray.push(div);
    this.renderer.appendChild(div, input);
    this.renderer.appendChild(div, removeButton);
    this.renderer.appendChild(div, addCorrectChoiceButton);
    this.renderer.appendChild(div, removeCorrectChoiceButton);
    this.renderer.appendChild(this.choicesDiv.nativeElement, div);
  }

  removeChoice(index: number): void{
    if(this.numOfChoices<3){
      this.cantRemoveChoiceMsg = true;
      return;
    }
    this.numOfChoices--;
    this.renderer.removeChild(this.choicesDiv.nativeElement, this.choicesArray[index]);
    this.choicesArray[index] = null;
  }

  

  addCorrectChoice(index: number){
    var correctChoice: any = this.choicesArray[index];
    this.correctChoices.push(correctChoice);
    
    correctChoice.querySelector('#addCorrectChoice').hidden = true;
    correctChoice.querySelector('#removeCorrectChoice').hidden = false;
    this.renderer.setStyle(correctChoice, 'outline', '2px solid teal');
  }

  removeCorrectChoice(index: number){
    var correctChoice: any = this.choicesArray[index];
    this.correctChoices.splice(this.correctChoices.indexOf(correctChoice), 1);
  
    correctChoice.querySelector('#addCorrectChoice').hidden = false;
    correctChoice.querySelector('#removeCorrectChoice').hidden = true;
    this.renderer.removeStyle(correctChoice, 'outline');
  }


  
}
