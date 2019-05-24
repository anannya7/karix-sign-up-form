import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableViewComponent } from './table-view/table-view.component';


const routes: Routes = [
 {
 	path:'view',
 	component: TableViewComponent
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
