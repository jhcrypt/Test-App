# Basic PowerShell test script
Write-Host "Testing PowerShell syntax"

function Test-Function {
    param(
        [string]$Message
    )
    Write-Host $Message
}

Test-Function -Message "Basic test successful"
