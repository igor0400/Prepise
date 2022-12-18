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
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/.next ./.next

EXPOSE 80
CMD [ "npm", "start" ] 