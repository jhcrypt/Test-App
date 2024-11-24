# PowerShell script for daily maintenance
# Last Modified: [2024-11-24 11:45]

# First validate environment
Write-Host "Validating environment..."
$validateScript = Join-Path $PSScriptRoot "validate-changes.ps1"
& $validateScript
if ($LASTEXITCODE -ne 0) {
    Write-Host "Environment validation failed. Please fix issues before proceeding." -ForegroundColor Red
    exit 1
}

# Load configuration
$configPath = Join-Path $PSScriptRoot "config.json"
$config = Get-Content $configPath | ConvertFrom-Json
$backupRoot = $config.backup.rootPath

# Create daily backup
$timestamp = Get-Date -Format 'yyyy-MM-dd'
$backupDir = Join-Path $backupRoot $timestamp

Write-Host "Creating backup in $backupDir..."
if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
}

# Copy source files
Write-Host "Copying source files..."
$excludeFilter = $config.backup.excludePaths -join '|'
Get-ChildItem -Path "src" -Recurse |
    Where-Object { -not $_.PSIsContainer -and $_.FullName -notmatch $excludeFilter } |
    ForEach-Object {
        $relativePath = $_.FullName.Substring((Get-Location).Path.Length + 5)
        $targetPath = Join-Path $backupDir $relativePath
        $targetDir = Split-Path $targetPath -Parent
        
        if (-not (Test-Path $targetDir)) {
            New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        }
        
        Copy-Item $_.FullName -Destination $targetPath -Force
        Write-Host "  Backed up: $relativePath"
    }

# Clean old backups if enabled
if ($config.maintenance.cleanOldBackups) {
    Write-Host "Cleaning old backups..."
    Get-ChildItem -Path $backupRoot -Directory |
        Sort-Object CreationTime |
        Select-Object -SkipLast $config.backup.maxDays |
        ForEach-Object {
            Write-Host "  Removing: $($_.Name)"
            Remove-Item $_.FullName -Recurse -Force
        }
}

# Show backup stats if enabled
if ($config.notifications.showStats) {
    $backupSize = (Get-ChildItem -Path $backupDir -Recurse |
        Measure-Object -Property Length -Sum).Sum / 1MB
    $totalSize = (Get-ChildItem -Path $backupRoot -Recurse |
        Measure-Object -Property Length -Sum).Sum / 1MB
    
    Write-Host "Backup Statistics:"
    Write-Host "Today's backup: $([math]::Round($backupSize, 2)) MB"
    Write-Host "Total backups: $([math]::Round($totalSize, 2)) MB"
    Write-Host "Location: $backupRoot"
    Write-Host "Keeping last $($config.backup.maxDays) days"
}

Write-Host "Maintenance complete."
