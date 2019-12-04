import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AgGridModule } from '@ag-grid-community/angular';
import {ContactService} from '../service/ContactService.service'
import {ShowPopupService} from '../service/ShowPopup.service';
import {PopupComponent} from './popup.component';
import {ActionCellRendererComponent} from './ActionCellRenderer.component';


@NgModule({
  declarations: [AppComponent,PopupComponent,ActionCellRendererComponent],
  imports: [
    BrowserModule,
    HttpModule,
     ReactiveFormsModule,
    FormsModule,
    AgGridModule.withComponents([PopupComponent,ActionCellRendererComponent])
  ],
  providers: [ContactService,ShowPopupService],
  bootstrap: [AppComponent]
})
export class AppModule {}