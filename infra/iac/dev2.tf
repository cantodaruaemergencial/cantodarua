module "db_schema_dev2" {
  source = "./modules/mysql_schema"

  project                = var.project
  name                   = "${var.project}-db-dev-2"
  database_instance_name = google_sql_database_instance.db.name
}

output "db_schema2_dev2" {
  value = module.db_schema_dev2.credentials
}

module "api_dev2" {
  source = "./modules/cloud_run"

  project               = var.project
  region                = var.region
  name                  = "api-dev2"
  image                 = "gcr.io/cantodarua/api-dev2:latest"
  
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

output "api_dev2" {
  value = module.api_dev2.urls
}