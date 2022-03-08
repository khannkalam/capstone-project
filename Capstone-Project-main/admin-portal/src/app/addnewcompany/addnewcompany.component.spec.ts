import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewcompanyComponent } from './addnewcompany.component';

describe('AddnewcompanyComponent', () => {
  let component: AddnewcompanyComponent;
  let fixture: ComponentFixture<AddnewcompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewcompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewcompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
