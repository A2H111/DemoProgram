import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'appmodalwindowcomponent',
  templateUrl: './modal-window.component.html'
})
export class ModalWindowComponent implements OnInit {

  @Input() modalpopup_header:any;
  @Input() modal_body_content:any;

  constructor(public _modalWindow: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
