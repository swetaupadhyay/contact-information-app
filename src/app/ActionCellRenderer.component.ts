import { Component } from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { ContactService } from 'src/service/ContactService.service';


@Component({
    selector: 'child-cell',
    template: `<span style="padding-bottom: 10px;">
                <button class="btn btn-primary" (click)="deleteContact()">Delete</button>
              </span>`,
    styles: [
        `.btn {
            line-height: 0.5
        }`
    ]
})
export class ActionCellRendererComponent implements ICellRendererAngularComp {
    private params: any;
    private allData: any;

    constructor(private _contactService:ContactService) { }
    
    deleteContact(){
     if( confirm("Are you sure, you want to delete this contact ? Contact Id:  " +this.params.value)){
        this._contactService.deleteContact(this.params.value);
     }

    }

    agInit(params: any): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        this.params = params;
        return true;
    }
}