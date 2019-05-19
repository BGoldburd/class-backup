import { Component, Input } from '@angular/core';
import { Category } from 'src/app/shared/category';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.css']
})
export class CategoryInfoComponent {
  @Input()
  category: Category;
}
