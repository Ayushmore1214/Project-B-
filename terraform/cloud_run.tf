resource "google_cloud_run_service" "default" {
  name     = "github-backup-tool"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/github-backup-tool"
      }
    }
  }
}