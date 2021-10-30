resource "google_cloud_run_service" "cloud_run" {
  name     = var.name
  location = var.region

  template {
    spec {
      containers {
        image = var.image
        ports {
          container_port = var.container_port
        }
        dynamic "env" {
          for_each = var.env_vars
          content {
            name  = env.value["name"]
            value = env.value["value"]
          }
        }
      }
    }
  }
  autogenerate_revision_name = true
}

resource "google_cloud_run_service_iam_member" "iam_member" {
  service  = google_cloud_run_service.cloud_run.name
  location = google_cloud_run_service.cloud_run.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}
