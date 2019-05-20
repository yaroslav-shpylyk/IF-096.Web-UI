import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewYearComponent } from './new-year.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ClassCardComponent } from './class-card/class-card.component';
import { TitlePipe } from './autotitle.pipe';

describe('NewYearComponent', () => {
  let component: NewYearComponent;
  let fixture: ComponentFixture<NewYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule, MaterialModule, ReactiveFormsModule ],
      declarations: [ NewYearComponent, ClassCardComponent, TitlePipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return educational year', () => {
    const mockDateSeptember = new Date(2018, 9, 11);
    expect(component.currentYear).toBe(2018);
    const mockDateJanuary = new Date(2019, 1, 11);
    expect(component.currentYear).toBe(2018);
  });
});

