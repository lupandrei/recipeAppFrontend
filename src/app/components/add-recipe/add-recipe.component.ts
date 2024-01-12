import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
    title!:string;
    id!:number;
    constructor(private route: ActivatedRoute){}
    ngOnInit(): void {
      this.route.queryParams.subscribe(() => {
        this.id=window.history.state.id;
        if(this.id)
          this.title="Update Recipe"
        else
          this.title="Create Recipe"
      })
    }
}
