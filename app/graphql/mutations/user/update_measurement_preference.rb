class Mutations::User::UpdateMeasurementPreference < GraphQL::Schema::Mutation
  null true
  description 'Update user measurement preference'
  argument :measurement_preference, String, required: false
  payload_type Types::UserType

  def resolve(measurement_preference:)
    user = context[:current_user]

    return nil if !user

    unless measurement_preference === 'feet' ||
             measurement_preference === 'meters'
      raise GraphQL::ExecutionError, 'Valid values = feet, meters'
    end

    user.update!(measurement_preference: measurement_preference)
    user
  end
end
