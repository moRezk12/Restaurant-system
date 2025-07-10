import { Component } from '@angular/core';

@Component({
  selector: 'app-question-score',
  templateUrl: './question-score.component.html',
  styleUrls: ['./question-score.component.css']
})
export class QuestionScoreComponent {

    showPopup : boolean = false;

  openPopup() {
    this.showPopup = true;
    // this.selectedPowers = [];
  }

  closePopup() {
    this.showPopup = false;
    // this.selectedPowers = [];
  }

}
