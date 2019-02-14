# A Full Stack Dockerize NodeJS

[![Build Status](https://travis-ci.org/cryptostan101/full-stack-app.svg?branch=master)](https://travis-ci.org/cryptostan101/full-stack-app)

Write a basic Node.js/Express application that responds to several routes and communicates with MongoDB or SQLite to save and retrieve some information (e.g. a person, a pet, a car, you choose)

Having written the application, write several unit tests (using Mocha/Chai or Jest) to ensure the application behaves as expected.

Dockerise your application, and demonstrate running it in a container locally (on your computer)

Extra 1: Ensure good code style with ESLint
Extra 2: Create a basic Kubernetes Helm chart for the app and deploy (locally in Minikube or on the cloud)
Extra 3: Set up TravisCI to run a unit test check every time you update your repository and build the Docker container

Your code deployment should be tracked on a public git repository (on GitHub), and should include sufficient documentation/instructions to replicate. Follow good git practice to separate the development of each unit test.

## OS Requirement

- Install NodeJS
- Install Docker
- Install Kubernetes
- Install Minikube
- MongoDB


## Run Locally without Docker / Kubernetes

- Edit mongodb config.js file in the root of your project to your mongodb URL
- Run npm install
- Run npm start
- Go to http://localhost:5000

## Run with Docker / Kubernetes / Minikube

```bash
# Start Docker / Minikube / Kubernetes
# Modify node-controller.yaml file with docker image name e.g "<DOCKER_USERNAME>/node-image:full-stack"

# Run npm install
npm install

# Build docker image
docker image build -t node-image .

# Docker login with credentials
docker login

# Create a tag for docker image
docker tag ID <DOCKER_USERNAME>/node-image:full-stack

# Docker push
docker push <DOCKER_USERNAME>/node-image

# Create service and pod for NodeJS and MongoDB
kubectl create -f node-service.yaml

kubectl create -f node-controller.yaml

kubectl create -f mongo-service.yaml

kubectl create -f mongo-controller.yaml

# Run services to initiate connection

- kubectl describe svc mongo

- Kubectl describe svc full-stack

# Get IP ADD | NODEPORT use  command below
- kubectl describe svc full-Stack

- minikube ip

```


## View app
http://MINIKUBE_IP_ADDRESS:30061


## Run ESLint
npm run lint

## Run API test
npm run test
