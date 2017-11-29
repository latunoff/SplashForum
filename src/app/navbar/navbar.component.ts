import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Title} from '@angular/platform-browser';
// import {langs} from '../../i18n/langs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn = false;
  user = null;
  langs = [{
      name: 'English',
      link: 'en'
    },
    {
      name: 'Deutsch',
      link: 'de'
    },
    {
      name: 'Русский',
      link: 'ru'
    }
  ];

  constructor(private router: Router,
              private translate: TranslateService,
              private titleSrv: Title) {
    translate.addLangs(['en', 'de', 'ru']);
    translate.setDefaultLang('en');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de|ru/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.titleSrv.setTitle( this.translate.instant( 'Splash Forum' ));

    const local = localStorage.getItem('loggedUser');
    if (local != null && local !== 'null') {
      this.loggedIn = true;
      this.user = local;
    }
  }

  langChange(lang: string) {
    this.translate.use(lang);
    this.titleSrv.setTitle( this.translate.instant( 'site.title' ));
  }

  isActive(url) {
    return this.router.isActive(url, true);
  }

  logout() {
    localStorage.setItem('loggedUser', null);
    this.loggedIn = false;
    this.user = null;
    if (window.location.href === 'http://localhost:4000/') {
      location.reload();
    } else {
      window.location.replace('/');
    }
  }
}
