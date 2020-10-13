<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/ethanfann/avarts">
  </a>

  <h3 align="center">	<a href="https://avarts.ethanfann.com">Avarts</a>
</h3>


  <p align="center">
		Avarts (Strava spelled backwards) is a Covid-19 mini-project to recreate some of the common features of https://strava.com.
    <br />
    <br />
    <a href="https://youtu.be/LmrOFXKklL4">View Demo</a>
    ·
    <a href="https://github.com/ethanfann/avarts/issues">Report Bug</a>
    ·
    <a href="https://trello.com/b/spuSqAyQ">Roadmap</a>
  </p>
</p>

<!-- ABOUT THE PROJECT -->


![](https://i.imgur.com/nR04Tyn.png)

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

#### Misc

- [GeoJSON](https://geojson.org/)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

- [Ruby 2.7.1](https://www.ruby-lang.org/en/)
- [Rails 6](https://rubyonrails.org/)
- [Node 14](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [Postgres](https://www.postgresql.org/)

### Installation

```sh
git clone https://github.com/ethanfann/avarts.git avarts
cd avarts
```

Clone `.env.example` to `.env` for local development. Rails will run on port `3000` and React port `3001` by default:

```sh
cp .env.eample .env
```

Clone `frontend/.env.example` to `frontend/.env`. This contains the Mapbox token used for activity static image creation:

```sh
cp frontend/.env.example frontend/.env
```

Install Ruby gems:

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

Rails runs in API mode and as such, you will not be able to access any Rails routes via browser. Download a GraphQL client like [GraphiQL](https://github.com/graphql/graphiql) or others.

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

Project Link: [https://github.com/ethanfann/avarts](https://github.com/ethanfann/avarts)
