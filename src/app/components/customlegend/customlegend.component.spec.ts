import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomlegendComponent } from './customlegend.component';

describe('CustomlegendComponent', () => {
  let component: CustomlegendComponent;
  let fixture: ComponentFixture<CustomlegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomlegendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomlegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
