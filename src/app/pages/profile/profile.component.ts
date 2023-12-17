import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UsersService } from 'src/services/users.service';
import { userModel } from 'src/shared/usermodel.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  UpdateUserForm!: FormGroup
  userData: any;
  deleteUserProfile: any;
  formObjectModel:userModel = new userModel()
  constructor(private fb: FormBuilder, private userSrv: UsersService) { }
  ngOnInit(): void {
    this.updateProfile();
    this.updateForm();
    this.getUserData();
  }
  getUserData() {
    this.userSrv.getUserApi().subscribe((response: any) => {
      this.userData = response;
    })
  }

  get input(): { [key: string]: AbstractControl } {
    return this.UpdateUserForm.controls;
  }
  updateProfile() {
    this.UpdateUserForm =this.fb.group({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    });
  }
  onEdit(row:any){
    this.formObjectModel.id = row.id;
    this.UpdateUserForm.controls['firstName'].setValue(row.firstName);
    this.UpdateUserForm.controls['lastName'].setValue(row.lastName);
    this.UpdateUserForm.controls['email'].setValue(row.email);
  }
  updateForm() {
    this.formObjectModel.firstName = this.UpdateUserForm.value.firstName;
    this.formObjectModel.lastName = this.UpdateUserForm.value.lastName;
    this.formObjectModel.email = this.UpdateUserForm.value.email;

    this.userSrv.updateUserApi(this.formObjectModel,this.formObjectModel.id).subscribe((response) =>{
      this.UpdateUserForm.reset();
      this.UpdateUserForm.reset();
       this.getUserData();
    })
  }
  DeletProfile(row: any) {
    this.userSrv.deleteUserApi(row.id).subscribe((res) => {
      this.deleteUserProfile = res;
      this.getUserData();
    })
  }
}
