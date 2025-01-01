import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JWT_OPTIONS, JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './auth.interceptor';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { CreateComponent } from './Components/create/create.component';
import { UpdateComponent } from './Components/update/update.component';
import { ParkingListComponent } from './Components/parking-list/parking-list.component';
import { VerifyComponent } from './Components/verify/verify.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    CreateComponent,
    UpdateComponent,
    ParkingListComponent,
    VerifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    ToastrModule.forRoot({
      timeOut:2000,
      progressBar:true,
      closeButton:true,

    }),
    BrowserAnimationsModule,
    JwtModule
  ],
  providers: [{provide:JWT_OPTIONS,useValue:JWT_OPTIONS},JwtHelperService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
