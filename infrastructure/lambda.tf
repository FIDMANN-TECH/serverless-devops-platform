# ----------------------------------
# IAM Role for Lambda
# ----------------------------------
resource "aws_iam_role" "lambda_exec" {
  name = "lambda_exec_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# ----------------------------------
# Basic Execution Policy (CloudWatch logs)
# ----------------------------------
resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# ----------------------------------
# DynamoDB Access Policy (NEW)
# ----------------------------------
resource "aws_iam_role_policy" "lambda_dynamodb" {
  name = "lambda_dynamodb_policy"
  role = aws_iam_role.lambda_exec.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:Scan"
        ]
        Resource = aws_dynamodb_table.users.arn
      }
    ]
  })
}

# ----------------------------------
# Lambda Function
# ----------------------------------
resource "aws_lambda_function" "api_lambda" {
  function_name = "api_lambda"
  role          = aws_iam_role.lambda_exec.arn
  handler       = "index.handler"
  runtime       = "nodejs18.x"

  filename         = "../backend/function.zip"
  source_code_hash = filebase64sha256("../backend/function.zip")

  timeout = 10

  tags = {
    Environment = "dev"
    Project     = "serverless-devops-platform"
  }
}

# ----------------------------------
# Allow API Gateway to Invoke Lambda
# ----------------------------------
resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.api_lambda.function_name
  principal     = "apigateway.amazonaws.com"
}