import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { NewYearComponent } from './new-year.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ClassCardComponent } from './class-card/class-card.component';
import { TitlePipe } from './autotitle.pipe';
import { NewYearService } from '../../services/new-year.service';
import {ClassData} from '../../models/class-data';
import { of } from 'rxjs';


describe('NewYearComponent', () => {
  let component: NewYearComponent;
  let fixture: ComponentFixture<NewYearComponent>;
  // let newYearService: NewYearService;
  const activeClassData: ClassData = {
    id: 15,
    isActive: true,
    className: '8-А',
    classDescription: 'active class',
    classYear: 2018,
    numOfStudents: 5
  };
  const notActiveClassData: ClassData = {
      id: 25,
      isActive: false,
      className: '3(6-А)',
      classDescription: ' not active class',
      classYear: 2019,
      numOfStudents: 0
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, BrowserAnimationsModule,
        FormsModule, MaterialModule, ReactiveFormsModule ],
      declarations: [ NewYearComponent, ClassCardComponent, TitlePipe ],
      providers: [NewYearService]
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
    jasmine.clock().mockDate(mockDateSeptember);
    expect(component.currentYear).toBe(2018);
    const mockDateJanuary = new Date(2018, 1, 11);
    jasmine.clock().mockDate(mockDateJanuary);
    expect(component.currentYear).toBe(2017);
  });

  it('should generate new class title', () => {
    const mockStandartTitle = '5-А';
    expect(component.newTitle(mockStandartTitle)).toBe('6-А');
    const mockHimnaziumTitle = '2(5-А)';
    expect(component.newTitle(mockHimnaziumTitle)).toBe('3(6-А)');
    const mockGraduatedStandartTitle = '11-Б';
    expect(component.newTitle(mockGraduatedStandartTitle)).toBe('');
    const mockGraduatedHymnasiumTitle = '11-Б';
    expect(component.newTitle(mockGraduatedHymnasiumTitle)).toBe('');
  });

  it('should return empty template with message', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    component.filteredClasses = [];
    expect(compiled.querySelector('p').textContent.substring(0, 12)).toContain('Немає класів');
  });


  it('should get allClasses data from service and set activeClasses', async () => {
    const allClassesTestData = [activeClassData, notActiveClassData];
    const newYearService = fixture.debugElement.injector.get(NewYearService);
    fixture.detectChanges();
    spyOn(newYearService, 'getClasses').and.returnValue(of(allClassesTestData));
    component.ngOnInit();
    fixture.detectChanges();
    fixture.whenStable().then( () => {
      expect(component.allClasses).toEqual(allClassesTestData);
      expect(component.activeClasses).toEqual([activeClassData]);
    });
  });



});

