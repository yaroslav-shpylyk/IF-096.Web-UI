import { TestBed, inject } from '@angular/core/testing';

import { GroupsService } from './groups.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Group } from '../models/group-data.model';

const mockGroups: Group[] = [
  {
    id: 1,
    classYear: 1,
    className: 'some_text',
    classDescription: 'some_text',
    isActive: false,
    numOfStudents: 1
  }
];

const mockGroupsPutOrPostResp: Group = {
  id: 1,
  classYear: 1,
  className: 'some_text',
  classDescription: null,
  isActive: false,
  numOfStudents: 0
};

const mockGroupsPost = {
  classYear: 1,
  className: 'some_text',
  isActive: false
};

describe('GroupsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [GroupsService],
      imports: [HttpClientTestingModule]
    })
  );

  it('should get groups', inject(
    [GroupsService, HttpTestingController],
    (service: GroupsService, backend: HttpTestingController) => {
      service.getGroups().subscribe(groups => {
        expect(groups).toEqual(mockGroups);
      });
      backend
        .expectOne({
          method: 'GET',
          url: '/classes'
        })
        .flush({ data: mockGroups });
    }
  ));

  it('should update the groups', inject(
    [GroupsService, HttpTestingController],
    (service: GroupsService, backend: HttpTestingController) => {
      service.addGrup(mockGroupsPutOrPostResp).subscribe(groups => {
        expect(groups).toEqual(mockGroupsPutOrPostResp);
      });
      backend
        .expectOne({
          method: 'PUT',
          url: '/classes/1'
        })
        .flush({ data: mockGroupsPutOrPostResp });
    }
  ));

  it('should return the groups', inject(
    [GroupsService, HttpTestingController],
    (service: GroupsService, backend: HttpTestingController) => {
      service.addGrup(mockGroupsPost).subscribe(groups => {
        expect(groups).toEqual(mockGroupsPutOrPostResp);
      });
      backend
        .expectOne({
          method: 'POST',
          url: '/classes/'
        })
        .flush({ data: mockGroupsPutOrPostResp });
    }
  ));
});
