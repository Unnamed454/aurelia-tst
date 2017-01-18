import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {inject} from 'aurelia-framework';
import {ContactAdded} from './messages';

@inject(WebAPI, EventAggregator)
export class ContactAdd {
  constructor(private api: WebAPI, private ea: EventAggregator) { }

  activate(){
    this.ea.publish(new ContactAdded());
  }
}
