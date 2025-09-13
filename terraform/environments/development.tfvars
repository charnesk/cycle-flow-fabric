resource_group_name = "rg-bicycle-production-dev"
location            = "West Europe"
app_name            = "bicycle-dev"
app_service_sku     = "B1"

cors_allowed_origins = [
  "http://localhost:5173",
  "https://localhost:5173",
  "https://bicycle-dev.azurewebsites.net"
]

tags = {
  Environment = "Development"
  Project     = "BicycleProduction"
  ManagedBy   = "Terraform"
  CostCenter  = "Engineering"
  Owner       = "DevOps Team"
}