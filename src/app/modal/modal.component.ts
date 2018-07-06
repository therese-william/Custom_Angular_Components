import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'ng-bsModal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ViewChild("commentInput") commentInput: ElementRef;
  @Input() Messages: string[] = [];
  @Input() Title: string = "";
  @Input() OKButton: string = "Ok";
  @Input() CancelButton: string = "Cancel";
  @Input() ModalType: string;
  @Input() IsEsc: boolean = true;

  @Output() ModalResult: EventEmitter<any> = new EventEmitter<any>();

  comment: string = "";
  showModal: boolean = false;

  constructor() { }

  ngAfterViewChecked() {
    try {
      if (this.commentInput && this.commentInput.nativeElement) {
        this.commentInput.nativeElement.focus();
      }
      //var editcomment = $("#comment");
      //if (editcomment && editcomment.length == 1) {
      //  $("#comment").focus();
      //}
    }
    catch (e) {
      console.log("@Error@ModalComponent::ngAfterViewChecked:: " + e);
    }
  }

  ngOnInit() {
  }
  onHidden(confirmed: boolean) {
    this.showModal = false;
    this.ModalResult.emit({
      confirmed: confirmed,
      comment: this.comment
    });
  }
}
