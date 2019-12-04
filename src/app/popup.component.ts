import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ShowPopupService } from '../service/ShowPopup.service';
import { Contact } from 'src/model/Contact.model';
import { FormGroup, FormControl, FormsModule, FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/service/ContactService.service';

@Component({
  selector: 'popup-window',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() title: string;
  contactForm: FormGroup;

  display = 'none';
  submitted = false;

  
  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.minLength(6)]]
    });
  
}

  constructor(private _showPopupService: ShowPopupService, private _contactService: ContactService, private formBuilder: FormBuilder) {

    this._showPopupService.listen().subscribe((m: any) => {
      this.title = m;
      this.openModal();
    });

  }

  openModal() {
    this.display = 'block';

  }
  get f() { 
    return this.contactForm.controls; 
  }
  onCreateContact() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.contactForm.invalid) {
      return;
    }
    this.display = 'none';
    let contact: Contact = new Contact();
    contact = this.contactForm.value;
    this._contactService.createContact(contact);

  }
  onCloseHandled() {
    this.display = 'none';
  }

}
