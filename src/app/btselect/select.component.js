"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var btselect_1 = require("./btselect");
var SelectComponent = /** @class */ (function () {
    function SelectComponent() {
        this.showList = false;
        this._guid = btselect_1.Guid.newGuid();
        this._classNames = "selectpicker";
        this.searchText = "";
        this.onChange = function () { };
        this.onTouched = function () { };
        this.multiple = false;
        this.searchable = false;
        this.showActionButtons = false;
        this.emptyTitle = "Nothing Selected";
        this.searchInProgress = false;
        this.deselectable = true;
        this.direction = "auto";
        this.disabled = false;
        this.showContent = true;
        this.isDataContent = false;
        this.listSearched = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.onTab = new core_1.EventEmitter();
        this.refreshPicker = false;
        this.isSearching = false;
        this.eventsLinked = false;
    }
    SelectComponent_1 = SelectComponent;
    Object.defineProperty(SelectComponent.prototype, "class", {
        set: function (value) {
            this._classNames = this._classNames + " " + value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "ngModel", {
        get: function () {
            return this._ngModel;
        },
        set: function (val) {
            this._ngModel = val;
            this.refreshPicker = true;
        },
        enumerable: true,
        configurable: true
    });
    SelectComponent.prototype.ngOnInit = function () {
        this._classNames = this._classNames + " " + this._guid;
    };
    SelectComponent.prototype.ngAfterViewChecked = function () {
        //if (this.refreshPicker) {
        var _self = this;
        $(this.selectlst.nativeElement).val(this._ngModel);
        $(this.selectlst.nativeElement).selectpicker('refresh');
        if (!this.eventsLinked) {
            $(this.selectlst.nativeElement).on('changed.bs.select', function (e) {
                _self.valueChanged($(e.currentTarget).val());
            });
            $(this.selectlst.nativeElement).on('searched.bs.select', function (e, s) {
                if (!_self.isSearching && _self.searchText != s) {
                    _self.searchText = s;
                    _self.searchList(s);
                }
            });
            $(this.selectlst.nativeElement).on('tab.bs.select', function (e) {
                _self.onTab.emit(e);
            });
            var parent = $(this.selectlst.nativeElement).parent();
            if (parent) {
                var btn = $(parent).find("button.btn.dropdown-toggle");
                if (btn) {
                    $(btn).on('blur.bs.select', function (e) {
                        if (!parent.hasClass('open')) {
                            _self.blur.emit();
                        }
                    });
                }
            }
            this.eventsLinked = true;
        }
        //  this.refreshPicker = false;
        //}
    };
    SelectComponent.prototype.valueChanged = function (selectedList) {
        this.ngModel = selectedList;
        this.onChange(this.ngModel);
    };
    SelectComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    SelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    SelectComponent.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this.ngModel = value;
        }
        this.refreshPicker = true;
    };
    SelectComponent.prototype.ngOnChanges = function (changes) {
        var listChanges = changes.list;
        var emptyTitleChanges = changes.emptyTitle;
        if (listChanges && listChanges.previousValue != listChanges.currentValue) {
            this.refreshPicker = true;
            if (this.isSearching) {
                this.isSearching = false;
            }
        }
        if (emptyTitleChanges && emptyTitleChanges.isFirstChange() && emptyTitleChanges.currentValue != emptyTitleChanges.previousValue) {
            if (!this.list || this.list.length <= 0) {
                this.title = this.emptyTitle;
            }
            this.refreshPicker = true;
        }
    };
    SelectComponent.prototype.searchList = function (val) {
        this.searchText = val;
        if (this.listSearched) {
            this.listSearched.emit(val);
        }
    };
    __decorate([
        core_1.ViewChild("selectlst")
    ], SelectComponent.prototype, "selectlst", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "list", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "searchable", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "showActionButtons", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "textFieldName", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "valueFieldName", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "emptyTitle", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "multipleTitle", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "searchInProgress", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "header", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "maxShownItems", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "deselectable", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "direction", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "showContent", void 0);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "isDataContent", void 0);
    __decorate([
        core_1.HostBinding('class'), core_1.Input('class')
    ], SelectComponent.prototype, "class", null);
    __decorate([
        core_1.Input()
    ], SelectComponent.prototype, "_ngModel", void 0);
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "listSearched", void 0);
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "blur", void 0);
    __decorate([
        core_1.Output()
    ], SelectComponent.prototype, "onTab", void 0);
    SelectComponent = SelectComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-select',
            templateUrl: './select.component.html',
            styleUrls: ['./select.component.css'],
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return SelectComponent_1; }),
                    multi: true
                }
            ]
        })
    ], SelectComponent);
    return SelectComponent;
    var SelectComponent_1;
}());
exports.SelectComponent = SelectComponent;
//# sourceMappingURL=select.component.js.map