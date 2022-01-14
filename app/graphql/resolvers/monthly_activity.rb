class Resolvers::MonthlyActivity < GraphQL::Schema::Resolver

  type [Types::ActivityType], null: false
  description "Returns the activities for the previous month"

  def resolve()
    if context[:current_user].nil?
      raise GraphQL::ExecutionError, 'Not Authenticated'
    end
    
    Activity
      .where(user_id: context[:current_user].id)
      .where('created_at > ?', 30.days.ago)
      .order('created_at DESC')
  end
end
