/**
 * Created by Administrator on 2016/11/7.
 */
import { Component } from '@angular/core';
import {NavController, NavParams} from "ionic-angular";

@Component({
    selector: 'page-scheduledetail',
    templateUrl: 'schedule-detail.html'
})
export class ScheduleDetailPage {

    session:any

    constructor(public navParam:NavParams) {
        this.session=this.navParam.data;
    }

}
