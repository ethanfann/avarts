module Mutations
  class DeleteActivity < GraphQL::Schema::Mutation
    argument :activity_id, ID, required: true

    type Types::ActivityType

    def resolve(activity_id: nil)
      if context[:current_user].nil?
        raise GraphQL::ExecutionError, 'Not Authenticated'
      end

      activity = Activity.find_by_id(activity_id)

      if context[:current_user].id != activity.user_id
        raise GraphQL::ExecutionError, 'Access Denied'
      end

      activity.destroy
    end
  end
end
