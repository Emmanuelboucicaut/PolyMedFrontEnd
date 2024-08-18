import { TestBed } from '@angular/core/testing';

import { PagePrincipaleService } from './page-principale.service';

describe('PagePrincipaleService', () => {
  let service: PagePrincipaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PagePrincipaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
