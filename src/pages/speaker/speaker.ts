/**
 * Created by Administrator on 2016/11/7.
 */
import {Component} from '@angular/core';
import {NavController, ActionSheetController, Config} from "ionic-angular";
import {ConfigData} from "../provide/config-data";
import {ScheduleDetailPage} from "../schedule-detail/schedule-detail";
import {SpeakerDetailPage} from "../speaker-detail/speak-detail";
import {InAppBrowser} from "ionic-native";

@Component({
    selector: 'page-speaker',
    templateUrl: 'speaker.html'
})
export class SpeakerPage {

    speakers: any

    constructor(public navCtrl: NavController, public configData: ConfigData,
                public actionCtrl: ActionSheetController,
                public conf: Config) {
        this.configData.getSpeakers().then(speakers => {
            return this.speakers = speakers;
        })
    }

    openContact(speaker) {
        let mode = this.conf.get("mode")
        let action = this.actionCtrl.create({
            title: "联系" + speaker.name,
            buttons: [
                {
                    text: `Email (${speaker.email})`,
                    icon: mode !== 'ios' ? 'mail' : null,
                    handler: ()=> {
                        window.open('mailto:' + speaker.email);
                    }
                },
                {
                    text: `Call (${speaker.phone})`,
                    icon: mode !== 'ios' ? 'phone' : null,
                    handler: ()=> {
                        window.open('tel:' + speaker.phone);
                    }
                },
            ]
        });
        action.present();

    }

    goToSessionDetail(session) {
        this.navCtrl.push(ScheduleDetailPage, session);
    }

    goToSpeakerDetail(speak) {
        this.navCtrl.push(SpeakerDetailPage, speak)
    }

    goToSpeakerTwitter(speak) {
        let app = new InAppBrowser(`https://twitter.com/${speak.twitter}`, '_blank');
        app.on('loadstop').subscribe(
            (ev) => {
                console.log('InAppBrowser loaded!');
            });

    };

    openSpeakerShare(speaker) {

        let mode = this.conf.get("mode")
        let action = this.actionCtrl.create({
            title: "分享" + speaker.name,
            buttons: [
                {
                    text:  'Copy Link',
                    icon: mode !== 'ios' ? 'mail' : null,
                    handler: ()=> {
                        console.log('Copy link clicked on https://twitter.com/' + speaker.twitter);
                        if (window['cordova'] && window['cordova'].plugins.clipboard) {
                            window['cordova'].plugins.clipboard.copy('https://twitter.com/' + speaker.twitter);
                        }
                    }
                },
                {
                    text: 'Share via ...',
                    handler: () => {
                        console.log('Share via clicked');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });
        action.present();

    }

}
