import { Component, Input } from '@angular/core';
import { Category } from '../shared/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  @Input()
  categories: Category[];

  selectedIndex = 0;

  // rest of file non ngModel approach
  selectedCategory: Category;

  categorySelected(index: string) {
    this.selectedCategory = this.categories[+index];
  }
}
