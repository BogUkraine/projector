# Fetch our file from the local file system
data "archive_file" "lambda" {
  type        = "zip"
  source_file = "../dist/index.js"
  output_path = "./dist/index.zip"
}

#Create our lambda function
resource "aws_lambda_function" "is-odd" {
  filename      = "./dist/index.zip"
  function_name = "is-odd"
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "index.handler"

  source_code_hash = data.archive_file.lambda.output_base64sha256
  #This is the  new the property
  layers = [aws_lambda_layer_version.is_odd_layer.arn]

  runtime = "nodejs18.x"
}