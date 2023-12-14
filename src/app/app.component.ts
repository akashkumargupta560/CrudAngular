import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularFile';
  userForm!: FormGroup;
  userData:any;
  constructor(private fb: FormBuilder, private userSrv:UsersService) { }
  ngOnInit(): void {
    this.baseForm();
    this.getUserData();
  }
  baseForm() {
    this.userForm =this.fb.group({
      firstName: new FormControl('',[Validators.required]),
      lastName: new  FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }
  get input(): { [key: string]: AbstractControl } {
    return this.userForm.controls;
  }
  submitForm() {
    if(this.userForm.valid){
      this.userSrv.postUserApi(this.userForm.value).subscribe((res:any) =>{
        console.log('userForm',res)
        this.userForm.reset();
      })
    }
  }
  getUserData(){
    this.userSrv.getUserApi().subscribe((response:any) =>{
      this.userData = response;
      console.log('profileData',this.userData)
    })
  }
}
