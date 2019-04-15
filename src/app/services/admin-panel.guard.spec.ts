import { TestBed, async, inject } from '@angular/core/testing';

import { AdminPanelGuard } from './admin-panel.guard';

describe('AdminPanelGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminPanelGuard]
    });
  });

  it('should ...', inject([AdminPanelGuard], (guard: AdminPanelGuard) => {
    expect(guard).toBeTruthy();
  }));
});
