#!/bin/bash

export NODE_PATH=./api:$NODE_PATH

nodemon --ignore app api
