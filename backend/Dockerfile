FROM node:22-alpine

# A linha mágica: Instala o OpenSSL que o Prisma precisa
RUN apk add --no-cache openssl

WORKDIR /app
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm prisma generate
RUN pnpm build
EXPOSE 3000

# Em produção, aplicamos a migração e rodamos a versão compilada
CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm start"]