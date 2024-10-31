resource "aws_apigatewayv2_api" "is_odd_api" {
  name          = "is_odd_api"
  protocol_type = "HTTP"
  target        = aws_lambda_function.is-odd.invoke_arn
}