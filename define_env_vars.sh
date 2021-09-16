#!/bin/sh

echo "Database url"
echo ecto://$1:$2@$3/$4

export SECRET_KEY_BASE=`mix phx.gen.secret`
export DATABASE_URL=ecto://$1:$2@$3/$4
$1