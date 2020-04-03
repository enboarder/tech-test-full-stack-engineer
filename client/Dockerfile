FROM node:alpine
COPY . /var/lib/client/
WORKDIR /var/lib/client
RUN npm install
EXPOSE 3000
EXPOSE 35729
CMD ["npm", "start"]
