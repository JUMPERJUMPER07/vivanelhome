#!/usr/bin/env bash

set -euo pipefail

APP_DIR="/var/www/vivanelhome"
APP_NAME="vivanelhome"

echo "[1/6] Entrando na pasta do projeto..."
cd "$APP_DIR"

echo "[2/6] Atualizando codigo..."
if [ -d ".git" ]; then
  git pull
else
  echo "Repositorio Git nao encontrado em $APP_DIR"
fi

echo "[3/6] Instalando dependencias..."
npm install

echo "[4/6] Gerando build..."
npm run build

echo "[5/6] Reiniciando aplicacao..."
if pm2 describe "$APP_NAME" >/dev/null 2>&1; then
  pm2 restart "$APP_NAME"
else
  pm2 start npm --name "$APP_NAME" -- run start
fi

echo "[6/6] Salvando processo no PM2..."
pm2 save

echo "Deploy concluido com sucesso."
