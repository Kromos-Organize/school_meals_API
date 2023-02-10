module.exports = {
  apps : [{
    name:'school_meals_API',
    script: './dist/main.js',
    env_production: {
      NODE_ENV: '.production.env',
    },
    watch: '.'
  }, {
    script: './service-worker/',
    watch: ['./service-worker']
  }],

  deploy : {
    production : {
      key: '~/.ssh/id_rsa.pub',
      user : 'kromos',
      host : '65.21.245.221',
      ref  : 'origin/main',
      repo : 'https://github.com/Kromos-Organize/school_meals_API',
      path : '/home/kromos/school_meals_dev/school_meals_API',
      'pre-deploy-local': 'git checkout . && git checkout main && git pull',
      'post-deploy' : 'pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
