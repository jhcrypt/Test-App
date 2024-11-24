1# PowerShell script to add file headers
# Last Modified: [2024-11-24 09:00]
# Purpose: Add timestamps and backup notices to all TypeScript files

$headerTemplate = @"
/**
 * @file: {0}
 * @lastModified: [{1}]
 * @backup: Use VSCode task "Create Backup" before major changes
 */

"@

Write-Host "Adding headers to TypeScript files..."

Get-ChildItem -Path src -Recurse -Include *.ts,*.tsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if (-not ($content -match "@lastModified:")) {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
        $newHeader = $headerTemplate -f $_.Name, $timestamp
        $newContent = $newHeader + $content
        Set-Content -Path $_.FullName -Value $newContent -NoNewline
        Write-Host "Added header to $($_.Name)" -ForegroundColor Green
    } else {
        Write-Host "Header already exists in $($_.Name)" -ForegroundColor Cyan
    }
}

Write-Host "Header addition complete."
Write-Host "Run ./scripts/lint.ps1 to verify changes."
