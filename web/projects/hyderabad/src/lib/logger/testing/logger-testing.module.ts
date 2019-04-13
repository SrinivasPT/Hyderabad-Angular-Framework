import { NgModule } from '@angular/core';
import { CustomNGXLoggerService } from '../custom-logger.service';
import { NGXLoggerHttpService } from '../http.service';
import { NGXLogger } from '../logger.service';
import { CustomNGXLoggerServiceMock } from './custom-logger.service.mock';
import { NGXLoggerHttpServiceMock } from './http.service.mock';
import { NGXLoggerMock } from './logger.service.mock';

@NgModule({
  providers: [
    { provide: NGXLogger, useClass: NGXLoggerMock },
    { provide: NGXLoggerHttpService, useClass: NGXLoggerHttpServiceMock },
    { provide: CustomNGXLoggerService, useClass: CustomNGXLoggerServiceMock }
  ]
})
export class LoggerTestingModule {}
