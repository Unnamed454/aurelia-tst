import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {ContactUpdated, ContactViewed, ContactAdded} from './messages';
import {inject} from 'aurelia-framework';

@inject(WebAPI, EventAggregator)
export class ContactList {
  contacts;
  selectedId = 0;
  selectedNew: boolean = false;

  constructor(private api: WebAPI, ea: EventAggregator){
    ea.subscribe(ContactAdded, msg => this.newContact());
    ea.subscribe(ContactViewed, msg => this.select(msg.contact));
    ea.subscribe(ContactUpdated, msg => {
        let id = msg.contact.id;
        let found = this.contacts.find(x => x.id == id);
        Object.assign(found, msg.contact);
      });
  }

  created(){
    this.api.getContactList().then(contacts => this.contacts = contacts);
  }

  select(contact){
    this.selectedId = contact.id;
    this.selectedNew = false;

    return true;
  }

  newContact(){
    this.selectedNew = true;
    this.selectedId = 0;

    return true;
  }
}
