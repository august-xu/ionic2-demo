/**
 * Created by Administrator on 2016/10/31.
 */
import {Injectable} from '@angular/core';
import {Events} from "ionic-angular";
import {Storage} from '@ionic/storage'
import {UserComponent} from "../user/user";


@Injectable()
export class UserData {

    _favorites = [];
    HAS_LOGIN_IN = "hasLoginIn";

    REGEIST_USER:UserComponent[]=[]

    constructor(public storage: Storage, public event: Events) {
    }

    hasFavorite(sessionName) {

        return this._favorites.indexOf(sessionName) > -1;

    }

    addFavorite(sessionName) {
        this._favorites.push(sessionName);
    }

    removeFavorite(sessioName) {
        let index = this._favorites.indexOf(sessioName);

        if (index > -1) {
            this._favorites.splice(index, 1)
        }

    }

    login(username: string) {
        this.storage.set(this.HAS_LOGIN_IN,true)
        this.storage.set("username",username);
        this.event.publish("user:login");
    }

    hasLoggedIn() {
        return this.storage.get(this.HAS_LOGIN_IN).then(value => {
            console.log("是否登陆:"+value)
            return value === true;

        })
    }

    logout() {
        this.storage.remove("username");
        this.storage.remove(this.HAS_LOGIN_IN)
        this.event.publish("user:loginOut");
    }

    regeist(mobile: string, password: string) {

        let  user=new UserComponent()

        user.mobile=mobile
        user.password=password;

        this.REGEIST_USER.push(user)


    }

    getLatestRegeist() {
       return this.REGEIST_USER.splice(this.REGEIST_USER.length-1,1)[0]
    }
}