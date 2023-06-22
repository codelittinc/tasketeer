# Tasketeer

<img align="right" height="250" src="docs/mascot.png">

[Tasketeer](https://tasketeer.ai/) is a bot that runs on Slack and helps you quickly find information in your private documents. You can ask the bot a question, and it will search through the indexed files for relevant information. 

Tasketeer also provides a web application that allows you to add any documents you want to search through. The web application also allows you to view the documents that have been indexed and the questions that have been asked to the bot. 

You can also talk to the bot directly on the web application, and it will respond to your questions.

## Requirements

To run Tasketeer, you need to have the following tools installed on your machine:

- [Docker](https://docs.docker.com/get-docker/): Docker is used to containerize the application and its dependencies.
- [Docker Compose](https://docs.docker.com/compose/install/): Docker Compose is used to orchestrate the containers and services required for Tasketeer.

## App Characteristics

1. Tasketeer depends on 2 other microservices:
    - [Notifications service](https://github.com/codelittinc/notifications/): This service is responsible for communication via Slack.
    - [Tasketeer NLP](https://github.com/codelittinc/tasketeer-nlp-processor): This service is responsible for the NLP processing of the questions and documents.

2. Tasketeer requires the following services and databases:
    - [PostgreSQL](https://www.postgresql.org/): The PostgreSQL database is used to store Tasketeer's data.
    - [Redis](https://redis.io/): Redis is used as a cache and messaging broker for Tasketeer.
    - [Sidekiq](https://sidekiq.org/): Sidekiq is used for background job processing in Tasketeer.

3. Tasketeer utilizes the following technologies and frameworks:
    - Front-end: The web application is built with [React](https://reactjs.org/).
    - Back-end: The back-end is built with [Ruby on Rails](https://rubyonrails.org/).

4. File Storage and Extraction:
   - Tasketeer uses [Box](https://www.box.com/) to store files and extract their contents. To enable this integration, you need to generate an application key, as described in the [Box documentation](https://developer.box.com/guides/authentication/app-token/).

5. Configuration and Integration:
    - Tasketeer integrates with the [Notifications service](https://github.com/codelittinc/notifications/) to send messages to users via Slack. To enable this integration, you need to generate an application key, as described in the [Notifications service documentation](https://github.com/codelittinc/notifications/#configuring-your-first-slack-provider).


## How to Run the Project

### Running Only Tasketeer
Make sure to update the `.env` file with your environment variables.

There is a bash script that will build the required containers. Run the following command to execute the script:
```bash
sh bin/dev
```

Once inside the Docker container, execute the following commands:

```bash
bundle exec rails db:create
bundle exec rails db:migrate

yarn install

foreman start -f Procfile.dev
```

Access the Tasketeer web application in your browser at http://localhost:3000.


### Running Tasketeer and All Services

Tasketeer includes a `docker-compose.nlp.yml` file that runs all the services required for the project.

Make sure to update the following environment files with your environment variables:

- `.env.nlp`: Contains the environment variables for the NLP service.
- `.env.notifications`: Contains the environment variables for the notifications service.
- `.env`: Contains the environment variables for Tasketeer.

To start all the Docker containers for the project, run the following command:
```bash
npm run docker:start:all
```

## Development

We are using the gem `annotate` to better visualize the models and their relationships.

After creating a database migration, run the following command to annotate the models:

```bash
rake annotate_models
```
