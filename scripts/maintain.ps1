# PowerShell script for daily maintenance
# Last Modified: [2024-11-24 11:05]
# Purpose: Keep our tracking system up to date

# First verify backup system
Write-Host "Verifying backup system..."
& "$PSScriptRoot\verify-backup.ps1"
if (-not $?) {
    Write-Host "Backup verification failed. Please fix issues before proceeding." -ForegroundColor Red
    exit 1
}

# Load configuration
$configPath = Join-Path $PSScriptRoot "config.json"
$config = Get-Content $configPath | ConvertFrom-Json
$backupRoot = $config.backup.rootPath

# Create daily backup
$timestamp = Get-Date -Format 'yyyy-MM-dd'
$backupDir = Join-Path $backupRoot $timestamp

Write-Host "`nCreating backup in $backupDir..."
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
    Write-Host "`nCleaning old backups..."
    Get-ChildItem -Path $backupRoot -Directory |
        Sort-Object CreationTime |
        Select-Object -SkipLast $config.backup.maxDays |
        ForEach-Object {
            Write-Host "  Removing: $($_.Name)"
            Remove-Item $_.FullName -Recurse -Force
        }
}

# Update timestamps if enabled
if ($config.maintenance.updateTimestamps) {
    Write-Host "`nUpdating timestamps in modified files..."
    Get-ChildItem -Path src -Recurse -Include *.ts,*.tsx |
        ForEach-Object {
            $content = Get-Content $_.FullName -Raw
            if ($content -match "@lastModified: \[(.*?)\]") {
                $lastMod = [DateTime]::ParseExact($matches[1], "yyyy-MM-dd HH:mm", $null)
                $fileLastWrite = $_.LastWriteTime
                
                if ($fileLastWrite -gt $lastMod) {
                    $newTimestamp = $fileLastWrite.ToString("yyyy-MM-dd HH:mm")
                    $newContent = $content -replace "@lastModified: \[(.*?)\]", "@lastModified: [$newTimestamp]"
                    Set-Content -Path $_.FullName -Value $newContent -NoNewline
                    Write-Host "  Updated: $($_.Name) to $newTimestamp"
                }
            }
        }
}

# Run lint check if enabled
if ($config.maintenance.runLintCheck) {
    Write-Host "`nRunning lint check..."
    & "$PSScriptRoot\lint.ps1"
}

# Show backup stats if enabled
if ($config.notifications.showStats) {
    $backupSize = (Get-ChildItem -Path $backupDir -Recurse |
        Measure-Object -Property Length -Sum).Sum / 1MB
    $totalSize = (Get-ChildItem -Path $backupRoot -Recurse |
        Measure-Object -Property Length -Sum).Sum / 1MB
    
    Write-Host "`nBackup Statistics:"
    Write-Host "Today's backup: $([math]::Round($backupSize, 2)) MB"
    Write-Host "Total backups: $([math]::Round($totalSize, 2)) MB"
    Write-Host "Location: $backupRoot"
    Write-Host "Keeping last $($config.backup.maxDays) days"
}

Write-Host "`nMaintenance complete."
