import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[formFieldPermission]' })
export class FormFieldPermissionDirective implements AfterViewInit {
  @Input() form: any;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    this.elementRef.nativeElement.querySelectorAll('[formControlName').forEach(element => {
      console.log(`Element: ${element.getAttribute('formControlName')}`);
      if (this.form.controls[element.getAttribute('formControlName')] === undefined) {
        element.parentElement.style.visibility = 'hidden';
      }
    });
  }
}
