data "google_secret_manager_secret_version" "db_username" {
  secret  = "db_username"
  project = var.project_id
}

data "google_secret_manager_secret_version" "db_password" {
  secret  = "db_password"
  project = var.project_id
}


resource "google_sql_database_instance" "todo_mysql_instance" {
  name             = "todo-mysql-instance"
  database_version = "MYSQL_8_0"
  region           = var.region

  settings {
    tier = "db-n1-standard-1"

    ip_configuration {
      ipv4_enabled = false

      private_network = module.network.network_self_link
    }
  }
}

#resource "google_sql_database" "todo_database" {
#  name     = "todo_db"
#  instance = google_sql_database_instance.todo_mysql_instance.name
#}


resource "google_sql_database" "todo_cicd_database" {
  name     = "todo_cicd"
  instance = google_sql_database_instance.todo_mysql_instance.name
}


resource "google_sql_user" "todo_db_user" {
  name     = data.google_secret_manager_secret_version.db_username.secret_data
  instance = google_sql_database_instance.todo_mysql_instance.name
  password = data.google_secret_manager_secret_version.db_password.secret_data
}

resource "google_service_account" "gke_service_account" {
  account_id   = "gke-service-account"
  display_name = "GKE Service Account for accessing Cloud SQL"
}

resource "google_project_iam_member" "gke_cloudsql_client" {
  project = var.project_id
  role    = "roles/cloudsql.client"
  member  = "serviceAccount:${google_service_account.gke_service_account.email}"
}

output "mysql_instance_connection_name" {
  value = google_sql_database_instance.todo_mysql_instance.connection_name
}

