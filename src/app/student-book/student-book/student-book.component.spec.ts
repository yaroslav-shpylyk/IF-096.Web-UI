import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentBookComponent } from './student-book.component';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HideZeroPipe } from './hide-zero.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('StudentBookComponent', () => {
  let component: StudentBookComponent;
  let fixture: ComponentFixture<StudentBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ReactiveFormsModule, FormsModule,
        HttpClientTestingModule, BrowserAnimationsModule],
      declarations: [ StudentBookComponent, HideZeroPipe ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
