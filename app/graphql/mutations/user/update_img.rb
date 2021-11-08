class Mutations::User::UpdateImg < GraphQL::Schema::Mutation
  include ApolloUploadServer
  include ActiveStorage
  null true
  description 'Update user img'
  argument :img, ApolloUploadServer::Upload, required: true
  payload_type Types::UserType

  def resolve(img:)
    file = img
    blob =
      ActiveStorage::Blob.create_and_upload!(
        io: file,
        filename: file.original_filename,
        content_type: file.content_type
      )
    user = context[:current_user]
    return nil if !user
    user.update(img: blob)
    user
  end
end
