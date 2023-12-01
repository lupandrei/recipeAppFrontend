import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user-auth/login/login.component';
import { SignUpComponent } from './components/user-auth/sign-up/sign-up.component';
import { SignInAlternativeComponent } from './components/user-auth/sign-in-alternative/sign-in-alternative.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FilterComponent } from './components/filter/filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DishesWrapperComponent } from './components/home/dishes-wrapper/dishes-wrapper.component';
import { DishCardComponent } from './components/home/dish-card/dish-card.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { HeaderComponent } from './components/navigation/header/header.component';
import { RecipeDataFormComponent } from './components/add-recipe/recipe-data-form/recipe-data-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDataComponent } from './components/profile/user-data/user-data.component';
import { FullImageDisplayWrapperComponent } from './components/dishes-displays/full-image-display-wrapper/full-image-display-wrapper.component';
import { FullImageDisplayComponent } from './components/dishes-displays/full-image-display/full-image-display.component';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import {HttpClientModule} from '@angular/common/http'
import { UserService } from './services/user.service';
import { MatSnackBarModule} from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SignInAlternativeComponent,
    NavbarComponent,
    HomeComponent,
    FilterComponent,
    DishesWrapperComponent,
    DishCardComponent,
    AddRecipeComponent,
    HeaderComponent,
    RecipeDataFormComponent,
    ProfileComponent,
    UserDataComponent,
    FullImageDisplayWrapperComponent,
    FullImageDisplayComponent,
    RecipePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
