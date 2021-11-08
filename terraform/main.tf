provider "aws" {
  profile = var.aws_profile
  region  = var.aws_region
}
resource "aws_s3_bucket" "avarts" {
  bucket = var.production_bucket_name
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "avarts" {
  bucket = aws_s3_bucket.avarts.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket" "avarts-dev" {
  bucket = var.dev_bucket_name
  acl    = "private"
}

resource "aws_s3_bucket_public_access_block" "avarts-dev" {
  bucket = aws_s3_bucket.avarts.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}


