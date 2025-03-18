import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { JobsService } from '../../core/services/jobs/jobs.service';
import { Job } from '../../core/interfaces/job';
import { AuthService } from '../../core/services/auth/auth.service';
import { title } from 'process';

@Component({
  selector: 'app-job-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent implements OnInit {
  private readonly jobsService = inject(JobsService);
  private readonly authService = inject(AuthService);
  allJobs: Job[] = [];
  term: string = "";
  findJob: boolean = true;
  notFoundJob: string = '';

  ngOnInit(): void {
    this.getAllJobs();

  }

  getAllJobs(): void {
    this.jobsService.getAllJobs().subscribe({
      next: (res) => {
        console.log(res);
        this.allJobs = res
      }
    })
  }

  searchForJob(): void {
    if (!this.term.trim()) {
      // إذا كان الإدخال فارغًا، نجلب جميع الوظائف
      this.findJob = true;

      this.getAllJobs();
      return;
    }

    this.jobsService.searchForJob(this.term).subscribe({
      next: (res) => {
        console.log(res);
        this.findJob = true;

        this.allJobs = res;
      },
      error: (err) => {
        this.notFoundJob = err.error.message;
        this.findJob = false;

      }
    });
  }




}
