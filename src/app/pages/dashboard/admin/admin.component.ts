import Swal from 'sweetalert2';
import { UsersService } from './../../../core/services/users/users.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../../../core/interfaces/users';
import { Modal } from 'flowbite';
import { JobsService } from '../../../core/services/jobs/jobs.service';
import { Job } from '../../../core/interfaces/job';


@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly jobsService = inject(JobsService);
  private readonly toastrService = inject(ToastrService);
  allUsers: Users[] = [];
  allJobs: Job[] = [];
  showUsers: boolean = true;
  showJobs: boolean = false;
  userId: string = "";
  addUser: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)]),
    role: new FormControl(null, [Validators.required, Validators.pattern(/^(Admin|User)$/)])
  })

  addJob: FormGroup = new FormGroup({
    title: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('^[a-zA-Z ]*$')
    ]),
    description: new FormControl(null, [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(200)
    ]),
    company: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$')
    ])
    ,
    location: new FormControl(null, [
      Validators.required,
      Validators.maxLength(50),
      Validators.pattern('^[a-zA-Z ]*$')
    ])
    ,
    salary: new FormControl(null, [
      Validators.required,
      Validators.min(1000),
      Validators.max(100000),
      Validators.pattern('^[0-9]*$')
    ])
  })

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllJobs();
  }

  getAllUsers(): void {
    this.usersService.getAllUsers().subscribe({
      next: (res) => {
        console.log(res);
        this.allUsers = res
      }
    })
  }

  createAccount(): void {
    if (this.addUser.valid) {
      this.usersService.addNewAccount(this.addUser.value).subscribe({
        next: (res) => {
          if (res.message === "User added successfully") {
            this.userId = res.user.id;
            this.toastrService.success("Account created succesfully.", "Jop Portal");
            this.clearUserForm();
            this.getAllUsers();
          }

        }
      })


    }
    else {
      this.addUser.markAllAsTouched();
    }
  }

  deleteAccount(id: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"

        });
        this.usersService.deleteAccount(id).subscribe({


          next: (res) => {

            console.log(res);
            this.getAllUsers()
          }

        })
      }
    });

  }

  addNewJob(): void {
    if (this.addJob.valid) {
      this.jobsService.addNewJob(this.addJob.value).subscribe({
        next: (res) => {
          console.log(res);
          this.toastrService.success("Job Added succesfully", "Jop Portal");
          this.getAllJobs();
        }

      })

      this.clearJobForm();
    }
    else {
      this.addJob.markAllAsTouched()
    }

  }

  getAllJobs(): void {
    this.jobsService.getAllJobs().subscribe({
      next: (res) => {
        this.allJobs = res;

      }
    })
  }

  deleteJob(id: number): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"

        });
        this.jobsService.deleteJob(id).subscribe({


          next: (res) => {

            console.log(res);
            this.getAllJobs()
          }

        })
      }
    }
    )
  }


  clearUserForm(): void {
    this.addUser.get('name')?.setValue(null);
    this.addUser.get('email')?.setValue(null);
    this.addUser.get('password')?.setValue(null);
    this.addUser.get('role')?.setValue(null);
  }

  clearJobForm(): void {
    this.addJob.get('title')?.setValue(null);
    this.addJob.get('description')?.setValue(null);
    this.addJob.get('company')?.setValue(null);
    this.addJob.get('location')?.setValue(null);
    this.addJob.get('salary')?.setValue(null);
  }
}
