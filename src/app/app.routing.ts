import { Routes, RouterModule } from '@angular/router';

import { HistoryComponent } from './history/history.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { NewComponent } from './new/new.component';
import { ThreadComponent } from './thread/thread.component';
import { PageNotFoundComponent } from './404/404.component';

const APP_ROUTES: Routes = [
    { path: '', component: HistoryComponent },
    { path: 'new', component: NewComponent },
    { path: 'thread/:number?', component: ThreadComponent },
    { path: 'user', component: UserComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
