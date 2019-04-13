# Steps

1. Create `Dockerfile`
>a.`FROM nginx:alpine`\
>b. `COPY . /usr/share/nginx/html`  

2. Build and tag the docker image
>a. `docker build -t webserver-image:v1 .`\
>b. Test that the previous command worked by running `docker images`

3. Run the docker image locally
>a. `docker run -d -p 80:80 webserver-image:v1`\
>b. Test that this is working by navigating to your localhost:80 in your browser

Rohit Mucherla
