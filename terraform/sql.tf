resource "google_sql_database_instance" "main" {
  name             = "github-backup-db"
  database_version = "POSTGRES_14"
  region           = var.region
  settings {
    tier = "db-f1-micro"
    ip_configuration {
      ipv4_enabled = true
    }
  }
  deletion_protection = false
}

resource "google_sql_database" "database" {
  name     = "backups"
  instance = google_sql_database_instance.main.name
}

resource "google_sql_user" "postgres_user" {
  name     = "postgres"
  instance = google_sql_database_instance.main.name
  password = var.db_password
}
