import { Component } from '@angular/core';


// Component decorator allows you to mark a class 
// as an Angular component and provide 
// additional metadata that determines 
// how the component should be processed, 
// instantiated and used at runtime.
// for more info on the component decorator and component metadata,
// see documentation here: https://angular.io/api/core/Component
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  
}
