import { AuthService } from './../../core/services/auth/auth.service';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplyService } from '../../core/services/apply/apply.service';
import { Job } from '../../core/interfaces/job';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { DetailsService } from '../../core/services/details/details.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  private readonly detailsService = inject(DetailsService);
  private readonly toastrService = inject(ToastrService);
  private readonly applyService = inject(ApplyService);
  private readonly authService = inject(AuthService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  jobId: any;
  jobDetails: Job = {} as Job;


  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.activatedRoute.paramMap.subscribe({
        next: (res) => {
          console.log(res.get('id'));
          this.jobId = res.get('id');
          this.getDetails()
        },
        error: (err) => {
          console.log(err);
        }
      })

      this.authService.getUserData();
    }

  }

  getDetails(): void {
    this.detailsService.goToDetails(this.jobId).subscribe({
      next: (res) => {
        console.log(res);
        this.jobDetails = res;
      }
    })
  }

  applyJob(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.applyService.applyJob(this.jobDetails.id).subscribe({
        next: (res) => {
          console.log(res.message);
          this.toastrService.success(res.message, "Jop Portal");
          this.getDetails();
        }
      })

    }

  }
}
