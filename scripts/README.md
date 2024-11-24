# Project Maintenance System

## Quick Start
1. Edit `config.json` to set your backup location
2. Run `./scripts/verify-backup.ps1` to check configuration
3. Run `./scripts/maintain.ps1` to create first backup

## Scripts

### verify-backup.ps1
Verifies backup system setup:
- Calculates project size
- Checks backup location
- Tests write permissions
- Verifies disk space
- Returns proper exit codes

```powershell
# Verify backup system
./scripts/verify-backup.ps1
```

### maintain.ps1
Daily maintenance script that:
- Verifies backup system
- Creates timestamped backups
- Updates file timestamps
- Runs lint checks
- Cleans old backups
- Shows backup statistics

```powershell
# Run maintenance
./scripts/maintain.ps1
```

### lint.ps1
Checks code quality:
- Verifies file headers
- Checks TODOs have timestamps
- Runs ESLint on TypeScript files
- Reports on backup status

```powershell
# Run lint check
./scripts/lint.ps1
```

## Configuration

### Location
Set in `config.json`:
```json
{
    "backup": {
        "rootPath": "F:\\ProjectBackups\\Test-App",
        "maxDays": 7,
        "maxSizePerBackupMB": 50,
        "excludePaths": [
            "node_modules",
            "dist",
            ".next"
        ]
    }
}
```

### Space Requirements
- Calculated based on actual project size
- Only requires 2x project size for safety
- Excludes unnecessary files/folders
- Automatically cleans old backups

### Remote Access
- Use OneDrive/Dropbox for backup location
- Access files from any device
- Sync automatically after backups
- Keep backups in sync across machines

## Maintenance Tips
- Run verify-backup.ps1 after changing config
- Create backups before major changes
- Check backup stats regularly
- Keep backup location accessible
- Monitor disk space usage

## Troubleshooting
If backups fail:
1. Run verify-backup.ps1 to diagnose
2. Check disk space with test-disk.ps1
3. Verify write permissions
4. Review config.json settings
5. Check backup statistics
