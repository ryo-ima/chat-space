class MessagesController < ApplicationController
  before_action :set_group

  def index
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create
    # @messageに@group.messagesの新規インスタンスを代入。各値はmessage_paramsから取得
    @message = @group.messages.new(message_params)
    # もし、messageを保存するなら
    if @message.save
      # htmlとjsonに分ける
      respond_to do |format|
        # htmlの場合はgroupidのページに強制的にリダイレクトする
        format.html { redirect_to "group_messages_path(params[:group_id])", notice: 'メッセージが送信されました' }
        # jsonファイルへ
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private
  # message_paramsが呼び出された時の処理
  def message_params
    # 入力されたものからデータベースに送れるものをメッセージに入っているcontent image と、ログイン中ユーザーidに厳選
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end