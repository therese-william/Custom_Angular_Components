import { Component, OnInit, Input, Output, EventEmitter, forwardRef, HostBinding, SimpleChanges, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-tabselect',
  templateUrl: './tabselect.component.html',
  styleUrls: ['./tabselect.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TabselectComponent),
      multi: true
    }
  ]
})
export class TabselectComponent implements OnInit, ControlValueAccessor {
  @ViewChild("searchInput") searchInput: ElementRef;
  @ViewChild("innerdiv") innerdiv: ElementRef;
  @ViewChild("selectbtn") selectbtn: ElementRef;
  @ViewChild("selectTable") selectTable: ElementRef;
  @ViewChild("selectUL") selectUL: ElementRef;
  onChange: any = () => { };
  onTouched: any = () => { };

  showList: boolean = false;
  _classNames: string = "btn-group ng-select show-tick";
  searchText: string = "";

  @Input() list: any[];
  @Input() tableColumns: any[];
  @Input() valueFieldName: string;
  @Input() textFieldName: string;
  @Input() multiple: boolean = false;
  @Input() searchable: boolean = false;
  @Input() showActionButtons: boolean = false;
  @Input() emptyTitle: string = "Nothing Selected";
  @Input() multipleTitle: string;
  @Input() title: string;
  @Input() maxShownItems: number;
  @Input() clearOnDel: boolean = false;
  @Input() disabled: boolean = false;
  @Input() extendSearchChars: number = 3;
  @Input() searchInProgress: boolean = false;
  @Input() sortColumnName: string = "";
  @Input() size: number = 10;
  @Input() isTable: boolean = true;
  @Input() shiftSelectedUp: boolean = false;
  @Input() direction: string = "";
  @Input() autofocus: boolean = false;
  @Input() focusoninit: boolean = false;

  @Output() select_blur: EventEmitter<any> = new EventEmitter<any>();
  @Output() tab: EventEmitter<any> = new EventEmitter<any>();
  @Output() shift_tab: EventEmitter<any> = new EventEmitter<any>();
  @Output() listSearched: EventEmitter<any> = new EventEmitter<any>();

  @Input() _ngModel: any;

  isInList: boolean = false;
  focusOnSearch: boolean = false;
  focusOnList: boolean = false;
  focusOnButton: boolean = false;
  currentActiveIndex: number = -1;
  isNothingSelected: boolean = true;
  tableHeight: string = "323px";

  get ngModel() {
    return this._ngModel;
  }
  set ngModel(val) {
    this._ngModel = val;
  }
  @HostBinding('class') @Input('class') set class(value: any) {
    this._classNames = this._classNames + " " + value;
  }
  constructor() { }

  ngOnInit() {
    if (this.focusoninit) {
      this.focusOnButton = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    var listChanges = changes.list;
    var sizeChange = changes.size;
    var focusChange = changes.focusoninit;
    var searchInProgressChange = changes.searchInProgress;
    if (searchInProgressChange && searchInProgressChange.currentValue != searchInProgressChange.previousValue) {
      //if (this.searchInProgress) {
      //  this.showList = true;
      //}
      if (!this.searchInProgress && this.showList) {
        this.focusOnSearch = true;
      }
    }
    if (focusChange && focusChange.isFirstChange() && focusChange.currentValue) {
      this.focusOnButton = true;
    }
    if (listChanges && listChanges.currentValue != listChanges.previousValue) {
      if (this.list && this.list.length > 0) {
        this.list.forEach(l => {
          if (!l.selected) l.selected = false;
          if (!l.hidden) l.hidden = false;
          if (!l.active) l.active = false;
        });
        this.updateSelectedFromModel();
        if (this.searchText || this.searchText == "") {
          this.searchCurrentList(this.searchText);
        }
        if (this.currentActiveIndex != -1) {
          if (this.list && this.list.length > this.currentActiveIndex && this.list[this.currentActiveIndex]) {
            if (this.list[this.currentActiveIndex].hidden) {
              this.list[this.currentActiveIndex].active = false;
              this.focusOnList = false;
              this.currentActiveIndex = -1;
            }
            else if (!this.list[this.currentActiveIndex].active) {
              this.list[this.currentActiveIndex].active = true;
              this.focusOnList = true;
            }
          }
          else {
            this.focusOnList = false;
            this.currentActiveIndex = -1;
            if (this.showList) {
              if (this.searchInput && this.searchInput.nativeElement) {
                this.searchInput.nativeElement.focus();
              }
            }
          }
        }
        else {
          this.focusOnList = false;
          if (this.showList) {
            if (this.searchInput && this.searchInput.nativeElement) {
              this.searchInput.nativeElement.focus();
            }
          }
        }
      }
    }
    if (sizeChange && sizeChange.previousValue != sizeChange.currentValue) {
      this.tableHeight = ((this.size * 30) + 23).toString() + "px";
    }
    
  }

  sortSelectedList() {
    if (this.list && this.list.length > 0) {
      if (this.shiftSelectedUp) {
        var selectedList = this.list.filter(l => l.selected);
        var unselectedList = this.list.filter(l => !l.selected);
        this.list = [];

        if (this.sortColumnName != "") {
          this.list.push(...selectedList.sortBy(this.sortColumnName));
          this.list.push(...unselectedList.sortBy(this.sortColumnName));
        }
        else {
          this.list.push(...selectedList);
          this.list.push(...unselectedList);
        }
        if (unselectedList.length > 0) {
          this.currentActiveIndex = selectedList.length;
          this.list.forEach(l => l.active = false);
          this.list[this.currentActiveIndex].active = true;
          this.focusOnList = true;
        }
      }
      else {
        if (this.sortColumnName != "") {
          this.list = this.list.sortBy(this.sortColumnName);
        }
      }
      if (this.currentActiveIndex != -1) {
        this.list.forEach(l => l.active = false);
        if (this.list[this.currentActiveIndex]) {
          if (this.list[this.currentActiveIndex].hidden) {
            var shownList = this.list.filter(l => !l.hidden);
            if (shownList && shownList.length > 0) {
              this.currentActiveIndex = 0;
              shownList[0].active = true;
              this.focusOnList = true;
            }
            else {
              this.currentActiveIndex = -1;
              this.focusOnList = false;
              if (this.showList && this.searchInput && this.searchInput.nativeElement) {
                this.searchInput.nativeElement.focus();
              }
              else {
                this.focusOnSearch = true;
              }
            }
          }
          else {
            this.list[this.currentActiveIndex].active = true;
            this.focusOnList = true;
          }
        }
        else {
          this.currentActiveIndex = -1;
          this.focusOnList = false;
          if (this.showList && this.searchInput && this.searchInput.nativeElement) {
            this.searchInput.nativeElement.focus();
          }
          else {
            this.focusOnSearch = true;
          }
        }
      }
      else {
        if (this.list.some(l => l.active)) {
          this.list.forEach(l => l.active = false);
        }
      }
    }
  }

  ngAfterViewChecked() {
    try {
      if (this.focusOnSearch) {
        if (this.searchInput && this.searchInput.nativeElement && !this.searchInput.nativeElement.disabled) {
          if (this.focusOnButton) {
            this.focusOnButton = false;
          }
          this.searchInput.nativeElement.focus();
          this.focusOnSearch = false;
        }
      }
      if (this.focusOnList) {
        if (this.focusOnButton) {
          this.focusOnButton = false;
        }
        if (this.isTable) {
          if (this.selectTable && this.selectTable.nativeElement) {
            var highlighted = this.selectTable.nativeElement.getElementsByClassName("highlight");
            //var activeRow = $(".tabselect-inner tr.highlight td input.tabselectcheck");
            if (highlighted && highlighted.length == 1) {
              var activeRow = $(highlighted).find("input.tabselectcheck");
              $(activeRow).focus();
              this.focusOnList = false;
            }
          }
        }
        else {
          if (this.selectUL && this.selectUL.nativeElement) {
            //var activelink = $(".tabselect-inner ul li.active a");
            var activeli = this.selectUL.nativeElement.getElementsByClassName("active");
            if (activeli && activeli.length == 1) {
              var activelink = $(activeli).find("a");
              $(activelink).focus();
              this.focusOnList = false;
            }
          }
        }
      }
      if (this.focusOnButton) {
        if (this.selectbtn && this.selectbtn.nativeElement) {
          this.selectbtn.nativeElement.focus();
        }
      }
    }
    catch (ex) {
      console.log("@Error@tabselect::ngAfterViewChecked:: " + ex);
    }
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this.ngModel = value;
      this.updateSelectedFromModel();
    }
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  selectAllItems() {
    if (this.list && this.list.length > 0) {
      this.list.filter(l => !l.hidden).forEach(l => {
        l.selected = true;
      });
      this.updateModelFromSelected();
    }
  }
  deselectAllItems() {
    if (this.list && this.list.length > 0) {
      this.list.filter(l => !l.hidden).forEach(l => {
        l.selected = false;
      });
      this.updateModelFromSelected();
    }
  }

  updateModelFromSelected() {
    if (this.list && this.list.length > 0) {
      var selected = this.list.filter(i => i["selected"] == true);

      if (this.multiple) {
        if (selected.length > 0) {
          this.ngModel = selected.map<any>(s => s[this.valueFieldName]);
        }
        else {
          this.ngModel = [];
        }
      }
      else {
        if (selected.length > 0) {
          this.ngModel = selected[0][this.valueFieldName];
        }
        else {
          this.ngModel = null;
        }
      }
      this.updateTitleFromSelected();

      this.onChange(this.ngModel);

      this.sortSelectedList();
    }
  }

  updateSelectedFromModel() {
    if (this.list && this.list.length > 0) {
      this.list.forEach(l => l["selected"] = false);
      if (this.ngModel) {
        if (this.multiple || Array.isArray(this.ngModel)) {
          this.list
            .filter(l => this.ngModel.indexOf(l[this.valueFieldName]) >= 0)
            .forEach(l => {
              l["selected"] = true;
            });
        }
        else {
          this.list.forEach(l => {
            if (l[this.valueFieldName] == this.ngModel) {
              l["selected"] = true;
            }
          });
        }
      }
      this.sortSelectedList();
    }
    this.updateTitleFromSelected();
  }

  updateTitleFromSelected() {
    if (this.list && this.list.length > 0) {
      if (this.emptyTitle && this.emptyTitle != "") {
        this.title = this.emptyTitle;
      }
      else {
        this.title = "Nothing Selected";
      }

      var selected = this.list.filter(i => i["selected"] == true);

      if (selected.length > 0) {
        this.isNothingSelected = false;
        if (this.maxShownItems && selected.length > this.maxShownItems) {
          if (this.multipleTitle) {
            this.title = this.multipleTitle;
          }
          else {
            this.title = selected.length + " items selected";
          }
        }
        else {
          if (this.multiple && selected.length > 1) {
            this.title = selected.map<string>(s => s[this.textFieldName]).join(",");
          }
          else {
            this.title = selected[0][this.textFieldName];
          }
        }
      }
      else {
        this.isNothingSelected = true;
      }
    }
    else {
      this.isNothingSelected = true;
    }
  }

  lstFocusout(e) {
    if (!this.isInList && !this.searchInProgress && !(e.relatedTarget && (e.relatedTarget.className.indexOf("tabselect-inner") >= 0 ||
      e.relatedTarget.className.indexOf("btn dropdown-toggle btn-default") >= 0 ||
      e.relatedTarget.className.indexOf("ng-bs-option") >= 0))) {
      this.searchList("");
      this.showList = false;
      this.select_blur.emit(e);
    }
  }
  hideList() {
    this.searchList("");
    if (this.autofocus) {
      if (this.selectbtn && this.selectbtn.nativeElement) {
        this.selectbtn.nativeElement.focus();
      }
    }
    this.showList = false;
  }
  listBtnClicked() {
    if (this.showList && this.list && this.list.length > 0) {
      this.list.forEach(l => l.active = false);
      this.currentActiveIndex = -1;
    }
    this.showList = !this.showList;
    if (this.showList) {
      this.focusOnSearch = true;
    }
    if (!this.showList) {
      this.searchList("");
      this.isInList = false;
    }
  }
  btnKeyDown(e: any) {
    if (!this.showList && (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode >= 65 && e.keyCode <= 90)) {
      //this.searchText = e.key;
      this.showList = true;
      this.isInList = true;
      this.focusOnSearch = true;
    }
    else if (e.keyCode == 40) { //Arrow Down
      if (!this.showList) {
        this.showList = true;
        this.focusOnSearch = true;
      }
      else {
        if (this.list && this.list.length > 0) {
          if (this.list.some(l => l.active == true)) {
            var activeindex = this.list.findIndex(l => l.active == true);
            if (activeindex != this.list.length - 1) {
              this.list[activeindex].active = false;
              this.list[activeindex + 1].active = true;
              this.currentActiveIndex = activeindex + 1;
              this.focusOnList = true;
            }
          }
          else {
            this.list[0].active = true;
            this.currentActiveIndex = 0;
            this.focusOnList = true;
          }
        }
      }
      e.stopPropagation();
      e.preventDefault();
    }
    else if (e.keyCode == 9 && !e.shiftKey) {
      if (this.showList) {

      }
      this.tab.emit(e);
    }
    else if (e.keyCode == 9 && e.shiftKey) {
      this.shift_tab.emit(e);
    }
    else if (e.keyCode == 46) {
      if (!this.multiple && this.clearOnDel) {
        if (this.list && this.list.length > 0) {
          this.list.forEach(l => l.selected = false);
          this.updateModelFromSelected();
          this.hideList();
        }
      }
    }
  }
  rowClicked(e, i: number) {
    this.isInList = true;
    if (this.multiple) {
      this.list[i].selected = !this.list[i].selected;
    }
    else {
      if (this.list[i].selected) {
        this.list[i].selected = false;
      }
      else {
        this.list.forEach(l => l.selected = false);
        this.list[i].selected = true;
      }
    }
    this.list.forEach(l => l.active = false);
    this.list[i].active = true;
    this.currentActiveIndex = i;
    this.focusOnList = true;
    this.updateModelFromSelected();
    if (!this.multiple) {
      this.hideList();
    }
  }
  searchList(searchText: string) {
    this.searchText = searchText;
    this.searchCurrentList(searchText);
    this.listSearched.emit(searchText);
  }
  searchCurrentList(searchText: string) {
    if (this.list && this.list.length > 0) {
      this.list.forEach(l => l.active = false);
      this.currentActiveIndex = -1;
      if (searchText == "" && this.list && this.list.length > 0) {
        this.list.forEach(l => {
          l.hidden = false;
        });
      }
      else {
        this.list.forEach(l => {
          l.active = false;
          if (this.isTable) {
            l.hidden = true;
            this.tableColumns.forEach(c => {
              if (l && l[c.ColFieldName] && l[c.ColFieldName].toString().toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
                l.hidden = false;
              }
            });
          }
          else {
            if (l[this.textFieldName].toString().toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
              l.hidden = false;
            }
            else {
              l.hidden = true;
            }
          }
        });
        if (this.list.some(l => !l.hidden)) {
          this.list.filter(l => !l.hidden)[0].active = true;
        }
      }
    }
  }
  searchArrow(e, direction: string) {

    if (this.list && this.list.length > 0) {
      if (direction == 'down') {
        this.list.forEach(l => l.active = false);
        var shownList = this.list.filter(l => l.hidden == false);
        if (shownList && shownList.length > 0) {
          shownList[0].active = true;
          this.currentActiveIndex = this.list.indexOf(shownList[0]);
        }
        this.focusOnList = true;
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }
  searchTab(e) {
    if (this.list && this.list.length > 0) {
      if (this.list.some(l => l.active)) {
        if (!this.multiple) {
          this.list.forEach(l => l.selected = false);
        }
        var i = this.list.findIndex(l => l.active);
        this.list[i].selected = true;
        this.updateModelFromSelected();
      }
    }
    this.hideList();

    if (!e.shiftKey) {
      this.tab.emit(e);
    }
    else {
      this.shift_tab.emit(e);
    }
  }
  checkKeyDown(e, i: number) {
    if (e.keyCode == 40 || e.keyCode == 38) {
      this.list.forEach(l => l.active = false);
    }
    if (e.keyCode == 40) { //Arrow Down
      var shownListNext = this.list.filter((l, index) => l.hidden == false && index > i);
      if (shownListNext && shownListNext.length > 0) {
        shownListNext[0].active = true;
        this.currentActiveIndex = this.list.indexOf(shownListNext[0]);
        this.focusOnList = true;
      }
      e.stopPropagation();
      e.preventDefault();
    }
    if (e.keyCode == 38) { //Arrow Up
      var shownListPrev = this.list.filter((l, index) => l.hidden == false && index < i);
      if (shownListPrev && shownListPrev.length > 0) {
        shownListPrev[shownListPrev.length - 1].active = true;
        this.currentActiveIndex = this.list.indexOf(shownListPrev[shownListPrev.length - 1]);
        this.focusOnList = true;
      }
      else {
        this.currentActiveIndex = -1;
        this.focusOnList = false;
        this.focusOnSearch = true;
      }
      e.stopPropagation();
      e.preventDefault();
    }
    if (e.keyCode == 9) {
      e.preventDefault();
      if (!this.multiple) {
        this.list.forEach(l => l.selected = false);
      }
      this.list[i].selected = true;
      this.updateModelFromSelected();
      this.hideList();
    }
    if (!this.isTable && e.keyCode == 32) { //space
      this.rowClicked(null, i);
    }
    if (e.keyCode == 9 && !e.shiftKey) {
      this.tab.emit(e);
    }
    else if (e.keyCode == 9 && e.shiftKey) {
      this.shift_tab.emit(e);
    }
  }
}
