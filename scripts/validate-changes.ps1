# PowerShell Validation Script
function Test-Environment {
    Write-Host "Checking environment..."
    
    # Check backup config
    $configPath = Join-Path $PSScriptRoot "config.json"
    if (-not (Test-Path $configPath)) {
        Write-Host "ERROR: Missing config.json" -ForegroundColor Red
        return $false
    }
    
    # Load config
    $config = Get-Content $configPath | ConvertFrom-Json
    $backupPath = $config.backup.rootPath
    
    # Check backup location
    if (-not (Test-Path $backupPath)) {
        Write-Host "ERROR: Backup path not found: $backupPath" -ForegroundColor Red
        return $false
    }
    
    Write-Host "Environment check passed" -ForegroundColor Green
    return $true
}

# Run check
$result = Test-Environment
exit $(if ($result) { 0 } else { 1 })
