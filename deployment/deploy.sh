#!/bin/bash

git reset --hard
git pull
echo "module.exports = {url : 'mongodb://localhost:12345/'}" ../config/db.js
pm2 restart server

