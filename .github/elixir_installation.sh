wget https://packages.erlang-solutions.com/erlang-solutions_2.0_all.deb && sudo dpkg -i erlang-solutions_2.0_all.deb
sudo apt-get update -y
sudo apt-get install esl-erlang -y
sudo apt-get install elixir -y
mix local.hex --force -y
mix archive.install hex phx_new
