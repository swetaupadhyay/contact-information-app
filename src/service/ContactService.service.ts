import { Injectable } from '@angular/core';
import { Contact } from '../model/Contact.model';
import { Http, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs';

import { HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable()
export class ContactService {
    private headers: Headers;
    private apiUrl = 'contacts';
    private observableContactResult: Observable<Contact[]>;
    private contacts: Contact[];
    private errorMessage: String;
    private baseUrl ='http://localhost:8080/evolent/';
    private createUrl = 'contacts/create';
    private deleteUrl = 'contacts/delete';
    

    private _listners = new Subject<any>();
    private appComponent = new Subject<any>();
    appComponentMethod = this.appComponent.asObservable();
    
    listen(): Observable<any> {
       return this._listners.asObservable();
    }

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
       
    }


    findAll(): Observable<Contact[]> {
        let myParams = new URLSearchParams();
        let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
       
        this.observableContactResult = this.http.get(this.baseUrl+this.apiUrl)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
        this.observableContactResult.subscribe(contactResult => this.contacts = contactResult,
            error => this.errorMessage = <any>error);

        return this.observableContactResult;
    }

    getContacts(): Contact[]{

        return this.contacts;
    }

    createContact(contact: Contact) {
        // Observable string sources
        this.http.post(this.baseUrl+this.createUrl, contact)
            .subscribe(
                data => {
                    console.log("POST Request is successful ", data);
                    this.appComponent.next();
                },
                error => {

                    console.log("Error", error);

                }

            );
     }

     deleteContact(id: number) {
        // Observable string sources
        this.http.delete(this.baseUrl+this.deleteUrl+'/'+id)
            .subscribe(
                data => {
                    this.appComponent.next();
                    console.log("Delete Request is successful ", data);
                    
                },
                error => {

                    console.log("Error", error);

                }

            );
           
     }

}