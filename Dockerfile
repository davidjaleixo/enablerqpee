#KBZ @ vf-OS project
#Thrinisha Mohandas thrinisha.mohandas@knowledgebiz.pt
# Dockerfile for a node container

#nodejs
FROM node:9

#Maintainer
LABEL description="Quality Performance Evaluator Enabler" 
LABEL maintainer="thrinisha.mohandas@knowledgebiz.pt"
LABEL vf-OS=true
LABEL vf-OS.icon=img/2.png
LABEL vf-OS.urlprefixReplace=true
LABEL vf-OS.frontendUri="/qualityperformanceenabler"
LABEL vf-OS.name=qualityperformanceenabler

# quality performance evaluator enabler directory
RUN mkdir -p /usr/src/qpee
# this lets the working directory for every COPY RUN and CMD command
WORKDIR /usr/src/qpee

# get the node package file
# wildcard used to ensure both package.json and package-lock.json are copied
COPY package*.json /usr/src/qpee/
COPY bower.json /usr/src/qpee/
COPY .bowerrc /usr/src/qpee/

# install dependencies
RUN npm install -g bower
RUN npm install
RUN bower install --allow-root

COPY . .

# expose the quality performance evaluator enabler port
EXPOSE 3000

CMD [ "npm", "start" ]
