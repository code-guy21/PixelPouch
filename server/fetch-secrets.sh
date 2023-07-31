#!/bin/bash

# Function to fetch a secret from AWS Secrets Manager
# Assumes you have AWS CLI installed and configured with appropriate credentials
function fetch_secret {
  local secret_name="$1"
  aws secretsmanager get-secret-value --secret-id "$secret_name" --query SecretString --output text
}

# Fetch secrets from AWS Secrets Manager
DB_HOST_SECRET_NAME="testSecret/DB_HOST"
DB_PASSWORD_SECRET_NAME="testSecret/DB_PASSWORD"
JWT_SECRET_SECRET_NAME="testSecret/JWT_SECRET"
REDIS_URL_SECRET_NAME="testSecret/REDIS_URL"

# Fetch each secret and store them in variables
DB_HOST=$(fetch_secret "$DB_HOST_SECRET_NAME")
DB_PASSWORD=$(fetch_secret "$DB_PASSWORD_SECRET_NAME")
JWT_SECRET=$(fetch_secret "$JWT_SECRET_SECRET_NAME")
REDIS_URL=$(fetch_secret "$REDIS_URL_SECRET_NAME")

# Export the secrets as environment variables
export DB_HOST
export DB_PASSWORD
export JWT_SECRET
export REDIS_URL