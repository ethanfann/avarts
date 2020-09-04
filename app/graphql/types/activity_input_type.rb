class Types::ActivityInputType < Types::BaseInputObject
  description "Attributes to upload a activity."
  argument :title, String, 'Title of activity', required: true
  argument :description, String, 'Description of activity', required: true
  argument :geo_json, GraphQL::Types::JSON, 'GeoJSON of activity', required: true
  argument :user_id, ID, 'User ID of the uploader', required: true
end