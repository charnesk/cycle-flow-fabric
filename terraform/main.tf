terraform {
  required_version = ">= 1.6.0"
  
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.85.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.47.0"
    }
  }
  
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state"
    storage_account_name = "stterraformstate"
    container_name       = "tfstate"
    key                  = "production.terraform.tfstate"
  }
}

provider "azurerm" {
  features {
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}

# Resource Group
resource "azurerm_resource_group" "main" {
  name     = var.resource_group_name
  location = var.location
  
  tags = var.tags
}

# App Service Plan
resource "azurerm_service_plan" "main" {
  name                = "${var.app_name}-plan"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  os_type             = "Linux"
  sku_name            = var.app_service_sku
  
  tags = var.tags
}

# App Service for Frontend
resource "azurerm_linux_web_app" "frontend" {
  name                = "${var.app_name}-frontend"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  service_plan_id     = azurerm_service_plan.main.id
  
  site_config {
    always_on              = var.app_service_sku != "F1"
    http2_enabled          = true
    minimum_tls_version    = "1.2"
    
    application_stack {
      node_version = "20-lts"
    }
    
    app_command_line = "npm run preview"
    
    cors {
      allowed_origins = var.cors_allowed_origins
    }
  }
  
  app_settings = {
    "WEBSITE_NODE_DEFAULT_VERSION" = "~20"
    "SCM_DO_BUILD_DURING_DEPLOYMENT" = "false"
    "VITE_API_URL" = azurerm_linux_web_app.backend.default_hostname
    "VITE_FABRIC_ENDPOINT" = var.fabric_endpoint
  }
  
  tags = var.tags
}

# App Service for Backend API
resource "azurerm_linux_web_app" "backend" {
  name                = "${var.app_name}-api"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  service_plan_id     = azurerm_service_plan.main.id
  
  site_config {
    always_on              = var.app_service_sku != "F1"
    http2_enabled          = true
    minimum_tls_version    = "1.2"
    
    application_stack {
      dotnet_version = "8.0"
    }
    
    cors {
      allowed_origins = ["https://${azurerm_linux_web_app.frontend.default_hostname}"]
    }
  }
  
  app_settings = {
    "FABRIC_WORKSPACE_ID" = var.fabric_workspace_id
    "FABRIC_CLIENT_ID" = var.fabric_client_id
    "FABRIC_CLIENT_SECRET" = var.fabric_client_secret
    "FABRIC_TENANT_ID" = var.fabric_tenant_id
  }
  
  connection_string {
    name  = "FabricConnection"
    type  = "Custom"
    value = var.fabric_connection_string
  }
  
  tags = var.tags
}

# Application Insights
resource "azurerm_application_insights" "main" {
  name                = "${var.app_name}-insights"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  application_type    = "web"
  
  tags = var.tags
}

# Storage Account for static assets
resource "azurerm_storage_account" "static" {
  name                     = "${replace(var.app_name, "-", "")}static"
  resource_group_name      = azurerm_resource_group.main.name
  location                 = azurerm_resource_group.main.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  
  static_website {
    index_document = "index.html"
    error_404_document = "index.html"
  }
  
  tags = var.tags
}

# CDN Profile
resource "azurerm_cdn_profile" "main" {
  name                = "${var.app_name}-cdn"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "Standard_Microsoft"
  
  tags = var.tags
}

# CDN Endpoint
resource "azurerm_cdn_endpoint" "main" {
  name                = "${var.app_name}-endpoint"
  profile_name        = azurerm_cdn_profile.main.name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  
  origin {
    name      = "frontend"
    host_name = azurerm_linux_web_app.frontend.default_hostname
  }
  
  tags = var.tags
}

# Key Vault for secrets
resource "azurerm_key_vault" "main" {
  name                = "${var.app_name}-kv"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  tenant_id           = data.azurerm_client_config.current.tenant_id
  sku_name            = "standard"
  
  purge_protection_enabled    = true
  soft_delete_retention_days  = 7
  
  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id
    
    secret_permissions = [
      "Get", "List", "Set", "Delete", "Purge"
    ]
  }
  
  tags = var.tags
}

# Data source for current Azure configuration
data "azurerm_client_config" "current" {}