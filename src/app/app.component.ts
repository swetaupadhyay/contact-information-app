import { Component, OnInit } from '@angular/core';
import {AllCommunityModules, GridApi, ColumnApi} from '@ag-grid-community/all-modules';
import { ContactService } from 'src/service/ContactService.service';
import { Contact } from 'src/model/Contact.model';
import { ShowPopupService } from 'src/service/ShowPopup.service';
import { ActionCellRendererComponent } from './ActionCellRenderer.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    private api: GridApi;
  private columnApi: ColumnApi;
    columnDefs = [
        {headerName: 'Id', field: 'id' },
        {headerName: 'First Name', field: 'firstName' },
        {headerName: 'Last Name', field: 'lastName' },
        {headerName: 'Email', field: 'email'},
        {headerName: 'Phone Number', field: 'phoneNumber'},
        {headerName: 'Status', field: 'status'},
        {headerName: 'Created Date', field: 'created',filter: "agDateColumnFilter"},
        {headerName: 'Updated Date', field: 'updated',filter: "agDateColumnFilter"},
        {
          headerName: "Action",
          field: 'id',
          enableValue: true,
          cellRendererFramework: ActionCellRendererComponent,
          colId: "params",
          width:150,
          suppressFilter: true,
        }
    ];
    private rowData: Contact[];

    constructor(private contactService: ContactService,private showPopupService: ShowPopupService) {
      this.contactService.appComponentMethod.subscribe(
        () => {
          this.contactService.findAll().subscribe(
            compareResults => {
              this.rowData = compareResults
            },
            error => {
              console.log(error);
            })
          }
          
          );
       
    
      }

    ngOnInit() {
        this.contactService.findAll().subscribe(
          compareResults => {
            this.rowData = compareResults
          },
          error => {
            console.log(error);
          }
        )
    
      }
      onGridReady(params): void {
        this.api = params.api;
        this.columnApi = params.columnApi;
        this.api.closeToolPanel();
        this.api.sizeColumnsToFit();
        //this.api.hideOverlay();
      }
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      }

    modules = AllCommunityModules;

   


 showFilterPopup(){
    this.showPopupService.filter();
  }
}