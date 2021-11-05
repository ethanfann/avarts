<br />
<p align="center">
  <a href="https://github.com/ethanfann/avarts">
  </a>

  <h3 align="center">Avarts</h3>

  <p align="center">
		Avarts is a Covid-19 mini-project to recreate some of the basic features of https://strava.com.
  </p>
</p>

<a href="https://imgur.com/bP3Xszb"><img src="https://i.imgur.com/bP3Xszb.gif" title="source: imgur.com" /></a>

## About The Project

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

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

- [Ruby 3.0.2](https://www.ruby-lang.org/en/)
- [Rails 6](https://rubyonrails.org/)
- [Node 16](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Postgres](https://www.postgresql.org/)

### Installation

```sh
git clone https://github.com/ethanfann/avarts.git && cd avarts
```

Copy `.env.example` to `.env` for local development. Rails will run on port `3000` and React port `3001`:

```sh
cp .env.example .env
```

Copy `frontend/.env.example` to `frontend/.env`. This contains the Mapbox token used for activity static image creation:

```sh
cp frontend/.env.example frontend/.env
```

Install Ruby gems:

```sh
bundle install
```

Make sure postresql is running. You may have to change your credentials under `/config/database.yml`:

```sh
rake db:create
rake db:migrate
rake db:seed
```

Run the development server:

```sh
rails s
```

Start the frontend

```sh
cd frontend && npm install && npm run start
```

## GraphQL

Download a GraphQL client like [GraphiQL](https://github.com/graphql/graphiql) in order to execute queries and mutations against the Rails server.

Use `http://127.0.0.1:3000/graphql`

## Usage

### Codegen

We are using [GraphQL Code Generator](https://graphql-code-generator.com/) to provide typed React components and Hooks based on the generated GraphQL schema.

To generate:

1.  Export the GraphQL Schema from Rails

```sh
rake graphql:schema:dump
```

2. Run Codegen

```sh
cd frontend && npm run codegen
```

Note: This step is required after making any modifications to the Rails models or graphql types.

z ## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

[Ethan Fann](https://ethanfann.com) - [@ethanfann](https://twitter.com/ethancord) - github@ethanfann.com

Project Link: [https://github.com/ethanfann/avarts](https://github.com/ethanfann/avarts)
