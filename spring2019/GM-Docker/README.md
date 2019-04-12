This is where I am going to put some docker stuff...this is a place holder until I get the content for this


Steps

1. Create `Dockerfile`
a.`FROM nginx:alpine`
b. `COPY . /usr/share/nginx/html`  

2. Build and tag the docker image
a. `docker build webserver-image:v1 .`
b. Test that the previous command worked by running `docker images`



Rohit Mucherla
