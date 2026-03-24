# Hostinger VPS Checklist

## 1. Preparacao da VPS

- Atualizar pacotes do Ubuntu.
- Instalar `nginx`, `git`, `curl`, `nodejs` e `pm2`.
- Confirmar `node -v`, `npm -v` e `pm2 -v`.

## 2. Projeto

- Copiar o projeto para `/var/www/vivanelhome`.
- Rodar `npm install`.
- Criar `.env.local`.

Exemplo de `.env.local`:

```env
AUTH_SECRET=troque-por-uma-chave-grande-segura
ADMIN_PASSWORD=vivanel123
ADMIN_PASSWORD_HASH=scrypt:16384:8:1:a9685b04af9795efa01307c3320f3b74:366a176dab9b8fc16c36d4797a9339bf025cd0e18aff7663532bf8c9c45b5680a5460e1ac02b31d6fc645f0a2c6e7bca9ddb4094a8a57bd29eaa9da0a1c9561e
```

## 3. Build e processo

- Rodar `npm run build`.
- Iniciar com `pm2 start npm --name vivanelhome -- run start`.
- Rodar `pm2 save`.

## 4. Nginx

- Copiar `hostinger-nginx-vivanelhome.conf` para `/etc/nginx/sites-available/vivanelhome`.
- Criar link simbolico em `/etc/nginx/sites-enabled/vivanelhome`.
- Validar com `nginx -t`.
- Reiniciar com `systemctl restart nginx`.

## 5. DNS

- Registro `A` para `@` apontando para o IP da VPS.
- Registro `A` para `www` apontando para o IP da VPS.

## 6. SSL

- Instalar `certbot`.
- Rodar:

```bash
certbot --nginx -d vivanelhome.com.br -d www.vivanelhome.com.br
```

## 7. URLs finais

- Loja: `https://vivanelhome.com.br`
- Admin: `https://vivanelhome.com.br/admin-acesso-seguro/login`

## 8. Backup importante

Salvar copia periodica de:

- `storage/vivanelhome.db`
- `public/uploads/products`
- `.env.local`

## 9. Atualizacao futura

Rodar:

```bash
cd /var/www/vivanelhome
bash deploy-hostinger.sh
```
