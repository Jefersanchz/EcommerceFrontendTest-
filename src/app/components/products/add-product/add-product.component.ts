import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../../models/product.model';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
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

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.modalContainer) {
      this.modalContainer.nativeElement.focus();
    }
  }

  save(): void {
    // Log de validación para cada campo
    console.log('Formulario válido:', this.productForm.valid);
    console.log('Campo nombre válido:', this.productForm.get('name')?.valid);
    console.log('Campo descripción válido:', this.productForm.get('description')?.valid);
    console.log('Campo precio válido:', this.productForm.get('price')?.valid);
    console.log('Campo cantidad válido:', this.productForm.get('quantity')?.valid);

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }


    const newProduct: Product = this.productForm.value;

    this.productsService.saveProduct(newProduct).subscribe(
      (product: Product) => {
        Swal.fire({
          icon: 'success',
          title: 'Producto agregado',
          text: 'El producto se ha agregado correctamente',
          timer: 2000,
          showConfirmButton: false
        });
        this.activeModal.close(product);
      },
      error => {
        console.error('Error al agregar el producto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al agregar el producto. Inténtelo de nuevo más tarde.'
        });
      }
    );
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}
