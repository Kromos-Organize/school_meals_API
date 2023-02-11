module.exports = {
  apps : [{
    name:'school_meals_API',
    script: './dist/main.js',
    env: {
      NODE_ENV: '.production.env',
    },
    watch: true,
    log_date_format: 'DD-MM-YY HH:MM Z',
    error_file: '/home/kromos/school_meals_dev/school_meals_API/logs',
    log_file: '/home/kromos/school_meals_dev/school_meals_API/logs',
    out_file: '/home/kromos/school_meals_dev/school_meals_API/logs',
  }],

  deploy : {
    production : {
      key: '~/.ssh/id_rsa.pub',
      user : 'kromos',
      host : '65.21.245.221',
      ref  : 'origin/main',
      repo : 'git@github.com:Kromos-Organize/school_meals_API.git',
      path : '/home/kromos/school_meals_dev/school_meals_API',
      'pre-deploy-local': '',
      'post-deploy' : 'git checkout . && git checkout main && git pull && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
