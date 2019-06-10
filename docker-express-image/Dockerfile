# download the last version of node
FROM node:10.16

# copy the dynamic content
WORKDIR /opt/app
COPY src /opt/app
RUN npm install

# run node server
CMD ["npm","start"]