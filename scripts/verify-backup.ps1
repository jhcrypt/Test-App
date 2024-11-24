# Basic backup verification script
param()

# Calculate project size
$srcPath = Join-Path (Split-Path $PSScriptRoot -Parent) "src"
$projectSize = (Get-ChildItem -Path $srcPath -Recurse | 
    Where-Object { -not $_.PSIsContainer } | 
    Measure-Object -Property Length -Sum).Sum / 1MB

Write-Host "Project size: $([math]::Round($projectSize, 2)) MB"

# Load config
$configPath = Join-Path $PSScriptRoot "config.json"
$config = Get-Content $configPath | ConvertFrom-Json
$backupRoot = $config.backup.rootPath

Write-Host "Testing backup path: $backupRoot"

# Create backup directory if needed
if (-not (Test-Path $backupRoot)) {
    New-Item -ItemType Directory -Path $backupRoot -Force | Out-Null
    Write-Host "Created backup directory"
}

# Test write access
$testFile = Join-Path $backupRoot "test.tmp"
try {
    [System.IO.File]::WriteAllText($testFile, "test")
    Remove-Item $testFile -Force
    Write-Host "Write access verified" -ForegroundColor Green
} catch {
    Write-Host "ERROR: No write access - $($_.Exception.Message)" -ForegroundColor Red
    return 1
}

# Check disk space
$drive = Split-Path $backupRoot -Qualifier
$disk = [System.IO.DriveInfo]::GetDrives() | Where-Object { $_.Name -eq "$drive\" }
$freeSpaceMB = [math]::Round($disk.AvailableFreeSpace / 1MB, 2)

Write-Host "`nDrive $($drive) Details:"
Write-Host "Free space : $freeSpaceMB MB"
Write-Host "Required   : $([math]::Round($projectSize * 2, 2)) MB"

if ($freeSpaceMB -lt ($projectSize * 2)) {
    Write-Host "WARNING: Insufficient disk space" -ForegroundColor Yellow
    return 1
}

Write-Host "`nVerification complete" -ForegroundColor Green
return 0
