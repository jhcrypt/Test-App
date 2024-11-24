# PowerShell script to run ESLint
# Last Modified: [2024-11-24 09:35]
# Purpose: Check code quality and track changes

# Load configuration
$configPath = Join-Path $PSScriptRoot "config.json"
if (-not (Test-Path $configPath)) {
    Write-Host "ERROR: config.json not found at $configPath" -ForegroundColor Red
    exit 1
}

$config = Get-Content $configPath | ConvertFrom-Json
$backupRoot = $config.backup.rootPath

Write-Host "Running ESLint to check for critical errors..."

# Check for files without timestamps or backup notices
Write-Host "`nChecking file headers..."
Get-ChildItem -Path src -Recurse -Include *.ts,*.tsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if (-not ($content -match "@lastModified: \[\d{4}-\d{2}-\d{2}")) {
        Write-Host "Warning: Missing timestamp in $($_.Name)" -ForegroundColor Yellow
    }
    if (-not ($content -match "@backup:")) {
        Write-Host "Warning: Missing backup notice in $($_.Name)" -ForegroundColor Yellow
    }
}

# Check TODOs for timestamps
Write-Host "`nChecking TODOs..."
Get-ChildItem -Path src -Recurse -Include *.ts,*.tsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match "TODO" -and -not ($content -match "TODO \[\d{4}-\d{2}-\d{2}]")) {
        Write-Host "Warning: TODO without timestamp in $($_.Name)" -ForegroundColor Yellow
    }
}

# Run ESLint for code quality
Write-Host "`nRunning ESLint..."
Get-ChildItem -Path src -Recurse -Include *.ts,*.tsx | ForEach-Object {
    Write-Host "Checking $($_.Name)..."
    # --quiet flag suppresses warnings, only shows errors
    npx eslint $_.FullName --quiet
}

if ($LASTEXITCODE -eq 0) {
    Write-Host "`nNo critical errors found." -ForegroundColor Green
    
    # Check backup status using configured path
    if (Test-Path $backupRoot) {
        $lastBackup = Get-ChildItem -Path $backupRoot -Directory | Sort-Object LastWriteTime -Descending | Select-Object -First 1
        if ($lastBackup) {
            Write-Host "Last backup: $($lastBackup.Name)" -ForegroundColor Cyan
            $backupSize = (Get-ChildItem -Path $lastBackup.FullName -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
            Write-Host "Backup size: $([math]::Round($backupSize, 2))MB" -ForegroundColor Cyan
        } else {
            Write-Host "No backups found in configured location: $backupRoot" -ForegroundColor Yellow
        }
    } else {
        Write-Host "Backup directory not found: $backupRoot" -ForegroundColor Yellow
        Write-Host "Run maintain.ps1 to create first backup" -ForegroundColor Yellow
    }
} else {
    Write-Host "`nCritical errors found. Please fix them before proceeding." -ForegroundColor Red
}

Write-Host "`nLint check complete."
