import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product.model';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    HttpClientModule,
    RouterModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'description', 'price', 'quantity', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  searchFilter: string = '';
  products: Product[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  

  constructor(
    private productsService: ProductsService,
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
      this.dataSource.data = products;
      this.dataSource.filterPredicate = this.createCustomFilter();
    }, error => {
      console.error('Error loading products:', error);
    });
  }
  goToOrders() {
    this.router.navigate(['/orders']); 
  }

  searchProducts(): void {
    this.applyFilter(this.searchFilter);
  }

  applyFilter(filter: string): void {
    filter = filter.trim().toLowerCase();
    this.dataSource.filter = filter;
  }

  createCustomFilter(): (product: Product, filter: string) => boolean {
    return (product: Product, filter: string): boolean => {
      const dataStr = `${product.name?.toLowerCase()} ${product.description?.toLowerCase()} ${product.price} ${product.quantity}`;
      return dataStr.indexOf(filter) !== -1;
    };
  }

  openAddModal(): void {
    const modalRef = this.modalService.open(AddProductComponent);
    modalRef.result.then((result) => {
      if (result) {
        const newProduct = result;
        this.dataSource.data.push(newProduct);
        this.dataSource.data = [...this.dataSource.data];
        this.applyFilter(this.searchFilter);
      }
    }).catch((error) => {
      console.log('Modal closed with error:', error);
    });
  }

  openEditModal(product: Product): void {
    const modalRef = this.modalService.open(UpdateProductComponent);
    modalRef.componentInstance.product = product;
    modalRef.result.then((edited) => {
      if (edited) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(id: number): void {
    this.productsService.deleteProduct(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(p => p.id !== id);
    }, error => {
      console.error('Error deleting product:', error);
    });
  }

logout(): void {
  Swal.fire({
    title: '¿Estás seguro?',
    text: "¿Deseas cerrar la sesión?",
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#dc3545',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('user');
      Swal.fire({
        title: '¡Hasta pronto!',
        text: 'Has cerrado sesión exitosamente',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        this.router.navigate(['/login']);
      });
    }
  });
}
}
