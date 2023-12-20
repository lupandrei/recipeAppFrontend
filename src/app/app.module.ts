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
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { UserService } from './services/user.service';
import { MatSnackBarModule} from '@angular/material/snack-bar'
import { CarouselModule } from 'ngx-owl-carousel-o';
import {MatIconModule} from '@angular/material/icon';
import { FullImageDisplayCarouselWrapperComponent } from './components/dishes-displays/full-image-display-carousel-wrapper/full-image-display-carousel-wrapper.component';
import { StepsComponent } from './components/recipe-page/steps/steps.component';
import { IngredientsComponent } from './components/recipe-page/ingredients/ingredients.component';
import { StepComponent } from './components/recipe-page/step/step.component';
import { IngredientComponent } from './components/recipe-page/ingredient/ingredient.component';
import { FollowUserComponent } from './components/follow/follow-user/follow-user.component';
import { SearchUsersComponent } from './components/search-users/search-users.component';
import { FollowUserWrapperComponent } from './components/follow/follow-user-wrapper/follow-user-wrapper.component';
import { SearchRecipesComponent } from './components/search-recipes/search-recipes.component';
import { SearchFilterBarComponent } from './components/search-users/search-filter-bar/search-filter-bar.component';
import { HttpInterceptorService } from './services/config/http-interceptor.service';
import { CookieServiceImpl } from './services/config/cookie.service';
import { JwtService } from './services/config/jwt.service';
import { LoginGuardService } from './services/guard/login-guard.service';
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
    RecipePageComponent,
    FullImageDisplayCarouselWrapperComponent,
    StepsComponent,
    IngredientsComponent,
    StepComponent,
    IngredientComponent,
    FollowUserComponent,
    SearchUsersComponent,
    FollowUserWrapperComponent,
    SearchRecipesComponent,
    SearchFilterBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    CarouselModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  }, JwtService,CookieServiceImpl, LoginGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
