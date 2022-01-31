defmodule VtmWeb.Jobs.BackupChats do
  @moduledoc false

  alias Vtm.Chats

  def backup_chats() do
    with {n, _} <- Chats.create_chat_backups() do
      {:ok, n}
    end
  end

  def delete_older_chats() do
    with {n, _} <- Chats.delete_older_chats() do
      {:ok, n}
    end
  end
end
