# Basic PowerShell validator
param(
    [Parameter(Mandatory=$true)]
    [string]$ScriptPath
)

function Test-ScriptSyntax {
    param(
        [string]$Path
    )
    
    $errors = $null
    $tokens = $null
    
    $ast = [System.Management.Automation.Language.Parser]::ParseFile(
        $Path,
        [ref]$tokens,
        [ref]$errors
    )
    
    if ($errors) {
        Write-Host "Found syntax errors:" -ForegroundColor Red
        foreach ($error in $errors) {
            Write-Host "Line $($error.Extent.StartLineNumber): $($error.Message)" -ForegroundColor Red
        }
        return $false
    }
    
    Write-Host "Script syntax is valid" -ForegroundColor Green
    return $true
}

Test-ScriptSyntax -Path $ScriptPath
