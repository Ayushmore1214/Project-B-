resource "google_sql_database_instance" "main" {
  name             = "github-backup-db"
  database_version = "POSTGRES_14"
  region           = var.region
  settings {
    tier = "db-f1-micro"
    ip_configuration {
      ipv4_enabled = false
    }
  }
  deletion_protection = false
}

resource "google_sql_database" "database" {
  name     = "backups"
  instance = google_sql_database_instance.main.name
}