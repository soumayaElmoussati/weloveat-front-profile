import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdditionalErrandsService } from 'src/app/shared/services/additional-errands.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.scss']
})
export class DetailCourseComponent implements OnInit {

  ProdImgUrl = environment.productImgUrl;
  courseDetail:any;
  courseId:any;
  changingStatus = false;
 

  constructor(
    private additionalErrandS: AdditionalErrandsService,
    private route: ActivatedRoute
  ) {
      this.route.paramMap.subscribe(
      params => this.courseId = params.get('id')
    )
   }

  ngOnInit(): void {
    this.getCourseDetails();

  }

  getCourseDetails(){
    this.additionalErrandS.getDetailsCourse(this.courseId).subscribe(
      data => { 
        this.courseDetail = data.data;
        console.log(data);
       },
      error => {},
      () => {}
    )
  }

  //

 

  onChangeCourseStatus(event){
    this.changingStatus = true;

  if(event == "send_notification"){
      this.additionalErrandS.sendNotification(this.courseDetail.id, null).subscribe(
        data => { this.getCourseDetails() },
        error => {},
        () => { this.changingStatus = false }
        )
    }
    else if(event =="close_course"){
      this.additionalErrandS.closeErrand(this.courseDetail.id, null).subscribe(
        data => { this.getCourseDetails() },
        error => {},
        () => { this.changingStatus = false }
        )}
  }


}
