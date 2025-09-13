# PowerShell script to set up Azure DevOps prerequisites

param(
    [Parameter(Mandatory=$true)]
    [string]$OrganizationUrl,
    
    [Parameter(Mandatory=$true)]
    [string]$ProjectName,
    
    [Parameter(Mandatory=$true)]
    [string]$PAT
)

# Install Azure DevOps extension if not already installed
if (!(Get-Module -ListAvailable -Name Az.DevOps)) {
    Install-Module -Name Az.DevOps -Force -AllowClobber
}

# Set up authentication
$env:AZURE_DEVOPS_EXT_PAT = $PAT

Write-Host "Setting up Azure DevOps project: $ProjectName" -ForegroundColor Green

# Create variable groups
Write-Host "Creating variable groups..." -ForegroundColor Yellow

# Production variables
az pipelines variable-group create `
  --organization $OrganizationUrl `
  --project $ProjectName `
  --name "production-variables" `
  --variables `
    webAppName="bicycle-prod-frontend" `
    apiAppName="bicycle-prod-api" `
    FABRIC_WORKSPACE_ID="[PLACEHOLDER]" `
    FABRIC_API_TOKEN="[PLACEHOLDER]"

# Development variables
az pipelines variable-group create `
  --organization $OrganizationUrl `
  --project $ProjectName `
  --name "development-variables" `
  --variables `
    webAppName="bicycle-dev-frontend" `
    apiAppName="bicycle-dev-api" `
    FABRIC_WORKSPACE_ID="[PLACEHOLDER]" `
    FABRIC_API_TOKEN="[PLACEHOLDER]"

# Create service connections
Write-Host "Creating service connections..." -ForegroundColor Yellow

# You'll need to manually complete the service connection setup in Azure DevOps UI
Write-Host @"

Next steps:
1. Go to Azure DevOps > Project Settings > Service connections
2. Create a new Azure Resource Manager service connection named 'Azure-Service-Connection'
3. Update the variable groups with actual values for:
   - FABRIC_WORKSPACE_ID
   - FABRIC_API_TOKEN
   - Any other sensitive values
4. Create build pipelines using the YAML files:
   - azure-pipelines.yml (main CI/CD)
   - azure-pipelines-pr.yml (PR validation)

"@ -ForegroundColor Cyan