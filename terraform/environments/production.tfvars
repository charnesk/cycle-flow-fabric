resource_group_name = "rg-bicycle-production-prod"
location            = "West Europe"
app_name            = "bicycle-prod"
app_service_sku     = "P1V2"

cors_allowed_origins = [
  "https://bicycle-prod.azurewebsites.net",
  "https://bicycle-prod-cdn.azureedge.net"
]

tags = {
  Environment = "Production"
  Project     = "BicycleProduction"
  ManagedBy   = "Terraform"
  CostCenter  = "Engineering"
  Owner       = "DevOps Team"
}

# Fabric configuration - these should be stored in Azure DevOps variable groups
# fabric_workspace_id = "stored-in-azure-devops"
# fabric_client_id = "stored-in-azure-devops"
# fabric_client_secret = "stored-in-azure-devops"
# fabric_tenant_id = "stored-in-azure-devops"
# fabric_connection_string = "stored-in-azure-devops"