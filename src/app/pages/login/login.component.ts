import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CarouselModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);


  imgs: string[] = [
    "/job-vacancy-background-with-chair-flat-style_23-2147875408.avif",
    "/4574122.jpg",
    "/job-hunting_23-2147503011.avif"
  ]

  login: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z]\w{7,}$/)])
  })

  customOptions: OwlOptions = {
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

  submitLogin(): void {
    if (this.login.valid) {
      this.authService.loginForm(this.login.value).subscribe({
        next: (res) => {
          this.toastrService.success("Success", "Jop Portal")
          setTimeout(() => {
            localStorage.setItem("token", res.token);
            localStorage.setItem("role", res.user.role);

            this.router.navigate(["/job-list"]);

          }, 500);

        }
      })

    } else {
      this.login.markAllAsTouched();
    }
  }

}
