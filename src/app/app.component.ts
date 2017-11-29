import { Component } from '@angular/core';
import {Title} from '@angular/platform-browser';
// import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Splash Forum';

  constructor(/*private translate: TranslateService, private titleSrv: Title*/) {
/*
    translate.addLangs(['en', 'de', 'ru']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de|ru/) ? browserLang : 'en');

    // console.log(translate.instant( 'menu.home' ));
    // this.titleSrv.setTitle( translate.instant( 'site.title' ));
    titleSrv.setTitle( translate.instant( 'site.title' ));
*/
  }

  public setTitle( newTitle: string) {
    // this.titleSrv.setTitle( newTitle );
  }
}
