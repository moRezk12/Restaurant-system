import { Component , OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MaingroupService } from 'src/app/Core/Services/Groups/mainGroup/maingroup.service';
import { QuestionService } from 'src/app/Core/Services/Questions/question.service';
import Swal from 'sweetalert2';
import { signal } from '@angular/core';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  grid = [
    {name: 'Main Qroup', icon : 'fas fa-object-group  ', bg: "#F0EBEB" , color: "#F97316"},
    {name: 'SubGroup' , icon : 'fas fa-sitemap  ', bg: "#3B82F633" , color: "#3B82F6"},
    {name: 'Questions' , icon : 'fas fa-question-circle ', bg: "#6366F133" , color: "#6366F1"},
  ]

    questionForm!: FormGroup;
    editForm!: FormGroup;

  showPopup : boolean = false;

  openPopup() {
    this.showPopup = true;
    // this.selectedPowers = [];
  }

  closePopup() {
    this.showPopup = false;
    // this.selectedPowers = [];
  }



  // Add Question




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
      isActive: [true], // أو false حسب القيمة الافتراضية
      questionText: this.fb.array([this.createQuestionGroup()])
    });

    this.editForm = this.fb.group({
      questionText: this.fb.group({
        ar: ['', Validators.required],
        en: ['', Validators.required]
      }),
      evaluation: ['', Validators.required]
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



mainGroupCount = signal(0);
subGroupCount = signal(0);
totalQuestionCount = signal(0);

getCountsFromData(data: any) {
  if (!Array.isArray(data)) return;

  const mainCount = data.length;
  let subCount = 0;
  let questionCount = 0;

  data.forEach((mainGroup: any) => {
    if (Array.isArray(mainGroup.subGroups)) {
      subCount += mainGroup.subGroups.length;

      mainGroup.subGroups.forEach((subGroup: any) => {
        if (Array.isArray(subGroup.questions)) {
          subGroup.questions.forEach((q: any) => {
            if (Array.isArray(q.questions)) {
              questionCount += q.questions.length;
            }
          });
        }
      });
    }
  });

  // لو بتستخدم signals
  this.mainGroupCount.set(mainCount);
  this.subGroupCount.set(subCount);
  this.totalQuestionCount.set(questionCount);

}





  // Get all Questions

  allQuestions : any;
  getAllQuestions(){
    this.questionService.getQuestions().subscribe({
      next : (res : any) => {
        console.log(res.data);
        this.allQuestions = res.data;
        this.getCountsFromData(this.allQuestions);

      },
      error : (err) => {
        console.log(err);
      }
    });
  }

getTotalQuestionsForMainGroup(subGroups: any[]): number {
  if (!subGroups) return 0;
  let total = 0;

  subGroups.forEach(sub => {
    if (Array.isArray(sub.questions)) {
      sub.questions.forEach((qGroup: any) => {
        total += qGroup.questions?.length || 0;
      });
    }
  });

  return total;
}


getTotalQuestionsForSubGroup(sub: any): number {
  if (!sub?.questions) return 0;

  let total = 0;

  sub.questions.forEach((qGroup: any) => {
    total += qGroup.questions?.length || 0;
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
      evaluation: ['', Validators.required]
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
    const formValue = this.questionForm.value;

    const questions = formValue.questionText.map((q: any) => ({
      questionText: {
        ar: q.ar,
        en: q.en
      },
      evaluation: q.evaluation
    }));

    const payload = {
      mainGroup: formValue.mainGroup,
      subGroup: formValue.subGroup,
      isActive: formValue.isActive,
      questions: questions
    };

    console.log('Payload to send:', payload);

    this.questionService.createQuestion(payload).subscribe({
      next: (res: any) => {
        this.swalSuccess(res.message);
        this.getAllQuestions();
      },
      error: (err) => {
        this.swalError(err.error.message);
      }
    });
  } else {
    this.questionForm.markAllAsTouched();
  }
}

  // Edit
  editPopup: boolean = false;
  currentEdit: { id: string, mainGroupId: string } | null = null;
  selectMainId : any;
  selectQuestionId : any;

editQuestion(questionText: { ar: string, en: string }, evaluation: any , mainGroupId: string , questionId: string): void {
  console.log('Arabic:', questionText.ar);
  console.log('English:', questionText.en);
  console.log('Evaluation:', evaluation);
  console.log('Question ID:', questionId);
  console.log('Main Group ID:', mainGroupId);

  this.selectMainId = mainGroupId;
  this.selectQuestionId = questionId;

  // مثال: تعيين القيم في الفورم لو هتعدل
  this.editForm.patchValue({
    questionText: {
      ar: questionText.ar,
      en: questionText.en
    },
    evaluation: evaluation._id
  });

  // لو محتاج تحتفظ بالقيم دي لتستخدمها عند الحفظ بعد التعديل
  this.currentEdit = {
    id: questionId,
    mainGroupId: mainGroupId
  };

  this.editPopup = true;
}

  updateQuestion(){
    if (this.editForm.valid) {
      const formValue = this.editForm.value;
      console.log(formValue);


      const payload = {
        questionText: {
          ar: formValue.questionText.ar,
          en: formValue.questionText.en
        },
        evaluation: formValue.evaluation
      };

      this.questionService.updateQuestion(this.selectMainId, this.selectQuestionId, payload).subscribe({
        next: (res: any) => {
          this.swalSuccess(res.message);
          this.editclosePopup();
        },
        error: (err) => {
          this.swalError(err.error.message);
        }
      });
    }
  }

  editclosePopup(){
    this.editPopup = false;
  }

  deletQuestion(mainGroupId: number, questionId: number) {

    console.log(mainGroupId, questionId);


      Swal.fire({
        title: 'Are you sure?',
        text: `Do you really want to delete this question? This action cannot be undone.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
        customClass: {
            confirmButton: 'mywarning',
            cancelButton: 'myError'
          }
      }).then((result) => {
        if (result.isConfirmed) {
          this.questionService.deleteQuestion(mainGroupId, questionId).subscribe({
            next: (res: any) => {
              this.swalSuccess(res.message);
            },
            error: (err) => {
              this.swalError(err.error.message);
            }
          });
        }
      });

  }

  swalSuccess( message : any ) {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message || 'Check your email '  ,
        confirmButtonColor: '#28a745',
        confirmButtonText: 'OK',
        timerProgressBar: true,
        customClass: {
          confirmButton: 'mySuccess'
        }
      }).then(() => {
        this.getAllQuestions();
        this.resetForm();

      })
    }

    swalError( message : any ) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message || 'An error occurred'  ,
        confirmButtonColor: '#dc3545',
        confirmButtonText: 'OK',
        timerProgressBar: true,
        customClass: {
          confirmButton: 'myError'
        }
      })
    }

  resetForm() {
    this.selectedGroup = '';
    this.selectedSubGroup = '';
    this.filteredSubGroups = [];
    this.editclosePopup();
    this.closePopup();
    this.editForm.reset();
    this.questionForm.reset();
    // this.questions = [{ ar: '', en: '', tr: '', active: true }];
  }



}
