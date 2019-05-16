import { TestBed } from '@angular/core/testing';

import { GroupsService } from './groups.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('GroupsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [GroupsService],
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: GroupsService = TestBed.get(GroupsService);
    expect(service).toBeTruthy();
  });
});
