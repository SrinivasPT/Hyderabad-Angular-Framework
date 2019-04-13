import { LoggerConfig } from './logger.config';

export class NGXLoggerConfigEngine {
  private iConfig;
  constructor(readonly config: LoggerConfig) {
    this.iConfig = config;
  }

  updateConfig(config: LoggerConfig) {
    this.iConfig = this.clone(config);
  }

  getConfig() {
    return this.clone(this.iConfig);
  }

  // TODO: add tests around cloning the config. updating an object passed into the config (or retrieving from the config)
  // should not update the active config
  private clone(object: any) {
    const cloneConfig: LoggerConfig = new LoggerConfig();

    Object.keys(object).forEach(key => {
      cloneConfig[key] = object[key];
    });

    return cloneConfig;
  }
}
