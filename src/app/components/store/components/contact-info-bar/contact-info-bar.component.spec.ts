import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoBarComponent } from './contact-info-bar.component';

describe('ContactInfoBarComponent', () => {
  let component: ContactInfoBarComponent;
  let fixture: ComponentFixture<ContactInfoBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactInfoBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
