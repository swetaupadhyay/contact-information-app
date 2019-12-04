import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { environment } from 'src/environments/environment';
import { Contact } from 'src/model/Contact.model';


@Injectable()
export class ShowPopupService {
    private _listners = new Subject<any>();
  
    

    listen(): Observable<any> {
        return this._listners.asObservable();
    }

    filter() {
        this._listners.next('title');

    }
    private headers: Headers;
    private apiUrl = 'getDeviceProperties/';


    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');       
    }


   
}