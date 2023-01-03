FROM node AS BUILD_IMAGE
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN rm -rf node_modules
RUN npm install --production

FROM node
ENV NODE_ENV=production
WORKDIR /app
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/package.json ./
COPY --from=BUILD_IMAGE /app/package-lock.json ./
COPY --from=BUILD_IMAGE /app/nest-cli.json ./nest-cli.json
COPY --from=BUILD_IMAGE /app/.production.env ./.production.env
COPY --from=BUILD_IMAGE /app/dist ./dist

EXPOSE 8080
CMD [ "npm", "run", "start:prod" ]