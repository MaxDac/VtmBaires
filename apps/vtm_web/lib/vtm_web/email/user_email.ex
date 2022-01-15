defmodule VtmWeb.UserEmail do
  @moduledoc false

  import Swoosh.Email

  @postmaster_name "VTM Baires Postmaster"
  @postmaster_email "postmaster@vtmbaires.eu"

  def welcome(username, email, password) do
    new()
    |> to({username, email})
    |> from({@postmaster_name, @postmaster_email})
    |> subject("Benvenuto a VTM Baires, #{username}!")
    |> html_body("""
    <h1>Benvenuto!</h1><br />
    <br />
    <p>Per accedere la prima volta al sito, puoi usare la seguente password: <b>#{password}</b></p>
    <p>Ti consigliamo di cambiare la tua password immediatamente, accedendo alle <b>Opzioni</b> nel
    menu del sito una volta entrato.</p>
    <p>Se riscontri problemi di accesso, o qualunque altro problema, contattaci su <a href="https://discord.gg/3wHD3er8Du">Discord</a></p>
    """)
    |> text_body("""
    Benvenuto!\r\n
    \r\n
    Per accedere la prima volta al sito, puoi usare la seguente password: #{password}
    \r\n
    \r\n
    Ti consigliamo di cambiare la tua password immediatamente, accedendo alle Opzioni nel
    menu del sito una volta entrato.
    \r\n
    \r\n
    Se riscontri problemi di accesso, o qualunque altro problema, contattaci su Discord a questo link: https://discord.gg/3wHD3er8Du
    """)
  end

  def recover_password(username, email, new_password) do
    new()
    |> to({username, email})
    |> from({@postmaster_name, @postmaster_email})
    |> subject("VTM Baires: reset password")
    |> html_body("""
    <p>Abbiamo ricevuto una richiesta di aggiornamento password per l'utente #{username}.</p>
    <p>Per accedere al tuo utente, puoi usare la seguente password: #{new_password}.</p>
    <p><b>Non sei stato tu?</b> Chiama immediatamente un master del sito.</p>
    """)
    |> text_body("""
    <Abbiamo ricevuto una richiesta di aggiornamento password per l'utente #{username}.\r\n\r\n
    Per accedere al tuo utente, puoi usare la seguente password: #{new_password}.\r\n\r\n
    Non sei stato tu? Chiama immediatamente un master del sito.
    """)
  end
end
