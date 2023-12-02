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

const routes: Routes = [
  {path: '',component:LoginComponent},
  {path: 'sign-up',component:SignUpComponent},
  {path:'navbar',component:NavbarComponent},
  {path:'home',component:HomeComponent},
  {path:'filter',component:FilterComponent},
  {path:'add',component:AddRecipeComponent},
  {path:'profile',component:ProfileComponent},
  {path:'recipe',component:RecipePageComponent}
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
    }  
}
