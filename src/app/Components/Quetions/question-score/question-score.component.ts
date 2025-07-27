import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from 'src/app/Core/Services/Questions/question.service';

@Component({
  selector: 'app-question-score',
  templateUrl: './question-score.component.html',
  styleUrls: ['./question-score.component.css']
})
export class QuestionScoreComponent implements OnInit {

    showPopup : boolean = false;

    scoreForm! : FormGroup;

    constructor(private fb : FormBuilder , private questionService : QuestionService) {}

  ngOnInit() {
    this.scoreForm = this.fb.group({
      title: ['', Validators.required],
      statuses: this.fb.array([this.createScoreGroup()])
    });

    // Get all Scores
    this.getScores();

  }

  // Get all Scores
  allScores : any;
  getScores() {
    this.questionService.getScore().subscribe({
      next : (res : any) => {
        console.log(res);
        this.allScores = res.data;
      },
      error : (err) => {
        console.log(err);
      }
    });
  }

  // Getter for FormArray
  get statuses(): FormArray {
    return this.scoreForm.get('statuses') as FormArray;
  }

  // Create new FormGroup for level & score
  createScoreGroup(): FormGroup {
    return this.fb.group({
      label: ['', Validators.required],
      percentage: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // Add new level
  addRate() {
    this.statuses.push(this.createScoreGroup());
  }

  // Remove level by index
  removeRate(index: number) {
    if (this.statuses.length > 1) {
      this.statuses.removeAt(index);
    }
  }

  saveQuestions() {
    if (this.scoreForm.valid) {
      console.log(this.scoreForm.value);
      this.questionService.createScore(this.scoreForm.value).subscribe({
        next: (res: any) => {
          console.log('Score created successfully:', res);
        },
        error: (err) => {
          console.error('Error creating score:', err);
        }
      })
      // send to backend
    } else {
      this.scoreForm.markAllAsTouched();
    }
  }

  openPopup() {
    this.showPopup = true;
    // this.selectedPowers = [];
  }

  closePopup() {
    this.showPopup = false;
    // this.selectedPowers = [];
  }


}
