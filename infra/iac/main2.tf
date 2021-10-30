module "db_schema2" {
  source = "./modules/mysql_schema"

  project                = var.project
  name                   = "${var.project}-db2"
  database_instance_name = google_sql_database_instance.db.name
}

output "db_schema2" {
  value = module.db_schema2.credentials
}

module "api2" {
  source = "./modules/cloud_run"

  project               = var.project
  region                = var.region
  name                  = "api2"
  image                 = "gcr.io/cloudrun/hello"
  
  env_vars = [
    {
      name  = "DATABASE_HOST"
      value = google_sql_database_instance.db.public_ip_address
    },
    {
      name  = "DATABASE_NAME"
      value = module.db_schema2.credentials.name
    },
    {
      name  = "DATABASE_USERNAME"
      value = module.db_schema2.credentials.user
    },
    {
      name  = "DATABASE_PASSWORD"
      value = module.db_schema2.credentials.pass
    }
  ]
}

output "api2" {
  value = module.api2.urls
}