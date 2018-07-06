import {
  Injectable,
  Inject,
  ComponentFactoryResolver,
  ReflectiveInjector,
  ViewContainerRef,
  ViewRef,
  ComponentRef,
  ComponentFactory,
  EventEmitter
} from '@angular/core';

import { ModalComponent } from './modal.component';
import { Observable } from 'rxjs';

@Injectable()
export class ModalService {
  rootViewContainer: ViewContainerRef;
  modalViewRef: ViewRef;
  modalComponentRef: ComponentRef<ModalComponent>;
  modalFactory: ComponentFactory<ModalComponent>;

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  public setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef;
  }

  public showModal(messages: string[], title: string, modalType: string, comment: string, cancelButton: string, okButton: string, isEsc: boolean) : EventEmitter<any> {
    if (!this.modalFactory) {
      this.modalFactory = this.factoryResolver.resolveComponentFactory(ModalComponent);
    }
    if (this.modalComponentRef) {
      this.modalComponentRef.destroy();
    }
    if (this.modalViewRef) {
      this.modalViewRef.destroy();
    }
    if (!messages || messages.length == 0) {
      messages.push("");
    }
    this.modalComponentRef = this.modalFactory.create(this.rootViewContainer.parentInjector);
    this.modalViewRef = this.rootViewContainer.insert(this.modalComponentRef.hostView);
    this.modalComponentRef.instance.CancelButton = cancelButton;
    this.modalComponentRef.instance.comment = comment;
    this.modalComponentRef.instance.IsEsc = isEsc;
    this.modalComponentRef.instance.Messages = messages;
    this.modalComponentRef.instance.ModalType = modalType;
    this.modalComponentRef.instance.OKButton = okButton;
    this.modalComponentRef.instance.Title = title;
    this.modalComponentRef.instance.showModal = true;
    return this.modalComponentRef.instance.ModalResult;
  }
}
