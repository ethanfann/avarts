<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/ethanfann/strava-clone">
  </a>

  <h3 align="center">My Strava Clone</h3>

  <p align="center">
    Just a fun learning project to recreate a https://strava.com.
    <br />
    <br />
    <a href="https://youtu.be/LmrOFXKklL4">View Demo</a>
    ·
    <a href="https://github.com/ethanfann/strava-clone/issues">Report Bug</a>
    ·
    <a href="https://github.com/ethanfann/strava-clone/issues">Request Feature</a>
    ·
    <a href="https://trello.com/b/spuSqAyQ">Roadmap</a>
  </p>
</p>

<!-- TABLE OF CONTENTS
## Table of Contents

- [About The Project](#about-the-project)
  - [Built With](#built-with)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Misc](#misc)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Codegen](#codegen)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
-->

<!-- ABOUT THE PROJECT -->

## About The Project

![](https://i.imgur.com/nR04Tyn.png)

### Built With

#### Frontend

- [React](https://reactjs.org/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [Mapbox](https://www.mapbox.com/)
- [Halfmoon CSS](https://www.gethalfmoon.com/docs/introduction/)

#### Backend

- [Rails](https://expressjs.com/)
- [GraphQL Ruby](https://graphql-ruby.org/)
- [Postgres](https://www.postgresql.org/)

#### Misc

- [GeoJSON](https://geojson.org/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- [Ruby 2.7.1](https://www.ruby-lang.org/en/)
- [Rails 6](https://rubyonrails.org/)
- [Node 14](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Postgres](https://www.postgresql.org/)

### Installation

```sh
git clone https://github.com/ethanfann/avarts.git avarts
cd avarts
```

Clone `env_sample` to .env for local development. We set it up with default rails `3000` and React `3001` ports:

```sh
cp env_sample .env
```

Clone `frontend/.env.example` to .env. This contains the Mapbox token used for activity static image creation.

```sh
cp frontend/.env.example frontend/.env
```

Install the bundle:

```sh
bundle install
```

Make sure the postresql is running on localhost. You may have to change your credentials under `/config/database.yml`:

```sh
rake db:create
rake db:migrate
rake db:seed
```

Run the development server:

```sh
rails s
```

While this is an API-only application you will not be able to access any routes via browser. Download a GraphQL client like [GraphiQL](https://github.com/graphql/graphiql) or others. 

Point the GraphQL IDE to `http://0.0.0.0:3000/graphql`

Start the frontend

```sh
cd frontend && npm install
npm run start
```

<!-- USAGE EXAMPLES -->

## Usage

### Codegen

We are using [GraphQL Code Generator](https://graphql-code-generator.com/) to provide React Hook-based mutations and queries.

To generate:

 1. Export the GraphQL Schema from Rails

```sh
rake graphql:schema:dump
```

2. Run Codegen

```sh
cd frontend && npm run codegen
```

<!-- CONTRIBUTING -->

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

[Ethan Fann](https://ethanfann.com) - [@ethanfann](https://twitter.com/ethancord) - github@ethanfann.com

Project Link: [https://github.com/ethanfann/strava-clone](https://github.com/ethanfann/strava-clone)
