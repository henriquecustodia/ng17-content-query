import {
  Component,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
  contentChild,
  contentChildren,
} from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-grand-child",
  standalone: true,
  template: ` <h1>grand-child</h1> `,
})
export class GrandChildComponent {
  constructor() {}

  ngOnInit() {}
}

@Component({
  selector: "app-child",
  standalone: true,
  template: `
    <h1>child</h1>
    <ng-content></ng-content>
  `,
})
export class ChildComponent {
  constructor() {}

  ngOnInit() {
    console.log('ahhhhhhhhhhhhhh');
    
  }
}

@Component({
  selector: "app-parent",
  standalone: true,
  template: `
    <h1>parent</h1>
    <ng-content></ng-content>
  `,
})
export class ParentComponent {

  // se não tiver uma refererência #childComponent no template um erro será lançado 
  childComponent = contentChild.required('childComponent');
  
  grandChildComponent = contentChild(GrandChildComponent);
  
  grandChildComponent2 = contentChild(GrandChildComponent, {
    descendants: false,
  });

  grandChildComponent3 = contentChild(GrandChildComponent, {
    descendants: true,
    read: ElementRef,
  });

  grandChildComponent4 = contentChildren(GrandChildComponent, {
    // descendants: true,
    read: ElementRef,
  });


  constructor() {}

  ngOnInit() {
    console.log("childComponent contentChild.required()", this.childComponent());
    console.log("grandChildComponent contentChild()", this.grandChildComponent());
    console.log("grandChildComponent2 contentChild(descendants: false)", this.grandChildComponent2());
    console.log("grandChildComponent3 contentChild(read: ElementRef)", this.grandChildComponent3());
    console.log("grandChildComponent4 contentChildren(read: ElementRef)", this.grandChildComponent4());
  }
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, ParentComponent, ChildComponent, GrandChildComponent],
  template: `
    <app-parent class="container">
      <app-child #childComponent class="container">
        <app-grand-child class="container" />
        <app-grand-child class="container" />
        <app-grand-child class="container" />
      </app-child>
    </app-parent>
  `,
  styles: [
    `
      .container {
        display: block;
        padding: 8px;
        border: 1px solid red;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
