import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
// import { TranslateModule, TranslateService } from 'angular4-translate';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { routing } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './404/404.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewComponent } from './new/new.component';
import { HistoryComponent } from './history/history.component';
import { ThreadComponent } from './thread/thread.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavbarComponent,
    NewComponent,
    HistoryComponent,
    ThreadComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    // TranslateModule.forRoot(dictionary),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor( private translate: TranslateService ) {    this.translate.setDefault('en');  }
}
