Rails.application.routes.draw do
  root to: 'massages#index'  #ルートパスをmassagesに仮置き
  resources :massages, only:[:index]
end
