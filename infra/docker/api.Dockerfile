FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --workspace @mailio/api
EXPOSE 4000
CMD ["node", "services/api/dist/server.js"]
