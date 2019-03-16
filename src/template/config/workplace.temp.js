
function createWPConfig() {
  return {
    projects: {}
  };
}

function createNPMConfig(wpName = '') {
  return `{
    "name": "${wpName}",
    "version": "1.0.0",
    "private": true,
    "scripts": {},
    "dependencies": {
      "axios": "^0.18.0",
      "body-parser": "~1.18.2",
      "cookie-parser": "~1.4.3",
      "debug": "~2.6.9",
      "express": "~4.15.5",
      "hbs": "~4.0.1",
      "mockjs": "^1.0.1-beta3",
      "morgan": "~1.9.0",
      "serve-favicon": "~2.4.5"
    }
  }`;
}

module.exports = {
  createWPConfig,
  createNPMConfig
};

