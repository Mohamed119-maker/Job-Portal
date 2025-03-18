
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../core/services/auth/auth.service';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CarouselModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);
  imgs: string[] = [
    "/job-vacancy-background-with-chair-flat-style_23-2147875408.avif",
    "/4574122.jpg",
    "/job-hunting_23-2147503011.avif"
  ]

  registerSlider: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 400,
    navText: ['', ''],
    items: 1,
    nav: false
  }
  register: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    role: new FormControl(null),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)])
  })

  submitRegister(): void {
    if (this.register.valid) {
      console.log(this.register.value);
      this.authService.registerForm(this.register.value).subscribe({
        next: (res) => {
          console.log(res.token);
          localStorage.setItem("token", res.token);
          localStorage.setItem("role", res.user.role);
          this.toastrService.success("Account created succesfully", "Jop Portal")
          setTimeout(() => {
            this.router.navigate(["/job-list"]);
          }, 500);

        }
      })
    }
    else {
      this.register.markAllAsTouched()
    }

  }



}
