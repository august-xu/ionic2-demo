/**
 * Created by Administrator on 2016/11/4.
 */
import {Component} from '@angular/core';
import {UserData} from "../provide/user.service";
import {NavController, AlertController} from "ionic-angular";
import {LoginPage} from "../login/login.page";

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.page.html'
})
export class SignUpPage {

    mobile: string
    password: string

    submitted: boolean = false;

    constructor(public user: UserData, public navCtrl: NavController, public alertCtrl: AlertController) {
    }

    onSignup(form) {
        this.submitted = true;

        if (form.valid) {
            this.user.regeist(this.mobile, this.password)

            let alert = this.alertCtrl.create({
                title: "注册成功",
                buttons: [
                    {
                        text: "确定",
                        handler: ()=> {
                            this.navCtrl.push(LoginPage)
                        }
                    }

                ]
            });
            alert.present();

        }

    }


}