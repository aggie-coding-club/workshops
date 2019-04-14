# Steps

## Part 1
1. Create `Dockerfile`
>a.`FROM nginx:alpine`\
>b. `COPY . /usr/share/nginx/html`  

2. Build and tag the docker image
>a. `docker build -t webserver-image:v1 .`\
>b. Test that the previous command worked by running `docker images`

3. Run the docker image locally
>a. `docker run -d -p 80:80 webserver-image:v1`\
>b. Test that this is working by navigating to your localhost:80 in your browser

## Part 2
1. Navigate to the `MyResume` folder

2. Build and tag the new docker image
>a. `docker build -t customwebserver-image:v1 .`\
>b. Test that the previous command worked by running `docker images`

3. Run the docker image locally
>a. If you are still running the service from Part 1, you can leave it running if you'd like but don't forget to change the port number in the following command to something like `80:81` (docker container port 80 is exposed but being served over your computers port 81). \
>b. `docker run -d -p 80:80 webserver-image:v1`\
>c. Test that this is working by navigating to your localhost:80 in your browser

Rohit Mucherla