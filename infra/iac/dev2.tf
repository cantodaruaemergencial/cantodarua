module "db_schema_dev2" {
  source = "./modules/mysql_schema"

  project                = var.project
  name                   = "${var.project}-db-dev-2"
  database_instance_name = google_sql_database_instance.db.name
}

output "dev_db_schema2" {
  value = module.db_schema_dev2.credentials
}

module "api_dev2" {
  source = "./modules/cloud_run"

  project               = var.project
  region                = var.region
  name                  = "api-dev2"
  image                 = "gcr.io/cantodarua/api:bb7e097da48f33173b7676f0fed6aff9223a49d4"
  url                   = "api-dev.cantodarua.com.br"
  dns_managed_zone_name = var.dns_managed_zone_name_2

  env_vars = [
    {
      name  = "DATABASE_HOST"
      value = google_sql_database_instance.db.public_ip_address
    },
    {
      name  = "DATABASE_NAME"
      value = module.db_schema_dev2.credentials.name
    },
    {
      name  = "DATABASE_USERNAME"
      value = module.db_schema_dev2.credentials.user
    },
    {
      name  = "DATABASE_PASSWORD"
      value = module.db_schema_dev2.credentials.pass
    }
  ]
}

output "dev_api2" {
  value = module.api_dev2.urls
}

module "app_dev2" {
  source = "./modules/cloud_run"

  project               = var.project
  region                = var.region
  name                  = "app-dev2"
  image                 = "gcr.io/cantodarua/app:e351d30f2a50b7d2c35b8e72eaedb01e776c6bd8"
  url                   = "dev.cantodarua.com.br"
  dns_managed_zone_name = var.dns_managed_zone_name_2
  container_port        = 3000

  env_vars = [
    {
      name  = "NEXT_PUBLIC_STRAPI_API_URL"
      value = module.api_dev2.urls.public_url
    }
  ]
}

output "dev_app2" {
  value = module.app_dev2.urls
}