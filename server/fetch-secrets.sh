#!/bin/bash

# Function to fetch a secret from AWS Secrets Manager
# Assumes you have AWS CLI installed and configured with appropriate credentials
function fetch_secret {
  local secret_name="$1"
  aws secretsmanager get-secret-value --secret-id "$secret_name" --query SecretString --output text
}

# Fetch secrets from AWS Secrets Manager
SECRET_NAME="testSecret"

# Fetch the whole secret
SECRET_STRING=$(fetch_secret "$SECRET_NAME")

# Parse the JSON secret string to get individual values
DB_HOST=$(echo "$SECRET_STRING" | jq -r '.DB_HOST')
DB_PASSWORD=$(echo "$SECRET_STRING" | jq -r '.DB_PASSWORD')
JWT_SECRET=$(echo "$SECRET_STRING" | jq -r '.JWT_SECRET')
REDIS_URL=$(echo "$SECRET_STRING" | jq -r '.REDIS_URL')

# Export the secrets as environment variables
export DB_HOST
export DB_PASSWORD
export JWT_SECRET
export REDIS_URL
