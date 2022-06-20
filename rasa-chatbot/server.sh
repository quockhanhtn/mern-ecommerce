#!/bin/sh

if [ -z "$PORT"]
then
  PORT=5005
fi

rasa run --model ./app/models --enable-api --cors "*" -p $PORT