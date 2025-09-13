output "frontend_url" {
  description = "URL of the frontend application"
  value       = "https://${azurerm_linux_web_app.frontend.default_hostname}"
}

output "backend_url" {
  description = "URL of the backend API"
  value       = "https://${azurerm_linux_web_app.backend.default_hostname}"
}

output "cdn_endpoint" {
  description = "CDN endpoint URL"
  value       = "https://${azurerm_cdn_endpoint.main.host_name}"
}

output "storage_static_website_endpoint" {
  description = "Static website endpoint"
  value       = azurerm_storage_account.static.primary_web_endpoint
}

output "application_insights_instrumentation_key" {
  description = "Application Insights instrumentation key"
  value       = azurerm_application_insights.main.instrumentation_key
  sensitive   = true
}

output "key_vault_uri" {
  description = "Key Vault URI"
  value       = azurerm_key_vault.main.vault_uri
}

output "resource_group_name" {
  description = "Name of the resource group"
  value       = azurerm_resource_group.main.name
}