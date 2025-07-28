import { RatesiteService } from 'src/app/Core/Services/Home/ratesite.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  // pagination

  totalPages = 15;
  currentPage = 1;

  constructor(private RatesiteService : RatesiteService) {

  }

  ngOnInit(): void {
    this.getAllRate();
  }

  allRate : any

  getAllRate(){
    this.RatesiteService.getRateing().subscribe({
      next : (res : any) => {
        console.log(res);
        this.allRate = res.data;
      },
      error : (err) => {
        console.log(err);
      }
    })
  }


  getDisplayedPages(): number[] {
    const visiblePages = 5;
    let start = Math.max(1, this.currentPage - Math.floor(visiblePages / 2));
    let end = start + visiblePages - 1;

    if (end > this.totalPages) {
      end = this.totalPages;
      start = Math.max(1, end - visiblePages + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      // هنا حمّل البيانات حسب الصفحة مثلاً
    }
  }

}
