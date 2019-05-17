import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyButtonComponent } from './sticky-button.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';

describe('StickyButtonComponent', () => {
  let component: StickyButtonComponent;
  let fixture: ComponentFixture<StickyButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
         MaterialModule ],
      declarations: [ StickyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StickyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
