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
        user_id: user_id
      )
    end
  end
end