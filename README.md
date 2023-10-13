# AlgoVisual
Final Year Project for Information Engineering and Media
By Darren Soh
# Current Tech Stacks:
Gin Framework, ReactJS, MongoDB, GraphQL

# Findings:
Important for go gin to rebuild by rebooting,
Need to Echo path everytime we run swag init to refresh changes made in Swagger
Primitive bson is superior because it gives a hard to decrypt string as key.

# Installations:
Install Docker and Docker Compose

Install below in terminal
cURL https://github.com/judge0/judge0/releases/download/v1.13.0/judge0-v1.13.0.zip
unzip judge0-v1.13.0.zip

Run all services and wait a few seconds until everything is initialized:
cd judge0-v1.13.0
docker-compose up -d db redis
sleep 10s
docker-compose up -d
sleep 5s

Your instance of Judge0 CE v1.13.0 is now available at http://<IP ADDRESS OF YOUR SERVER>:2358.
