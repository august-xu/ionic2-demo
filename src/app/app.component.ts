import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, MenuController, Events} from 'ionic-angular';
import {StatusBar, Splashscreen} from 'ionic-native';

import {Schedele} from '../pages/schedule/schedule';
import {TutorialPage} from "../pages/tutorial/tutorial";
import {LoginPage} from "../pages/login/login.page";
import {UserData} from "../pages/provide/user.service";
import {UserComponent} from "../pages/user/user";
import {TabsPage} from "../pages/tabs/tabs";
import {SignUpPage} from "../pages/signup/signup.page";
import {SpeakerPage} from "../pages/speaker/speaker";
import {MapPage} from "../pages/map/map";
import {AboutPage} from "../pages/about/about";


export interface PageObj {
    title: string,
    component: any,
    icon: string,
    index?: number,
    loginOut?: boolean

}
@Component({
    templateUrl: 'app.html'
})


export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = TutorialPage;

    isLogin = false;

    pages: PageObj[] = [
        {title: '日程', component: Schedele, icon: "calendar"},
        {title: '讲演人', component: SpeakerPage,index: 1, icon: "contacts"},
        {title: '地图', component: MapPage, index: 2,icon: "contacts"},
        {title: '关于', component: AboutPage, index: 3,icon: "contacts"}
    ];

    loginInPages: PageObj[] = [
        {title: '账户', component: UserComponent, icon: "person"},
        {title: '退出', component: TabsPage, icon: "log-out", loginOut: true}
    ];

    loginOutPages: PageObj[] = [
        {title: '登陆', component: LoginPage, icon: "log-in"},
        {title: '注册', component: SignUpPage, icon: "person-add"}
    ];


    constructor(public platform: Platform,
                public user: UserData,
                public menuCtrl: MenuController,
                public event: Events) {
        this.initializeApp();

        // used for an example of ngFor and navigation

        this.user.hasLoggedIn().then(value => {
            this.enableMenu(value)
        })
        this.listenToLoginEvent();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.index) {
            this.nav.setRoot(page.component, {tabIndex: page.index});

        } else {
            this.nav.setRoot(page.component);
        }

        if (page.loginOut === true) {
            // Give the menu time to close before changing to logged out
            setTimeout(() => {
                this.user.logout();
            }, 1000);
        }

    }

    enableMenu(shouldEnable) {
        this.menuCtrl.enable(shouldEnable, "loggedOutMenu")
        this.menuCtrl.enable(!shouldEnable, "loggedInMenu")

    }

    listenToLoginEvent() {

        this.event.subscribe("user:login", ()=> {

            this.enableMenu(true)
        });
        this.event.subscribe("user:loginOut", () => {

            this.enableMenu(false);
        })
        this.event.subscribe("user:signup", () => {

            this.enableMenu(false);
        })

    }


}
