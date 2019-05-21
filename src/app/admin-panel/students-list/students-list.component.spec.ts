import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsListComponent } from './students-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RouterTestingModule } from '@angular/router/testing';
import { AvatarComponent } from '../../shared/avatar/avatar.component';

describe('StudentsListComponent', () => {
  let component: StudentsListComponent;
  let fixture: ComponentFixture<StudentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule, MaterialModule, MatSlideToggleModule, RouterTestingModule ],
      declarations: [ StudentsListComponent, AvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
