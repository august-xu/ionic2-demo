import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';

declare var AMap;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage {

    @ViewChild('container') mapElement: ElementRef;
    container: any;



    constructor(public navCtrl: NavController,
                public platform: Platform) {


    }


    ionViewDidLoad() {
        this.platform.ready().then(() => {

            this.createMap();

        });
    }

    changePostion(){
        var map = new AMap.Map(this.mapElement.nativeElement, {
            zoom: 14,
            center: [116.4135540000, 39.9110130000]
        });

        new AMap.Marker({
            position: [116.4135540000, 39.9110130000],
            map: map
        });


        //构建信息窗体中显示的内容
          var info = [];
         info.push("<div><img src=\" http://webapi.amap.com/images/autonavi.png \"/> ");
         info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德地图</b>");
         info.push("北京灯市口国旅大厦</div></div>");
         var infoWindow = new AMap.InfoWindow({
         content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
         });
         infoWindow.open(map, [116.4135540000, 39.9110130000]);


    }



    // 创建地图
    createMap() {
        console.log("准备创建地图。。。。。")

        // create map

       var map = new AMap.Map(this.mapElement.nativeElement, {
            zoom: 11,
            center: [116.4135540000, 39.9110130000]
        });

        // create toolBar
        map.plugin(["AMap.ToolBar"], function () {
            this.map.addControl(new AMap.ToolBar());
        });

        // create marker
        new AMap.Marker({
            position: [116.4135540000, 39.9110130000],
            map: map
        });


        //构建信息窗体中显示的内容
      /*  var info = [];
        info.push("<div><img src=\" http://webapi.amap.com/images/autonavi.png \"/> ");
        info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德地图</b>");
        info.push("北京朝阳区校尉胡同68号楼</div></div>");
        var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        });
        infoWindow.open(map, [116.4135540000, 39.9110130000]);*/

    }

    // 获取当前位置
    getCurrentPosition() {
        var mapObj = new AMap.Map('iCenter');
        mapObj.plugin('AMap.Geolocation', function () {
            var geolocation = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            mapObj.addControl(geolocation);
            //获取当前位置
            geolocation.getCurrentPosition();


            //返回定位信息
            AMap.event.addListener(geolocation, 'complete', function (result) {
                console.debug(result);
                if (result.info != "SUCCESS") {
                    return;
                }
                var lng = result.position.lng;
                var lat = result.position.lat;
                console.debug(lng + "," + lat);
                // 根据经纬度获取编码地址

            });

            //返回定位出错信息
            AMap.event.addListener(geolocation, 'error', function (error) {
                console.debug(error);
            });
        });
    }

    // 根据经纬度获取编码地址
    getGeoCoder(lng, lat) {
        AMap.service('AMap.Geocoder', function () {
            var geocoder = new AMap.Geocoder();
            var lnglatXY = [lng, lat]
            geocoder.getAddress(lnglatXY, function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    console.debug(result.regeocode.formattedAddress)

                } else {
                    console.debug('get address error')
                }
            });
        })
    }

    // 显示窗体
    showInfoWindow(map: any, address: String) {
        //构建信息窗体中显示的内容
        var info = [];
        info.push("<div><img src=\" http://webapi.amap.com/images/autonavi.png \"/> ");
        info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>高德软件有限公司</b>");
        info.push("电话 : 010-84107000   邮编 : 100102");
        info.push("地址 : " + address + "</div></div>");
        var infoWindow = new AMap.InfoWindow({
            content: info.join("<br/>")  //使用默认信息窗体框样式，显示信息内容
        });
        infoWindow.open(map, [116.480983, 39.989628]);
    }
}  