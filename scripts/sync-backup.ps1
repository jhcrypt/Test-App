# PowerShell script for syncing backups to OneDrive
# Last Modified: [2024-11-24 10:30]
# Purpose: Sync backups to cloud storage for remote access

function Get-OneDrivePath {
    # Try common OneDrive locations
    $possiblePaths = @(
        "$env:USERPROFILE\OneDrive",
        "$env:USERPROFILE\OneDrive - Personal",
        "$env:OneDriveConsumer",
        "$env:OneDriveCommercial"
    )
    
    foreach ($path in $possiblePaths) {
        if (Test-Path $path) {
            return $path
        }
    }
    
    Write-Host "ERROR: OneDrive path not found" -ForegroundColor Red
    return $null
}

function Sync-ToOneDrive {
    param(
        [Parameter(Mandatory=$true)]
        [string]$SourcePath,
        
        [Parameter(Mandatory=$true)]
        [string]$TargetPath,
        
        [string[]]$ExcludePatterns
    )
    
    try {
        # Ensure target directory exists
        if (-not (Test-Path $TargetPath)) {
            New-Item -ItemType Directory -Path $TargetPath -Force | Out-Null
            Write-Host "Created sync directory: $TargetPath"
        }
        
        # Build robocopy exclude list
        $excludeArgs = $ExcludePatterns | ForEach-Object { "/XF $_" }
        
        # Use robocopy for reliable syncing
        $robocopyArgs = @(
            $SourcePath,
            $TargetPath,
            "/MIR",
            "/R:3",
            "/W:10",
            "/NFL",
            "/NDL"
        ) + $excludeArgs
        
        Write-Host "Syncing to OneDrive..."
        Write-Host "From: $SourcePath"
        Write-Host "To  : $TargetPath"
        
        $result = Start-Process "robocopy" -ArgumentList $robocopyArgs -NoNewWindow -Wait -PassThru
        
        # Robocopy success codes are 0-7
        if ($result.ExitCode -lt 8) {
            Write-Host "Sync completed successfully" -ForegroundColor Green
            return $true
        } else {
            Write-Host "WARNING: Sync completed with issues (Code: $($result.ExitCode))" -ForegroundColor Yellow
            return $false
        }
    }
    catch {
        Write-Host "ERROR: Sync failed - $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Load configuration
$configPath = Join-Path $PSScriptRoot "config.json"
if (-not (Test-Path $configPath)) {
    Write-Host "ERROR: config.json not found" -ForegroundColor Red
    exit 1
}

$config = Get-Content $configPath | ConvertFrom-Json

# Check if sync is enabled
if (-not $config.backup.remoteSync.enabled) {
    Write-Host "Remote sync is disabled in config.json"
    exit 0
}

# Get OneDrive path
$oneDrivePath = Get-OneDrivePath
if (-not $oneDrivePath) {
    Write-Host "Please configure OneDrive and try again"
    exit 1
}

# Replace environment variables in sync path
$syncPath = $config.backup.remoteSync.path -replace '%OneDrive%', $oneDrivePath

# Sync backups
$syncResult = Sync-ToOneDrive `
    -SourcePath $config.backup.rootPath `
    -TargetPath $syncPath `
    -ExcludePatterns $config.backup.remoteSync.excludeFromSync

if (-not $syncResult) {
    Write-Host "Please check sync errors and try again"
    exit 1
}

# Show sync status
if ($config.notifications.notifyOnSync) {
    $sourceSize = (Get-ChildItem -Path $config.backup.rootPath -Recurse |
        Measure-Object -Property Length -Sum).Sum / 1MB
    $targetSize = (Get-ChildItem -Path $syncPath -Recurse |
        Measure-Object -Property Length -Sum).Sum / 1MB
    
    Write-Host "`nSync Statistics:"
    Write-Host "Local size : $([math]::Round($sourceSize, 2)) MB"
    Write-Host "Remote size: $([math]::Round($targetSize, 2)) MB"
    Write-Host "Location   : $syncPath"
}

Write-Host "`nSync complete."
