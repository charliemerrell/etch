# Etch

A flashcard app for spaced retrieval.

<img width="397" alt="Screenshot 2021-08-20 at 07 37 42" src="https://user-images.githubusercontent.com/44523714/130190985-2c55be52-2294-40eb-aaab-c2a51faf4dbd.png">

## App

The idea of the app is to help you etch facts in long-term memory. Every time you correctly answer a flashcard, the interval before you're asked it again increases (until, eventually, the card is finished). If you answer incorrectly, the interval will decrease.

<img width="1280" alt="Screenshot 2021-08-20 at 07 36 38" src="https://user-images.githubusercontent.com/44523714/130191083-f02404a8-77db-4400-97f4-0649379bbac5.png">

## Stack

Node, Express, React, PostgreSQL, Redis, Docker.

## Why I made it

I made this app mostly to learn some Docker as well as to consolidte my React and Node/Express skills.

## Running Locally

The app is dockerised so you'll need to install and open Docker Desktop first.

To run in development mode: `docker-compose --env-file ./config/.env.dev up`

To run tests: `docker-compose --env-file ./config/.env.test up`

You can run `node scripts/seedForDev.js` on the api container to add some seed data. You can then login with: email: "johnsmith@etchtestapp.com", password: "password1".

## Plans 

I had some difficulty finding a nice way to get Cypress tests incorporated with Docker into the app. This is what I was working on last.
