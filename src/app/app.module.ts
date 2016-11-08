import {NgModule} from '@angular/core';
import {IonicApp, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';
import {Schedele} from '../pages/schedule/schedule';
import {Page2} from '../pages/page2/page2';
import {TabsPage} from "../pages/tabs/tabs";
import {TutorialPage} from "../pages/tutorial/tutorial";
import {UserComponent} from "../pages/user/user";
import {MapPage} from "../pages/map/map";
import {ConfigData} from "../pages/provide/config-data";
import {UserData} from "../pages/provide/user.service";
import {Storage} from "@ionic/storage"
import {LoginPage} from "../pages/login/login.page";
import {SignUpPage} from "../pages/signup/signup.page";
import {ScheduleDetailPage} from "../pages/schedule-detail/schedule-detail";
import {SpeakerPage} from "../pages/speaker/speaker";
import {SpeakerDetailPage} from "../pages/speaker-detail/speak-detail";
import {AboutPage} from "../pages/about/about";
import {PopoverPage} from "../pages/about-popover/about-popover";
import {ChartsModule} from 'ng2-charts/ng2-charts.d.ts'

@NgModule({
    declarations: [
        MyApp,
        Schedele,
        Page2,
        TabsPage,
        UserComponent,
        TutorialPage,
        MapPage,
        LoginPage,
        SignUpPage,
        ScheduleDetailPage,
        SpeakerPage,
        SpeakerDetailPage,
        AboutPage,
        PopoverPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),ChartsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        Page2,
        Schedele,
        TabsPage,
        UserComponent,
        TutorialPage,
        MapPage,
        LoginPage,
        SignUpPage,
        ScheduleDetailPage,
        SpeakerPage,
        SpeakerDetailPage,
        AboutPage,
        PopoverPage
    ],
    providers: [ConfigData,UserData,Storage]
})
export class AppModule {
}
