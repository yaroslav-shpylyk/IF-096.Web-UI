import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminHeaderMenuComponent } from './header-menu.component';
import { MatMenuModule, MatDividerModule, MatIconModule, MatListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('AdminHeaderMenuComponent', () => {
  let component: AdminHeaderMenuComponent;
  let fixture: ComponentFixture<AdminHeaderMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatIconModule,
        MatMenuModule,
        MatDividerModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        AdminHeaderMenuComponent
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeaderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  fit('should truncate name if longer than 2nd parameter and add …', () => {
    expect(component.truncateName('Khrystyna', 5)).toBe('Khrys…');
  });
  fit('should not truncate name if it is shorter than 2nd parameter', () => {
    expect(component.truncateName('Khrystyna', 10)).toBe('Khrystyna');
  });
});
