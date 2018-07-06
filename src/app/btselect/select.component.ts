import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ViewChild, ElementRef, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Guid } from './btselect';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => SelectComponent),
          multi: true
      }
  ]
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @ViewChild("selectlst") selectlst: ElementRef;
  showList: boolean = false;
  _guid = Guid.newGuid();
  _classNames: string = "selectpicker";
  searchText: string = "";

  onChange: any = () => { };
  onTouched: any = () => { };

  @Input() list: any[];
  @Input() multiple: boolean = false;
  @Input() searchable: boolean = false;
  @Input() showActionButtons: boolean = false;
  @Input() textFieldName: string;
  @Input() valueFieldName: string;
  @Input() emptyTitle: string = "Nothing Selected";
  @Input() multipleTitle: string;
  @Input() searchInProgress: boolean = false;
  @Input() title: string;
  @Input() header: string;
  @Input() maxShownItems: number;
  @Input() deselectable: boolean = true;
  @Input() direction: string = "auto";
  @Input() disabled: boolean = false;
  @Input() showContent: boolean = true;
  @Input() isDataContent: boolean = false;
    
  @HostBinding('class') @Input('class') set class(value: any) {
      this._classNames = this._classNames + " " + value;
  }

  @Input() _ngModel: any;

  get ngModel() {
      return this._ngModel;
  }
  set ngModel(val) {
    this._ngModel = val;
    this.refreshPicker = true;
  }

    
  @Output() listSearched: EventEmitter<any> = new EventEmitter<any>();
  @Output() blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() onTab: EventEmitter<any> = new EventEmitter<any>();

  refreshPicker: boolean = false;
  isSearching: boolean = false;
  eventsLinked: boolean = false;
        
  constructor() { }

  ngOnInit() {
    this._classNames = this._classNames + " " + this._guid;
  }

  ngAfterViewChecked() {
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
  }
  valueChanged(selectedList: any) {
    this.ngModel = selectedList;
    this.onChange(this.ngModel);
  }

  registerOnChange(fn) {
      this.onChange = fn;
  }

  registerOnTouched(fn) {
      this.onTouched = fn;
  }

  writeValue(value) {
    if (value !== undefined) {
      this.ngModel = value;
    }
    this.refreshPicker = true;
  }

  ngOnChanges(changes: SimpleChanges) {
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
  }

  searchList(val: string) {
      this.searchText = val;
      if (this.listSearched) {
          this.listSearched.emit(val);
      }
  }
}
