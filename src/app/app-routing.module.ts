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
  {
    path: 'question-four',
    loadChildren: () => import('./Question/question-four/question-four.module').then( m => m.QuestionFourPageModule)
  },
  {
    path: 'question-five',
    loadChildren: () => import('./Question/question-five/question-five.module').then( m => m.QuestionFivePageModule)
  },
  {
    path: 'question-six',
    loadChildren: () => import('./Question/question-six/question-six.module').then( m => m.QuestionSixPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./result/result.module').then( m => m.ResultPageModule)
  },
  {
    path: 'selectitems/:tag',
    loadChildren: () => import('./selectitems/selectitems.module').then( m => m.SelectitemsPageModule)
  },
  {
    path: 'relative-select-page',
    loadChildren: () => import('./relative-select-page/relative-select-page.module').then( m => m.RelativeSelectPagePageModule)
  },
  {
    path: 'first-page-task',
    loadChildren: () => import('./first-page-task/first-page-task.module').then( m => m.FirstPageTaskPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
