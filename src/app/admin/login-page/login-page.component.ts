import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IUser} from '../shared/interfaces/user';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public form: FormGroup;
  public isDisabledButton: boolean = false;
  public message: string;

  constructor(public authService: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.buildForm();
    this.subscribeToQueryParams();
  }

  public submit(): void {
    const user: IUser = this.form.value;
    this.isDisabledButton = true;
    this.authService.login(user).subscribe(() => {
      this.router.navigate(['/admin', 'dashboard']);
    }, (error) => {console.log(error); this.isDisabledButton = false});
  }

  private buildForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  private subscribeToQueryParams(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params.loginFirst) {
        this.message = 'First you need to login.';
      }
    });
  }
}
