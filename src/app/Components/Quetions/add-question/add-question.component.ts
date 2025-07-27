import { Component , OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MaingroupService } from 'src/app/Core/Services/Groups/mainGroup/maingroup.service';
import { QuestionService } from 'src/app/Core/Services/Questions/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  grid = [
    {name: 'Main Qroup', value: 7 , icon : 'fas fa-object-group  ', bg: "#F0EBEB" , color: "#F97316"},
    {name: 'SubGroup', value: 26 , icon : 'fas fa-sitemap  ', bg: "#3B82F633" , color: "#3B82F6"},
    {name: 'Questions', value: 43 , icon : 'fas fa-question-circle ', bg: "#6366F133" , color: "#6366F1"},
  ]

    questionForm!: FormGroup;

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
  // filteredSubGroups: string[] = [];

  // questions = [
  //   { ar: '', en: '', tr: '', active: true }
  // ];

    constructor(private fb: FormBuilder , private mainGroup : MaingroupService,
      private questionService : QuestionService
    ) {}

  ngOnInit() {
    this.questionForm = this.fb.group({
      mainGroup: ['', Validators.required],
      subGroup: ['', Validators.required],
      // evaluations: ['', Validators.required],
      questionText: this.fb.array([this.createQuestionGroup()])
    });

    this.getAllMainGroups();

    this.getAllQuestions();

    this.getScores();
  }

  // Get Score
  allScores : any;
    getScores() {
    this.questionService.getScore().subscribe({
      next : (res : any) => {
        this.allScores = res.data;

      },
      error : (err) => {
        console.log(err);
      }
    });
  }

  // Get all Questions

  allQuestions : any;
  getAllQuestions(){
    this.questionService.getQuestions().subscribe({
      next : (res : any) => {
        console.log(res);
        this.allQuestions = res.data;

      },
      error : (err) => {
        console.log(err);
      }
    });
  }

  getTotalQuestions(subGroups: any[]): number {
    let total = 0;

    subGroups.forEach(sub => {
      if (sub.questions?.length > 0) {
        // بعض الـ subGroups تحتوي على questions[0]?.questionText
        const firstQuestionGroup = sub.questions[0];
        if (firstQuestionGroup?.questionText?.length) {
          total += firstQuestionGroup.questionText.length;
        }
      }
    });

    return total;
  }

      // Get all main groups
      allOptionsMainGroup: any;
    getAllMainGroups(){
      this.mainGroup.getMainGroups().subscribe({
        next : (res : any) => {
          this.allOptionsMainGroup = res.data;

        },
        error : (err) => {
          console.log(err);
        }
      });
    }

    filteredSubGroups: any;

  onMainGroupChange(event: any) {
    const selectedGroupId = event.target.value;

    const selectedGroup = this.allOptionsMainGroup.find((group: any) => group._id === selectedGroupId);

    this.filteredSubGroups = selectedGroup?.subGroups || [];

    // Reset subGroup form control if needed
    this.questionForm.get('subGroup')?.setValue('');
  }


  // Accessor for questions array
  get questionText(): FormArray {
    return this.questionForm.get('questionText') as FormArray;
  }

  // Create a new question form group
  createQuestionGroup(): FormGroup {
    return this.fb.group({
      ar: ['', Validators.required],
      en: ['', Validators.required],
      evaluation: [[], Validators.required]
      // active: [true]
    });
  }

    // Add a new question
  addQuestion() {
    this.questionText.push(this.createQuestionGroup());
  }


  // Remove a question
  removeQuestion(index: number) {
    if (this.questionText.length > 1) {
      this.questionText.removeAt(index);
    }
  }


  // Submit form
  createQuestions() {

    if (this.questionForm.valid) {
      console.log(this.questionForm.value);

      const formValue = this.questionForm.value;

      const payload = {
        questionText: formValue.questionText,
        mainGroups: [formValue.mainGroup], // 👈 غيّر هنا
        subGroups: [formValue.subGroup],   // 👈 وهنا
        evaluations : [formValue.evaluations]
      };

      this.questionService.createQuestion(payload).subscribe({
        next: (res: any) => {
          console.log('Question created successfully:', res);
        },
        error: (err) => {
          console.error('Error creating question:', err);
        }
      });
      // send to backend
    } else {
      this.questionForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.selectedGroup = '';
    this.selectedSubGroup = '';
    this.filteredSubGroups = [];
    // this.questions = [{ ar: '', en: '', tr: '', active: true }];
  }

}
