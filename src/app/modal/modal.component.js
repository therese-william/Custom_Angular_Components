"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ModalComponent = /** @class */ (function () {
    function ModalComponent() {
        this.Messages = [];
        this.Title = "";
        this.OKButton = "Ok";
        this.CancelButton = "Cancel";
        this.IsEsc = true;
        this.ModalResult = new core_1.EventEmitter();
        this.comment = "";
        this.showModal = false;
    }
    ModalComponent.prototype.ngOnInit = function () {
    };
    ModalComponent.prototype.onHidden = function (confirmed) {
        this.showModal = false;
        this.ModalResult.emit({
            confirmed: confirmed,
            comment: this.comment
        });
    };
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "Messages", void 0);
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "Title", void 0);
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "OKButton", void 0);
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "CancelButton", void 0);
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "ModalType", void 0);
    __decorate([
        core_1.Input()
    ], ModalComponent.prototype, "IsEsc", void 0);
    __decorate([
        core_1.Output()
    ], ModalComponent.prototype, "ModalResult", void 0);
    ModalComponent = __decorate([
        core_1.Component({
            selector: 'ng-bsModal',
            templateUrl: './modal.component.html',
            styleUrls: ['./modal.component.css']
        })
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map