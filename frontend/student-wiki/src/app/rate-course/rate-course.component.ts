import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rate-course',
  templateUrl: './rate-course.component.html',
  styleUrls: ['./rate-course.component.scss']
})
export class RateCourseComponent implements OnInit {

  currentRating: number;
  constructor() { }

  ngOnInit() {
  }

}
