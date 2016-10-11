#!/bin/bash

pm2 stop server
pm2 stop webhookListener
pm2 delete server
pm2 delete webhookListener
git reset --hard
git pull
echo "module.exports = {url : 'mongodb://localhost:12345/'}" >  ../config/db.js
pm2 start webhookListener.js
cd ..
pm2 start server.js


