interface AppConfig {
  PORT: number;
}

const configuration: AppConfig = {
  PORT: parseInt(process.env.PORT) || 3000,
};

export default configuration;
