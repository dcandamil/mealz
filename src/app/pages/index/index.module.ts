import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonFabButton, IonicModule, IonIcon } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IndexPage],
  providers: [IonFabButton, IonIcon]
})
export class IndexPageModule {}
