import { inject, TestBed } from '@angular/core/testing';
import { NGXLoggerHttpService } from './http.service';
import { LoggerConfig } from './logger.config';
import { NGXLogger } from './logger.service';
import { NGXLoggerHttpServiceMock } from './testing/http.service.mock';

describe('NGXLogger', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NGXLogger, { provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock }, LoggerConfig]
    });
  });

  it('should handle circular structures', inject([NGXLogger], (logger: NGXLogger) => {
    const a = {
      test: 'test'
    };

    // tslint:disable-next-line: no-string-literal
    a['a'] = a;

    spyOn(window, 'console');

    logger.error('test', a);

    expect(window.console).toHaveBeenCalledWith('false');
  }));
});
