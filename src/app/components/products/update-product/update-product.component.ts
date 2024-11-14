import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class UpdateProductComponent implements OnInit {
  productForm: FormGroup;
  @Input() product!: Product;
  @ViewChild('modalContainer', { static: true }) modalContainer!: ElementRef;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private productsService: ProductsService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(300)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      price: ['', [Validators.required, Validators.min(0.01)]],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    if (this.product) {
      this.productForm.patchValue(this.product);
    }
  }

  ngAfterViewInit(): void {
    if (this.modalContainer) {
      this.modalContainer.nativeElement.focus();
    }
  }

  save() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const updatedProduct: Product = {
      ...this.product,
      ...this.productForm.value
    };

    this.productsService.updateProduct(updatedProduct.id, updatedProduct).subscribe(
      (product: Product) => {
        Swal.fire({
          icon: 'success',
          title: 'Producto actualizado',
          text: 'El producto ha sido actualizado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        this.activeModal.close(product);
      },
      error => {
        console.error('Error al actualizar el producto', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar el producto. Inténtelo de nuevo más tarde.'
        });
      }
    );
  }

  cancel() {
    this.activeModal.dismiss();
  }
}
