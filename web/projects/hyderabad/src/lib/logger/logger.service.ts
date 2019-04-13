import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { NGXLoggerConfigEngine } from './config.engine';
import { NGXLoggerHttpService } from './http.service';
import { NGXLoggerMonitor } from './logger-monitor';
import { LoggerConfig } from './logger.config';
import { NgxLoggerLevel } from './types/logger-level.enum';
import { NGXLogInterface } from './types/ngx-log.interface';
import { NGXLoggerUtils } from './utils/logger.utils';

export const Levels = ['TRACE', 'DEBUG', 'INFO', 'LOG', 'WARN', 'ERROR', 'FATAL', 'OFF'];

@Injectable()
export class NGXLogger {
  private readonly isIE: boolean;
  // tslint:disable-next-line: ban-types
  private readonly logFunc: Function;
  private configService: NGXLoggerConfigEngine;
  private customHttpHeaders: HttpHeaders;
  private customParams: HttpParams;

  private loggerMonitor: NGXLoggerMonitor;

  constructor(
    private readonly httpService: NGXLoggerHttpService,
    loggerConfig: LoggerConfig,
    @Inject(PLATFORM_ID) private readonly platformId
  ) {
    this.isIE =
      isPlatformBrowser(platformId) &&
      !!(navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.match(/Trident\//) || navigator.userAgent.match(/Edge\//));

    // each instance of the logger should have their own config engine
    this.configService = new NGXLoggerConfigEngine(loggerConfig);

    this.logFunc = this.isIE ? this._logIE.bind(this) : this._logModern.bind(this);
  }

  public trace(message, ...additional: any[]): void {
    this._log(NgxLoggerLevel.TRACE, message, additional);
  }

  public debug(message, ...additional: any[]): void {
    this._log(NgxLoggerLevel.DEBUG, message, additional);
  }

  public info(message, ...additional: any[]): void {
    this._log(NgxLoggerLevel.INFO, message, additional);
  }

  public log(message, ...additional: any[]): void {
    this._log(NgxLoggerLevel.LOG, message, additional);
  }

  public warn(message, ...additional: any[]): void {
    this._log(NgxLoggerLevel.WARN, message, additional);
  }

  public error(message, ...additional: any[]): void {
    this._log(NgxLoggerLevel.ERROR, message, additional);
  }

  public fatal(message, ...additional: any[]): void {
    this._log(NgxLoggerLevel.FATAL, message, additional);
  }

  public setCustomHttpHeaders(headers: HttpHeaders) {
    this.customHttpHeaders = headers;
  }

  public setCustomParams(params: HttpParams) {
    this.customParams = params;
  }

  public registerMonitor(monitor: NGXLoggerMonitor) {
    this.loggerMonitor = monitor;
  }

  public updateConfig(config: LoggerConfig) {
    this.configService.updateConfig(config);
  }

  public getConfigSnapshot(): LoggerConfig {
    return this.configService.getConfig();
  }

  private _logIE(level: NgxLoggerLevel, metaString: string, message: string, additional: any[]): void {
    // Coloring doesn't work in IE
    // make sure additional isn't null or undefined so that ...additional doesn't error
    additional = additional || [];

    switch (level) {
      case NgxLoggerLevel.WARN:
        console.warn(`${metaString} `, message, ...additional);
        break;
      case NgxLoggerLevel.ERROR:
      case NgxLoggerLevel.FATAL:
        console.error(`${metaString} `, message, ...additional);
        break;
      case NgxLoggerLevel.INFO:
        // tslint:disable-next-line: no-console
        console.info(`${metaString} `, message, ...additional);
        break;
      default:
        console.log(`${metaString} `, message, ...additional);
    }
  }

  private _logModern(level: NgxLoggerLevel, metaString: string, message: string, additional: any[]): void {
    const color = NGXLoggerUtils.getColor(level);

    // make sure additional isn't null or undefined so that ...additional doesn't error
    additional = additional || [];

    switch (level) {
      case NgxLoggerLevel.WARN:
        console.warn(`%c${metaString}`, `color:${color}`, message, ...additional);
        break;
      case NgxLoggerLevel.ERROR:
      case NgxLoggerLevel.FATAL:
        console.error(`%c${metaString}`, `color:${color}`, message, ...additional);
        break;
      case NgxLoggerLevel.INFO:
        // tslint:disable-next-line: no-console
        console.info(`%c${metaString}`, `color:${color}`, message, ...additional);
        break;
      //  Disabling console.trace since the stack trace is not helpful. it is showing the stack trace of
      // the console.trace statement
      // case NgxLoggerLevel.TRACE:
      //   console.trace(`%c${metaString}`, `color:${color}`, message, ...additional);
      //   break;

      //  Disabling console.debug, because Has this hidden by default.
      // case NgxLoggerLevel.DEBUG:
      //   console.debug(`%c${metaString}`, `color:${color}`, message, ...additional);
      //   break;
      default:
        console.log(`%c${metaString}`, `color:${color}`, message, ...additional);
    }
  }

  private _log(level: NgxLoggerLevel, message, additional: any[] = [], logOnServer: boolean = true): void {
    const config = this.configService.getConfig();
    const isLog2Server = logOnServer && config.serverLoggingUrl && level >= config.serverLogLevel;
    const isLogLevelEnabled = level >= config.level;

    if (!(message && (isLog2Server || isLogLevelEnabled))) {
      return;
    }

    const logLevelString = Levels[level];

    message = NGXLoggerUtils.prepareMessage(message);

    // only use validated parameters for HTTP requests
    const validatedAdditionalParameters = NGXLoggerUtils.prepareAdditionalParameters(additional);

    const timestamp = new Date().toISOString();

    const callerDetails = NGXLoggerUtils.getCallerDetails();

    const logObject: NGXLogInterface = {
      message,
      additional: validatedAdditionalParameters,
      level,
      timestamp,
      fileName: callerDetails.fileName,
      lineNumber: callerDetails.lineNumber
    };

    if (this.loggerMonitor && isLogLevelEnabled) {
      this.loggerMonitor.onLog(logObject);
    }

    if (isLog2Server) {
      // make sure the stack gets sent to the server
      message = message instanceof Error ? message.stack : message;
      logObject.message = message;

      const headers = this.customHttpHeaders || new HttpHeaders();
      headers.set('Content-Type', 'application/json');

      const options = {
        headers,
        params: this.customParams || new HttpParams(),
        responseType: config.httpResponseType || 'json'
      };
      // Allow logging on server even if client log level is off
      this.httpService.logOnServer(config.serverLoggingUrl, logObject, options).subscribe(
        (res: any) => {
          // I don't think we should do anything on success
        },
        (error: HttpErrorResponse) => {
          this._log(NgxLoggerLevel.ERROR, `FAILED TO LOG ON SERVER: ${message}`, [error], false);
        }
      );
    }

    // if no message or the log level is less than the environ
    if (isLogLevelEnabled && !config.disableConsoleLogging) {
      const metaString = NGXLoggerUtils.prepareMetaString(timestamp, logLevelString, callerDetails.fileName, callerDetails.lineNumber);

      return this.logFunc(level, metaString, message, additional);
    }
  }
}
