import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';  
import { Product } from '../../models/product.model';
import { OrdersService } from '../../services/orders.service';
import { ProductsService } from '../../services/products.service';
import { Orders } from '../../models/orders.model';

@Component({
  standalone: true,
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [CommonModule, FormsModule]
})
export class OrdersComponent implements OnInit {

  products: Product[] = [];
  orders: Orders[] = [];
  selectedQuantities: { [productId: number]: number } = {};  

  constructor(
    private ordersService: OrdersService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
    this.loadOrders();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    }, error => {
      console.error('Error al cargar productos:', error);
      this.showError('Error al cargar productos');
    });
  }

  loadOrders(): void {
    this.ordersService.getAllOrders().subscribe(orders => {
      this.orders = orders;
    }, error => {
      console.error('Error al cargar pedidos:', error);
      this.showError('Error al cargar pedidos');
    });
  }

  placeOrder(product: Product): void {
    const quantity = this.selectedQuantities[product.id] || 0;  

    if (quantity < 1) {
      this.showError('La cantidad debe ser mayor a 0');
      return;
    }

    const newOrder: Orders = {
      id: 0,  
      date: new Date(),  
      product: product,
      quantity: quantity,  
      total: product.price * quantity
    };

    this.ordersService.createOrder(newOrder).subscribe(
      (order) => {
        console.log('Pedido creado:', order);
        this.showSuccess('Pedido realizado con éxito');
        this.loadOrders();  
      },
      (error) => {
        console.error('Error al crear el pedido:', error);
        this.showError('Error al realizar el pedido');
      }
    );
  }

  deleteOrder(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ordersService.deleteOrder(id).subscribe(() => {
          this.orders = this.orders.filter(order => order.id !== id);
          this.showSuccess('Pedido eliminado con éxito');
        }, error => {
          console.error('Error al eliminar el pedido:', error);
          this.showError('Error al eliminar el pedido');
        });
      }
    });
  }

  showSuccess(message: string): void {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: message,
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-right'
    });
  }

  showError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: message,
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      position: 'top-right'
    });
  }
}
