import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'question-one',
    loadChildren: () => import('./Question/question-one/question-one.module').then( m => m.QuestionOnePageModule)
  },
  {
    path: 'question-two',
    loadChildren: () => import('./Question/question-two/question-two.module').then( m => m.QuestionTwoPageModule)
  },
  {
    path: 'question-three',
    loadChildren: () => import('./Question/question-three/question-three.module').then( m => m.QuestionThreePageModule)
  },
  {
    path: 'otp',
    loadChildren: () => import('./otp/otp.module').then( m => m.OtpPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }