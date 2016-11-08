import {Component, ViewChild} from '@angular/core';

import {NavController, AlertController, ModalController, App, List} from 'ionic-angular';
import {ConfigData} from "../provide/config-data";
import moment from 'moment'
import {UserData} from "../provide/user.service";
import {ScheduleDetailPage} from "../schedule-detail/schedule-detail";

@Component({
    selector: 'page-schedule',
    templateUrl: 'schedule.html'
})


export class Schedele {

    dayIndex = 0;
    queryText = '';
    segment = 'all';
    excludeTracks = [];
    shownSessions: any = [];
    groups = [];
    confDate: string;


    @ViewChild("scheduleList", {read: List}) scheduleList: List;


    constructor(public navCtrl: NavController,
                public alertCtrl: AlertController,
                public modalCtrl: ModalController,
                public configData: ConfigData,
                public app: App,
                public user: UserData) {

    }

    ionViewDidEnter() {

        this.app.setTitle("日程");
    }

    ngAfterViewInit() {
        this.updateSchedule();
    }

    updateSchedule() {
        this.scheduleList && this.scheduleList.closeSlidingItems();
        this.configData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).then(data => {
            let timestamp = data.data

            this.confDate = moment(timestamp).format("YYYY/MM/DD");
            this.shownSessions = data.shownSessions;
            this.groups = data.groups;
        })

    }

    goToSessionDetail(session){

        this.navCtrl.push(ScheduleDetailPage,session)

    }



    addFavorite(slidingItem, session) {

        if (this.user.hasFavorite(session.name)) {

            let alert = this.alertCtrl.create({

                    /*                title?: string;
                     subTitle?: string;
                     message?: string;
                     cssClass?: string;
                     inputs?: Array<AlertInputOptions>;
                     buttons?: Array<any>;
                     enableBackdropDismiss?: boolean;*/



                    title: "已添加过该项目",
                    buttons: [
                        {
                            text: "确定",
                            handler: ()=> {
                                console.log(session.name)
                                slidingItem.close();
                            }

                        },
                        {
                            text: "删除",
                            handler: ()=> {
                                console.log(session.name)
                                this.user.removeFavorite(session.name);
                                slidingItem.close();
                                this.updateSchedule();
                            },

                        }

                    ]
                }
            )

            alert.present();
        } else {

            this.user.addFavorite(session.name);

            let alert = this.alertCtrl.create({
                title: "添加成功",
                buttons: [
                    {
                        text: "确定",
                        handler: ()=> {
                            console.log(session.name)
                            slidingItem.close();
                        }

                    }

                ]
            });

            alert.present();


        }
    }

}
