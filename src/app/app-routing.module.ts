import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { CreateComponent } from './Components/create/create.component';
import { UpdateComponent } from './Components/update/update.component';
import { ParkingListComponent } from './Components/parking-list/parking-list.component';
import { VerifyComponent } from './Components/verify/verify.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'login',pathMatch:"full"},
  {path:'create',component:CreateComponent,canActivate:[AuthGuard]},
  {path:'update',component:UpdateComponent,canActivate:[AuthGuard]},
  {path:'parking-list',component:ParkingListComponent,canActivate:[AuthGuard]},
  {path:'verify',component:VerifyComponent,canActivate:[AuthGuard]},
  {path:'**',redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
