defmodule Vtm.Messages.MessageDigest do
  @moduledoc false

  defstruct total_messages: 0, unread_messages: 0

  @type t :: %__MODULE__{
    total_messages: non_neg_integer(),
    unread_messages: non_neg_integer()
  }
end
