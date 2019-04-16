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
>a. If you are still running the service from Part 1, you can leave it running if you'd like but don't forget to change the port number in the following command to something like `81:80` (docker container port 80 is exposed but being served over your computers port 81). In order to stop the first service, please run `docker stop <ID>`\
>b. `docker run -d -p 80:80 customwebserver-image:v1`\
>c. Test that this is working by navigating to your localhost:80 in your browser

4. To remove docker images / containers
>a. List docker images using `docker images`
>b. Remove docker image by using the image ID and entering that in the command `docker rmi <Image_ID>`
>c. List docker containers by using `docker ps` 
>d. Remove docker container by using the command `docker rm <Container_ID>`

For questions --> Rohit Mucherla (rohit.mucherla@gm.com)