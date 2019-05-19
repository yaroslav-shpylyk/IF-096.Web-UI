import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsComponent } from './groups.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { GroupsService } from '../../../services/groups.service';
import { Group } from '../../../models/group-data.model';
import { of } from 'rxjs';

let comp: GroupsComponent;
let fixture: ComponentFixture<GroupsComponent>;
let page: Page;
let service: GroupsService;
let debugElement: DebugElement;
let debugElements: DebugElement[];
const mockGroups: Group[] = [
  {
    id: 1,
    classYear: 2011,
    className: '1-А',
    classDescription: 'some text',
    isActive: true,
    numOfStudents: 1
  },
  {
    id: 2,
    classYear: 2005,
    className: '2-Д',
    classDescription: 'some text again',
    isActive: false,
    numOfStudents: 3
  }
];

describe('GroupsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MaterialModule
      ],
      declarations: [GroupsComponent],
      providers: [GroupsService]
    })
      .compileComponents()
      .then(createComponent);
  }));

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it('should display groups', () => {
    expect(page.className[0].textContent).toEqual(
      ` ${mockGroups[0].className} `
    );
    expect(page.classYear[0].textContent).toEqual(
      ` ${mockGroups[0].classYear.toString()} `
    );
    expect(page.isActive[0].textContent).toEqual(' Відкритий ');
    expect(page.className[1].textContent).toEqual(
      ` ${mockGroups[1].className} `
    );
    expect(page.classYear[1].textContent).toEqual(
      ` ${mockGroups[1].classYear.toString()} `
    );
    expect(page.isActive[1].textContent).toEqual('Закритий');
  });

  it('should come correct data from service', () => {
    comp.refreshGroups();
    const groups = fixture.componentInstance.groups;
    expect(groups[0]).toEqual(mockGroups[0]);
    expect(groups[1]).toEqual(mockGroups[1]);
  });

  it('should open method after click', () => {
    spyOn(comp, 'openPopupsSheet').and.returnValue('work');
    debugElements = fixture.debugElement.queryAll(By.css('span'));
    debugElement = debugElements.find((element, i, arr) => {
      if (element.nativeElement.innerText === 'add_circle') {
        return true;
      }
    });
    debugElement.triggerEventHandler('click', 1);
    expect(comp.openPopupsSheet).toHaveBeenCalled();
  });
});

function createComponent() {
  fixture = TestBed.createComponent(GroupsComponent);
  comp = fixture.componentInstance;
  service = fixture.debugElement.injector.get(GroupsService);
  spyOn(service, 'getGroups').and.returnValue(of(mockGroups));
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page = new Page();
  });
}

class Page {
  className: HTMLElement[];
  classYear: HTMLElement[];
  classDescription: HTMLElement[];
  isActive: HTMLElement[];
  constructor() {
    this.className = Array.from(
      fixture.nativeElement.querySelectorAll('td.cdk-column-className')
    );
    this.classYear = Array.from(
      fixture.nativeElement.querySelectorAll('td.cdk-column-classYear')
    );
    this.isActive = Array.from(
      fixture.nativeElement.querySelectorAll('td.cdk-column-isActive')
    );
  }
}
