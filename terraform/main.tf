provider "aws" {
  profile = var.aws_profile
  region  = var.aws_region
}
resource "aws_s3_bucket" "avarts" {
  bucket = var.production_bucket_name
}

resource "aws_s3_bucket_public_access_block" "avarts" {
  bucket = aws_s3_bucket.avarts.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket" "avarts-dev" {
  bucket = var.dev_bucket_name
}

resource "aws_s3_bucket_public_access_block" "avarts-dev" {
  bucket = aws_s3_bucket.avarts-dev.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

# Create Cloudfront distribution
resource "aws_cloudfront_distribution" "avarts-distribution" {
  origin {
    domain_name = aws_s3_bucket.avarts.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.avarts.id
  }

  enabled = true

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = aws_s3_bucket.avarts.id
    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

resource "aws_cloudfront_distribution" "avarts-dev-distribution" {
  origin {
    domain_name = aws_s3_bucket.avarts-dev.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.avarts-dev.id
  }

  enabled = true

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = aws_s3_bucket.avarts-dev.id
    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}


