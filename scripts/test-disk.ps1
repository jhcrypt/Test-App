# Simple disk space test
$drive = "D:"
Write-Host "Testing disk space on $drive"

# Method 1: WMI
Write-Host "`nMethod 1: WMI"
$wmi = Get-WmiObject Win32_LogicalDisk -Filter "DeviceID='$drive'"
Write-Host "Free Space (WMI): $([math]::Round($wmi.FreeSpace / 1GB, 2)) GB"

# Method 2: CIM
Write-Host "`nMethod 2: CIM"
$cim = Get-CimInstance -ClassName Win32_LogicalDisk -Filter "DeviceID='$drive'"
Write-Host "Free Space (CIM): $([math]::Round($cim.FreeSpace / 1GB, 2)) GB"

# Method 3: PSDrive
Write-Host "`nMethod 3: PSDrive"
$psd = Get-PSDrive -Name $drive.TrimEnd(':') -PSProvider FileSystem
Write-Host "Free Space (PSDrive): $([math]::Round($psd.Free / 1GB, 2)) GB"

# Method 4: Direct FileSystem
Write-Host "`nMethod 4: FileSystem"
$fs = [System.IO.DriveInfo]::GetDrives() | Where-Object { $_.Name -eq "$drive\" }
Write-Host "Free Space (FileSystem): $([math]::Round($fs.AvailableFreeSpace / 1GB, 2)) GB"

Write-Host "`nDrive Details:"
Write-Host "Total Size: $([math]::Round($fs.TotalSize / 1GB, 2)) GB"
Write-Host "Format: $($fs.DriveFormat)"
Write-Host "Type: $($fs.DriveType)"
