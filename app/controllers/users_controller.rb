class UsersController < ApplicationController
  def index
    # @usersにUserテーブルからログインユーザー以外でkeywordに一部一致したものを代入。
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where.not(id: 
      current_user.id)
      # htmlの時とjsonの時、それぞれを呼び出す。
    respond_to do |format|
      format.html 
      # jsonで呼ばれた時、index.json.jbuilderへ
      format.json 
    end
  end

  def edit
  end

  def update
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
