import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../hyderabad-messages/services/message.service';

@Component({
  selector: 'hyd-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  constructor(public messageService: MessageService) {}

  ngOnInit() {}
}
