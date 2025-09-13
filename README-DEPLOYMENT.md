# Deployment Guide - Bicycle Production Management System

## Prerequisites

- Azure Subscription
- Azure DevOps Organization
- Microsoft Fabric Workspace
- Terraform >= 1.6.0
- Azure CLI installed

## 1. Azure DevOps Setup

### 1.1 Import Repository
1. Navigate to Azure DevOps
2. Create new project or use existing
3. Import this repository

### 1.2 Configure Service Connections
```bash
# Run the setup script
./scripts/setup-azure-devops.ps1 `
  -OrganizationUrl "https://dev.azure.com/yourorg" `
  -ProjectName "BicycleProduction" `
  -PAT "your-personal-access-token"
```

### 1.3 Create Variable Groups
In Azure DevOps > Pipelines > Library:

**production-variables:**
- `FABRIC_WORKSPACE_ID`: Your Fabric workspace ID
- `FABRIC_API_TOKEN`: Fabric API token (mark as secret)
- `FABRIC_CLIENT_ID`: Service principal client ID
- `FABRIC_CLIENT_SECRET`: Service principal secret (mark as secret)
- `FABRIC_TENANT_ID`: Azure AD tenant ID

## 2. Terraform Backend Setup

### 2.1 Create Storage Account for Terraform State
```bash
# Create resource group for Terraform state
az group create \
  --name rg-terraform-state \
  --location westeurope

# Create storage account
az storage account create \
  --name stterraformstate \
  --resource-group rg-terraform-state \
  --location westeurope \
  --sku Standard_LRS

# Create container
az storage container create \
  --name tfstate \
  --account-name stterraformstate
```

## 3. Pipeline Configuration

### 3.1 Create Build Pipelines
1. Go to Azure DevOps > Pipelines
2. New Pipeline > Azure Repos Git
3. Select your repository
4. Choose "Existing Azure Pipelines YAML file"
5. Select `/azure-pipelines.yml`
6. Save and run

### 3.2 Create PR Validation Pipeline
Repeat above steps but select `/azure-pipelines-pr.yml`

## 4. Microsoft Fabric Setup

### 4.1 Create Workspace
```powershell
# Using Fabric REST API
$headers = @{
    "Authorization" = "Bearer $env:FABRIC_API_TOKEN"
    "Content-Type" = "application/json"
}

$body = @{
    displayName = "BicycleProduction"
    description = "Bicycle production management workspace"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://api.fabric.microsoft.com/v1/workspaces" `
  -Method POST -Headers $headers -Body $body
```

### 4.2 Deploy Fabric Artifacts
The pipeline will automatically deploy:
- Notebooks from `/fabric/notebooks/`
- Pipelines from `/fabric/pipelines/`
- Datasets from `/fabric/datasets/`

## 5. Manual Terraform Deployment (Optional)

If you want to deploy manually instead of using pipelines:

```bash
# Navigate to terraform directory
cd terraform

# Initialize Terraform
terraform init

# Plan deployment
terraform plan -var-file="environments/production.tfvars"

# Apply configuration
terraform apply -var-file="environments/production.tfvars"
```

## 6. Environment-Specific Deployments

### Development Environment
```bash
terraform workspace new dev
terraform apply -var-file="environments/development.tfvars"
```

### Production Environment
```bash
terraform workspace new prod
terraform apply -var-file="environments/production.tfvars"
```

## 7. Post-Deployment Configuration

### 7.1 Configure Custom Domain (Optional)
```bash
az webapp config hostname add \
  --webapp-name bicycle-prod-frontend \
  --resource-group rg-bicycle-production \
  --hostname www.yourdomain.com
```

### 7.2 Enable Application Insights
The Application Insights is automatically created. To view:
1. Go to Azure Portal
2. Navigate to your resource group
3. Open Application Insights resource
4. View Live Metrics Stream

### 7.3 Configure Alerts
```bash
# CPU usage alert
az monitor metrics alert create \
  --name high-cpu-alert \
  --resource-group rg-bicycle-production \
  --scopes /subscriptions/{subscription}/resourceGroups/rg-bicycle-production/providers/Microsoft.Web/sites/bicycle-prod-frontend \
  --condition "avg Percentage CPU > 80" \
  --window-size 5m \
  --evaluation-frequency 1m
```

## 8. Monitoring and Maintenance

### View Deployment Status
- Azure DevOps > Pipelines > Recent runs
- Azure Portal > Resource Group > Deployments

### View Application Logs
```bash
az webapp log tail \
  --name bicycle-prod-frontend \
  --resource-group rg-bicycle-production
```

### Scale Resources
```bash
# Scale up App Service Plan
az appservice plan update \
  --name bicycle-prod-plan \
  --resource-group rg-bicycle-production \
  --sku P2V2
```

## 9. Rollback Procedure

### Using Terraform
```bash
# Revert to previous version
terraform apply -var-file="environments/production.tfvars" -target=<specific-resource>
```

### Using Azure DevOps
1. Go to Pipelines > Releases
2. Select previous successful release
3. Click "Redeploy"

## 10. Destroy Resources (Cleanup)

```bash
# Destroy all Terraform-managed resources
terraform destroy -var-file="environments/production.tfvars"

# Delete resource groups manually if needed
az group delete --name rg-bicycle-production --yes
```

## Support

For issues or questions:
- Check Azure DevOps pipeline logs
- Review Terraform state: `terraform show`
- Check Application Insights for errors
- Review Azure Activity Log in portal