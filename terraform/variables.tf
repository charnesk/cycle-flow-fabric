variable "resource_group_name" {
  description = "Name of the Azure Resource Group"
  type        = string
  default     = "rg-bicycle-production"
}

variable "location" {
  description = "Azure region for resources"
  type        = string
  default     = "West Europe"
}

variable "app_name" {
  description = "Base name for the application resources"
  type        = string
  default     = "bicycle-prod"
}

variable "app_service_sku" {
  description = "SKU for App Service Plan"
  type        = string
  default     = "B1"
}

variable "cors_allowed_origins" {
  description = "Allowed origins for CORS"
  type        = list(string)
  default     = ["http://localhost:5173", "https://localhost:5173"]
}

variable "fabric_workspace_id" {
  description = "Microsoft Fabric Workspace ID"
  type        = string
  sensitive   = true
}

variable "fabric_client_id" {
  description = "Microsoft Fabric Client ID"
  type        = string
  sensitive   = true
}

variable "fabric_client_secret" {
  description = "Microsoft Fabric Client Secret"
  type        = string
  sensitive   = true
}

variable "fabric_tenant_id" {
  description = "Microsoft Fabric Tenant ID"
  type        = string
  sensitive   = true
}

variable "fabric_endpoint" {
  description = "Microsoft Fabric SQL Endpoint"
  type        = string
  default     = "https://api.fabric.microsoft.com"
}

variable "fabric_connection_string" {
  description = "Microsoft Fabric Connection String"
  type        = string
  sensitive   = true
}

variable "tags" {
  description = "Tags to apply to all resources"
  type        = map(string)
  default = {
    Environment = "Production"
    Project     = "BicycleProduction"
    ManagedBy   = "Terraform"
  }
}