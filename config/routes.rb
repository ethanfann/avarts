Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
	devise_for :users

	get '*path', to: 'application#frontend_index_html', constraints: lambda { |request|
		!request.xhr? && request.format.html?
	}
end
