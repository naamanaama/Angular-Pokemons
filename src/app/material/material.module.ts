import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
          MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatToolbarModule ,
          MatCardModule
        } from '@angular/material';



const MaterialComponent = [ MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
    MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule, MatSlideToggleModule, MatToolbarModule, MatCardModule]
@NgModule({
  declarations: [],
  imports: [MaterialComponent],
  exports: [MaterialComponent]
})
export class MaterialModule { }
