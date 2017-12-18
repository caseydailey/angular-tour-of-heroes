import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  // the message service property must be public
  // angular only binds to public component properties
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
