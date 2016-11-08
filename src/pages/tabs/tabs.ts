/**
 * Created by Administrator on 2016/10/28.
 */
import { Component} from '@angular/core';
import {Schedele} from "../schedule/schedule";
import {Page2} from "../page2/page2";
import {UserComponent} from "../user/user";
import {MapPage} from "../map/map";
import {SpeakerPage} from "../speaker/speaker";
import {AboutPage} from "../about/about";
import {NavParams} from "ionic-angular";

@Component({
    selector: 'tabs-page',
    templateUrl: 'tabs.html'
})
export class TabsPage  {

    tab1Root:any=Schedele;
    tab2Root:any=SpeakerPage;
    tab3Root:any=MapPage;
    tab4Root:any=AboutPage;
    mySelectedIndex: number;

    constructor(public navParam:NavParams) {
        this.mySelectedIndex = navParam.data.tabIndex || 0;
    }


}
