import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  constructor(
    private fromBuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.signupForm = this.fromBuilder.group({
      name: [''],
      age: [''],
      email: [''],
      password: [''],
    });
  }

  signUp() {
    this.api.signUp(this.signupForm.value).subscribe(
      (res) => {
        alert('Signup Successful');
        this.signupForm.reset();
        this.router.navigate(['login']);
      },
      (err) => {
        alert(err?.error?.info[0]?.msg);
        
      }
    );
  }
}


export interface SignUp {
  email: string;
  password: string;
  age:number;
  name:string
}