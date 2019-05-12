import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { ScheduleService } from './schedule.service';
import { ScheduleData } from '../models/schedule-data';

describe('ScheduleService', () => {
  let service: ScheduleService;
  let backend: HttpTestingController;

  const scheduleData = new ScheduleData();
  const expectData = {
    status: 'OK',
    data: scheduleData
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [ScheduleService]
    });

    service = TestBed.get(ScheduleService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should made request to GET data from expected URL', () => {
    service.getSchedule(1).subscribe((data) => {
      expect(data).toEqual(expectData.data);
    });

    const req = backend.expectOne('/classes/1/schedule');
    expect(req.request.method).toEqual('GET');
    req.flush(expectData);
  });

  it('should made request to save data to expected URL', () => {
    service.saveSchedule(1, scheduleData).subscribe((data) => {
      expect(data).toEqual(expectData.data);
    });

    const req = backend.expectOne('/classes/1/schedule');
    expect(req.request.method).toEqual('POST');
    req.flush(expectData);
  });

});
