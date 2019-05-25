import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../material.module';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, MaterialModule ],
      declarations: [ AvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create component', () => {
    expect(component).toBeTruthy();
  });
  it('should give rgb color', () => {
    expect((component as any).getRandomColor(4)).toMatch(/rgb\(\d{3},\d{3},\d{3}\)/);
  });
  it('should check if variable has string', () => {
    expect(component.checkValue('some string')).toBe(true);
    expect(component.checkValue(undefined)).toBe(false);
    expect(component.checkValue(null)).toBe(false);
    expect(component.checkValue('    ')).toBe(false);
  });
  it('should generate abbreviation from two strings', () => {
    expect((component as any).generateAbbreviation('Bob', 'Marley')).toBe('BM');
    expect((component as any).generateAbbreviation('', 'Marley')).toBe('');
    expect((component as any).generateAbbreviation('Bob', '')).toBe('');
  });
});
