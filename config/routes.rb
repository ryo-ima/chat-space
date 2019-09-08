Rails.application.routes.draw do
  devise_for :users
  root to: 'groups#index'  #ルートパスをmassagesに仮置き
  resources :users, only:[:edit,:update]
  resources :groups, only:[:new, :create, :edit, :update] do
    resources :messages, only:[:index,:create]
  end
end
