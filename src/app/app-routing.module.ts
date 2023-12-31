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

const routes: Routes = [
  {path: '',component:LoginComponent},
  {path: 'sign-up',component:SignUpComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'home',component:HomeComponent},
  {path:'filter',component:FilterComponent},
  {path:'add',component:AddRecipeComponent},
  {path:'profile',component:ProfileComponent},
  {path:'recipe',component:RecipePageComponent},
  {path:'search',component:SearchUsersComponent}
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
    }  
}
