<p align="center">
  <a href="https://github.com/ethanfann/avarts">
  </a>

  <h3 align="center">Avarts</h3>

  <p align="center">
		Avarts (name change pending) is an open-source, self-hostable, and private fitness app with some of the basic features from <a href="https://strava.com">Strava</a>.
  </p>
</p>

<br />

<img src="https://i.imgur.com/sBIw5x8.gif" title="source: imgur.com" />

<br />

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

Docker is the quickest way of getting a local development server up and running.

### Prerequisites

- [Docker](https://www.docker.com/)
- [Mapbox API Token](https://www.mapbox.com/)

### Installation

```sh
git clone https://github.com/ethanfann/avarts.git && cd avarts
```

Copy `.env.example` to `.env`

```sh
cp .env.example .env
```

Open `.env` and update the following:

- `MAPBOX_TOKEN`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_FIRST_NAME`
- `ADMIN_LAST_NAME`

Admin `.env` variables will be used during database seed to create the default admin account.

Copy `frontend/.env.example` to `frontend/.env`. This contains an env variable, `REACT_APP_SERVER_URL` that points to the server.

```sh
cp frontend/.env.example frontend/.env
```

Run Docker Compose, which will spin a Rails environment, Postgres database, Redis in-memory cache, and Sidekiq worker.

```sh
docker compose up
```

Create, migrate, and seed the database.

```sh
docker exec -it avarts-app-1 sh -c "rails db:create && rails db:migrate && rails db:seed"
```

Start the frontend in a separate terminal, which will open a webpage at `localhost:3001` once done.

```sh
cd frontend && npm install && npm run start
```

Login with `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`

## GraphQL

Download a GraphQL client like [GraphiQL](https://github.com/graphql/graphiql) and point it to `http://127.0.0.1:3000/graphql` in order to execute queries and mutations against the server.

### Types

All GraphQL responses are statically typed. Create a new file in `app/graphql/types` in order to add a new type.

Ex.

`activity_comment_type.rb`

```rb
module Types
  class ActivityCommentType < BaseModel
    field :comment, String, null: false
    field :user, UserType, null: false
  end
end
```

### Queries

The general process for creating a new query is as follows:

1. Create a resolver in `app/graphql/resolvers/`
2. Append the resolver to `app/graphql/types/query_type.rb`

Ex.

`app/graphql/resolvers/ping.rb `

```rb
class Resolvers::Ping < GraphQL::Schema::Resolver
  type String, null: false
  description 'Ping Pong'

  def resolve
    'Pong'
  end
end
```

```rb
module Types
  class QueryType < BaseObject
    # ...
    field :ping, resolver: Resolvers::Ping
    # ...
  end
end=
```

### Mutations

The general process for creating a new mutation is as follows:

1. Create a resolver in `app/graphql/mutations/`
2. Append the resolver to `app/graphql/types/mutation_type`

Ex.

`app/graphql/mutations.add_activity_comment.rb`

```rb
module Mutations
  class AddActivityComment < GraphQL::Schema::Mutation
    argument :comment, String, required: true
    argument :activity_id, ID, required: true
    argument :user_id, ID, required: true

    type Types::ActivityCommentType

    def resolve(comment: nil, activity_id: nil, user_id: nil)
      ActivityComment.create!(
        comment: comment,
        activity_id: activity_id,
        user_id: user_id,
      )
    end
  end
end
```

### Codegen

[GraphQL Code Generator](https://graphql-code-generator.com/) is used to provide typed components and hooks for use in the frontend React SPA.

To generate a schema from Rails.

1.  Export the GraphQL Schema from Rails

```sh
rake graphql:schema:dump
```

2. Run Codegen

```sh
cd frontend && npm run codegen
```

Note: This step is required after making any modifications to the Rails models or graphql types.

3. Add the mutation/query in `frontend/src/graphql/[mutations/query]`

`frontend/src/graphql/mutations/addActivityComment.mutation.ts`

```ts
import gql from "graphql-tag";

export default gql`
  mutation AddActivityComment(
    $comment: String!
    $userId: ID!
    $activityId: ID!
  ) {
    addActivityComment(
      comment: $comment
      userId: $userId
      activityId: $activityId
    ) {
      id
    }
  }
`;
```

4. Import a Query/Mutation

`frontend/src/components/UploadForm.tsx`

```tsx
import { useAddActivityCommentMutation } from "../../generated/graphql";
```

```tsx
const ActivityCommentBox = (props: Props) => {
  // ...
  const [addActivityCommentMutation] = useAddActivityCommentMutation()

  // ...

 const addComment = async (e: React.FormEvent, currentUser: UserType) => {
    e.preventDefault()
    if (currentUser && currentUser.id && activityId) {
      await addActivityCommentMutation({
        variables: {
          comment: comment,
          userId: currentUser.id,
          activityId: activityId,
        },
        refetchQueries: ['myActivites'],
      })
    }
    // ...
  }

   return (
     // ...
   )
}
```

## Terraform

Terraform is used to manage the creation of AWS resources for running in production. Currently this includes:

- S3: Stores user avatar and Mapbox static activity ride images.
- Cloudfront: Serves S3 assets over a CDN.

1. Install [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
2. Verify an [AWS profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html) has been created in `~/.aws`.
3. Run the Terraform commands below

```
terraform init
terraform plan
terraform apply
```

## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

[Ethan Fann](https://ethanfann.com) - github@ethanfann.com

Project Link: [https://github.com/ethanfann/avarts](https://github.com/ethanfann/avarts)
