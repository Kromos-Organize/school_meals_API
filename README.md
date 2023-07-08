## Запуск pgAdmin для меня 
>cd pgadmin4 && source pgadmin4env/bin/activate && python /home/kromos/pgadmin4/pgadmin4env/lib/python3.8/site-packages/pgadmin4/pgAdmin4.py


# DEPLOY

1. git checkout . && git pull
2. npm install && npm run build
3. NODE_ENV=production pm2 start npm --name strapi -- run start