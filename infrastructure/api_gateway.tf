# -----------------------------------
# API GATEWAY (HTTP API)
# -----------------------------------
resource "aws_apigatewayv2_api" "http_api" {
  name          = "serverless-api"
  protocol_type = "HTTP"
}

# -----------------------------------
# INTEGRATION (Lambda)
# -----------------------------------
resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.api_lambda.invoke_arn
  payload_format_version = "2.0"
}

# -----------------------------------
# ROUTES
# -----------------------------------

# Default route (optional health check)
resource "aws_apigatewayv2_route" "default_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

# SIGNUP
resource "aws_apigatewayv2_route" "signup" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /signup"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

# LOGIN
resource "aws_apigatewayv2_route" "login" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /login"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

# ADMIN (protected route)
resource "aws_apigatewayv2_route" "admin" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /admin"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

# -----------------------------------
# STAGE (AUTO DEPLOY)
# -----------------------------------
resource "aws_apigatewayv2_stage" "default" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

# -----------------------------------
# OUTPUT (IMPORTANT)
# -----------------------------------
output "api_url" {
  value = aws_apigatewayv2_api.http_api.api_endpoint
}