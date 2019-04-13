import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CustomNGXLoggerService } from './custom-logger.service';
import { NGXLoggerHttpService } from './http.service';
import { LoggerConfig } from './logger.config';
import { NGXLogger } from './logger.service';

export * from './custom-logger.service';
export * from './http.service';
export * from './logger-monitor';
export * from './logger.config';
export * from './logger.service';
export * from './types/logger-level.enum';
export * from './types/ngx-log.interface';
export * from './utils/logger.utils';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [NGXLogger, NGXLoggerHttpService, CustomNGXLoggerService]
})
export class LoggerModule {
  static forRoot(config: LoggerConfig | null | undefined): ModuleWithProviders {
    return {
      ngModule: LoggerModule,
      providers: [{ provide: LoggerConfig, useValue: config || {} }, NGXLogger, NGXLoggerHttpService, CustomNGXLoggerService]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: LoggerModule,
      providers: [NGXLogger, NGXLoggerHttpService, CustomNGXLoggerService]
    };
  }
}
