import {Component} from '@angular/core';

import {NavController, AlertController} from 'ionic-angular';

import {UserData} from "../provide/user.service";
import {TabsPage} from "../tabs/tabs";
import {SignUpPage} from "../signup/signup.page";
import {UserComponent} from "../user/user";


@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    login: {username?: string, password?: string} = {};
    submitted = false;

    constructor(public navCtrl: NavController, public userData: UserData, public alertCtrl: AlertController) {


    }

    onLogin(form) {
        this.submitted = true;

        if (form.valid) {

            this.userData.login(this.login.username);
            this.navCtrl.push(TabsPage);


        }
    }

    onSignup() {
        this.navCtrl.push(SignUpPage);
    }

    ionViewDidLoad() {

        let user: UserComponent = this.userData.getLatestRegeist();

        this.login.username = user.mobile  || '';
        this.login.password = user.password || '';

    }


}
