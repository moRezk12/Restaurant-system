import { Component } from '@angular/core';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent {

  grid = [
    {name: 'Main Qroup', value: 7 , icon : 'fas fa-object-group  ', bg: "#F0EBEB" , color: "#F97316"},
    {name: 'SubGroup', value: 26 , icon : 'fas fa-sitemap  ', bg: "#3B82F633" , color: "#3B82F6"},
    {name: 'Questions', value: 43 , icon : 'fas fa-question-circle ', bg: "#6366F133" , color: "#6366F1"},
  ]

  showPopup : boolean = false;

  openPopup() {
    this.showPopup = true;
    // this.selectedPowers = [];
  }

  closePopup() {
    this.showPopup = false;
    // this.selectedPowers = [];
  }

  // groups
  groups = [
  {
    title: 'Health and Nutrition',
    totalQuestions: 6,
    subGroups: [
      {
        name: 'Eating Habits',
        questionsCount: 3,
        questions: [
          'Do you eat breakfast every day?',
          'Do you eat vegetables daily?',
          'Do you drink enough water?',
        ]
      },
      {
        name: 'Physical activity',
        questionsCount: 3,
        questions: [
          'Do you exercise regularly?',
          'Do you walk daily?',
          'Do you avoid long sitting hours?',
        ]
      }
    ]
  },
  {
    title: 'Daily habits',
    totalQuestions: 6,
    subGroups: [
      {
        name: 'Sleep and mental health',
        questionsCount: 3,
        questions: [
          'Do you sleep at least 7 hours?',
          'Do you avoid screens before bed?',
          'Do you manage stress effectively?',
        ]
      },
      {
        name: 'Productivity and time management',
        questionsCount: 3,
        questions: [
          'Do you plan your day?',
          'Do you avoid distractions?',
          'Do you meet deadlines?',
        ]
      }
    ]
  }
];


  // Add Question


    mainGroups = [
    {
      name: 'Health and Nutrition',
      subGroups: ['Eating Habits', 'Physical activity']
    },
    {
      name: 'Daily habits',
      subGroups: ['Sleep and mental health', 'Productivity and time management']
    }
  ];

  selectedGroup: string = '';
  selectedSubGroup: string = '';
  filteredSubGroups: string[] = [];

  questions = [
    { ar: '', en: '', tr: '', active: true }
  ];

  onGroupChange() {
    const selected = this.mainGroups.find(g => g.name === this.selectedGroup);
    this.filteredSubGroups = selected ? selected.subGroups : [];
    this.selectedSubGroup = '';
  }

  addQuestion() {
    this.questions.push({ ar: '', en: '', tr: '', active: true });
  }

  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.splice(index, 1);
    }
  }


  saveQuestions() {
    const data = {
      mainGroup: this.selectedGroup,
      subGroup: this.selectedSubGroup,
      questions: this.questions
    };

    console.log('✅ Saved Data:', data);
    this.resetForm();
    this.closePopup();
  }

  resetForm() {
    this.selectedGroup = '';
    this.selectedSubGroup = '';
    this.filteredSubGroups = [];
    this.questions = [{ ar: '', en: '', tr: '', active: true }];
  }

}
