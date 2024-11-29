#!/bin/bash

if [[ $VERCEL_GIT_COMMIT_REF == "main"  ]] ; then
  echo "This is our main branch"
  npm run build:ssr
fi
