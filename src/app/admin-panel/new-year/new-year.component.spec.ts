import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { NewYearComponent } from './new-year.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule, FormControl, Validators, FormArray } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ClassCardComponent } from './class-card/class-card.component';
import { TitlePipe } from './autotitle.pipe';
import { NewYearService } from '../../services/new-year.service';
import {ClassData} from '../../models/class-data';
import { of } from 'rxjs';


describe('NewYearComponent', () => {
  let component: NewYearComponent;
  let fixture: ComponentFixture<NewYearComponent>;

  const activeClassData: ClassData = {
    id: 15,
    isActive: true,
    className: '8А',
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

  it('addNewTitleInput method should generete FormControls with valid value', async () => {
    component.ngOnInit();
    component.addNewTitleInput(notActiveClassData);
    fixture.detectChanges();
    expect(component.transititionForm.controls.newClassTitle.valid).toBeTruthy();
   });

  it('transitition form should not be valid with controls that invalid by the pattern, with uncorrect number and already exist',
    async () => {
      const invalidPatternInput = new FormControl(
        {value: '8А', disabled: false},
        [Validators.pattern('(^[1-7][(]([1-9]|1[0-2])-[А-Я]{1}[)]$)|(^([1-9]|1[0-2])-[А-Я]{1}$)'),
        component.classTitleValidator([activeClassData, notActiveClassData], 2017, '7А')]);
      (component.transititionForm.controls.newClassTitle as FormArray).push(invalidPatternInput);
      fixture.detectChanges();
      expect(invalidPatternInput.errors.pattern).toBeDefined();
      expect(invalidPatternInput.errors.class_exist).toBeDefined();

      const invalidNumberInput = new FormControl(
        {value: '2(6-А)', disabled: false},
        [Validators.pattern('(^[1-7][(]([1-9]|1[0-2])-[А-Я]{1}[)]$)|(^([1-9]|1[0-2])-[А-Я]{1}$)'),
        component.classTitleValidator([activeClassData, notActiveClassData], 2018, '4(7-А)')]);
      (component.transititionForm.controls.newClassTitle as FormArray).push(invalidNumberInput);
      fixture.detectChanges();
      expect(invalidNumberInput.errors.error_number).toBeDefined();
      expect(component.transititionForm.controls.newClassTitle.valid).toBeFalsy();
   });
});

