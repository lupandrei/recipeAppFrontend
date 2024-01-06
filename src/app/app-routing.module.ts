import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/user-auth/login/login.component';
import { SignUpComponent } from './components/user-auth/sign-up/sign-up.component';
import { NavbarComponent } from './components/navigation/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FilterComponent } from './components/filter/filter.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RecipePageComponent } from './components/recipe-page/recipe-page.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { SearchUsersComponent } from './components/search-users/search-users.component';
import { SearchRecipesComponent } from './components/search-recipes/search-recipes.component';
import { LoginGuardService } from './services/guard/login-guard.service';
import { LoggedInGuardService } from './services/guard/logged-in-guard.service';
import { SavedRecipesComponent } from './components/saved-recipes/saved-recipes.component';
import { NotificationsComponent } from './components/notification/notifications/notifications.component';

const routes: Routes = [
  {path: '',component:LoginComponent,canActivate:[LoginGuardService]},
  {path: 'sign-up',component:SignUpComponent,canActivate:[LoginGuardService]},
  {path:'navbar',component:NavbarComponent,canActivate:[LoggedInGuardService]},
  {path:'home',component:HomeComponent,canActivate:[LoggedInGuardService]},
  {path:'filter',component:FilterComponent,canActivate:[LoggedInGuardService]},
  {path:'add',component:AddRecipeComponent,canActivate:[LoggedInGuardService]},
  {path:'profile',component:ProfileComponent,canActivate:[LoggedInGuardService]},
  {path:'recipe',component:RecipePageComponent,canActivate:[LoggedInGuardService]},
  {path:'search-users',component:SearchUsersComponent,canActivate:[LoggedInGuardService]},
  {path:'search-recipes',component:SearchRecipesComponent,canActivate:[LoggedInGuardService]},
  {path:'saved-recipes',component:SavedRecipesComponent,canActivate:[LoggedInGuardService]},
  {path:'notifications',component:NotificationsComponent,canActivate:[LoggedInGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    ) {
      this.matIconRegistry.addSvgIcon(
        'home',this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/home.svg')
      )
      .addSvgIcon(
        'profile',this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/profile.svg')
      )
      .addSvgIcon(
        'notification',this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/notification.svg')
      )
      .addSvgIcon(
        'saved',this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/saved.svg')
      )
      .addSvgIcon(
        'add',this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/add.svg')
      )
      .addSvgIcon(
        'rating',this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/rating.svg')
      )
      .addSvgIcon(
        'clock',this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/clock.svg')
      )
      .addSvgIcon(
        'filter',this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/filter.svg')
      )
      .addSvgIcon(
        'delete',this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/delete.svg')
      )
      .addSvgIcon(
        'pen',this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/pen.svg')
      )
      .addSvgIcon(
        'arrow-back',this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/arrow-back.svg')
      )
      .addSvgIcon(
        'search',this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/search.svg')
      )
      .addSvgIcon(
        'check',this.sanitizer.bypassSecurityTrustResourceUrl('../assets/svgs/check.svg')
      )
    }  
}
