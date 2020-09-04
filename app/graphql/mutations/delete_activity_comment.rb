module Mutations
  class DeleteActivityComment < GraphQL::Schema::Mutation
    argument :comment_id, ID, required: true

    type Types::ActivityCommentType

    def resolve(comment_id: nil)
      comment = ActivityComment.find_by_id(comment_id)
      comment.destroy
    end
  end
end