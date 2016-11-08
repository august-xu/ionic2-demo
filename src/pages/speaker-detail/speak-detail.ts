/**
 * Created by Administrator on 2016/11/7.
 */
import { Component } from '@angular/core';
import {NavParams} from "ionic-angular";

@Component({
    selector: 'page-speakdetail',
    templateUrl: 'speakerdetail.html'
})
export class SpeakerDetailPage {
    speaker:any;

    constructor(public navParams:NavParams) {
        this.speaker=navParams.data;
    }


}
