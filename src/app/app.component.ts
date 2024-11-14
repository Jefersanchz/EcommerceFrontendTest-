import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';  
import { ProductsComponent } from './components/products/products.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsComponent, HttpClientModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  title = 'Ecommerce';
}