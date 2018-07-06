import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabselectComponent } from './tabselect.component';

describe('TabselectComponent', () => {
  let component: TabselectComponent;
  let fixture: ComponentFixture<TabselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
