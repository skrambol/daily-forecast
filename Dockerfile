FROM node:18-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

EXPOSE 5173
ENV VITE_ACCUWEATHER_API_KEY update_me

CMD ["npm", "run", "dev"]
