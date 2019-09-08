Rails.application.routes.draw do
<<<<<<< Updated upstream
  root to: 'massages#index'  #ルートパスをmassagesに仮置き
  resources :massages, only:[:index]
=======
  devise_for :users
  root to: 'groups#index' 
  resources :users, only:[:edit,:update]
  resources :groups, only:[:new, :create, :edit, :update] do
    resources :messages, only:[:index,:create]
  end
>>>>>>> Stashed changes
end
