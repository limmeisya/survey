import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FooterComponent } from './component/footer/footer.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { TrueFalsePipe } from './pipe/true-false.pipe';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    TrueFalsePipe
  ],
    exports: [
      FooterComponent,
      NavbarComponent,
      TrueFalsePipe
    ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
})
export class SharedModule {
}
