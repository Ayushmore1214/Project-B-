output "cloud_run_url" {
  value = google_cloud_run_service.default.status[0].url
}

output "db_instance_name" {
  value = google_sql_database_instance.main.name
}