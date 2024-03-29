# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1, defaults: { format: :json } do
      resources :categories
      resources :category_joins
      resources :days
      resources :day_joins
      resources :frequencies
      resources :frequency_joins
      resources :notes
      resources :todos
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
