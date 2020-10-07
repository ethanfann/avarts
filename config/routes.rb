Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
	devise_for :users

	root 'application#frontend_index_html'
	get '*path', to: 'application#frontend_index_html', constraints: lambda { |request|
		!request.xhr? && request.format.html?
	}
end
