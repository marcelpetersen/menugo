import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { iSetting } from '../../interfaces/setting.interface';
import { DbService } from '../../services/db.service';
import { AuthService } from '../../services/auth.service';
import { LocalService } from '../../services/local.service';
// import { AngularFireService } from '../../services/af.service';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  mySettings: iSetting;
  isSigned;
  isAdmin: boolean = false;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localService: LocalService,
    private dbService: DbService,
    private authService: AuthService,
    private afAuth: AngularFireAuth
  ) {
    
    this.mySettings = this.localService.DEFAULT_SETTING;
    console.log('constructor inside')
    this.isSigned = this.afAuth.auth.currentUser;
    if (this.isSigned) {
      this.authService.isAdmin(this.afAuth.auth.currentUser.email).then((res: boolean) => {
        console.log(res);
        this.isAdmin = res;
      })
    }
    console.log(this.isSigned);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');

  }

  go2AccountPage(action: string) {
    this.navCtrl.push('AccountPage', { action: action })
  }

  onSignOut() {
    this.afAuth.auth.signOut()
      .then(() => {
        console.log('user logged out!');
        this.localService.isProfileLoaded = false;
      })
    this.navCtrl.setRoot('MapPage');
  }

  go2ProfilePage() {
    console.log('edit profile page');
    this.navCtrl.push('ProfilePage');
  }

  go2YourSellItemPage() {
    this.navCtrl.push('YourSellItemPage', this.afAuth.auth.currentUser.uid);
  }

  go2FavoriteViewPage() {
    this.navCtrl.push('FavoriteViewPage', this.afAuth.auth.currentUser.uid);
  }

  go2SuggestionPage(){
    // this.navCtrl.push('SuggestionPage');
    this.navCtrl.push('SupportPage', { action: 'new-suggest'});
  }

  go2SupportPage(){
    this.navCtrl.push('SupportPage');
  }

  go2MsgBoxPage(){
    this.navCtrl.push('MsgboxPage');
  }

  // ionViewWillEnter() {
  //   this.mySettings = this.dbService.getSetting();
  //   // console.log('ionViewWillEnter', this.mySettings);
  // }

  go2UserManagement() {
    this.navCtrl.push('UserManagementPage');
  }

  go2ItemManagement() {
    this.navCtrl.push('ItemManagementPage');
  }

  go2FeedbackManagement(){
    this.navCtrl.push('FeedbackManagementPage');
  }

  // go2SuggestionManager(){
  //   this.navCtrl.push('SuggestionManagerPage')
  // }

  go2SupportManager(){
    this.navCtrl.push('SupportManagerPage');
  }


}
