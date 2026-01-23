# Bundle Size Analysis Script

$chunksPath = ".next\static\chunks"
$appPath = ".next\static\chunks\app"

Write-Host "`n=== JavaScript Bundle Analysis ===" -ForegroundColor Cyan
Write-Host ""

# Get all JS files
$jsFiles = Get-ChildItem -Path $chunksPath -Recurse -Filter "*.js" -ErrorAction SilentlyContinue

if ($jsFiles.Count -eq 0) {
    Write-Host "No JavaScript files found in $chunksPath" -ForegroundColor Yellow
    exit
}

# Calculate total size
$totalSize = ($jsFiles | Measure-Object -Property Length -Sum).Sum
$totalSizeKB = [math]::Round($totalSize / 1KB, 2)
$totalSizeMB = [math]::Round($totalSize / 1MB, 2)

Write-Host "Total JavaScript Size: $totalSizeKB KB ($totalSizeMB MB)" -ForegroundColor Green
Write-Host ""

# Show top 15 largest files
Write-Host "Top 15 Largest Chunks:" -ForegroundColor Cyan
$jsFiles |
    Select-Object Name, @{N='Size(KB)';E={[math]::Round($_.Length/1KB,2)}}, FullName |
    Sort-Object 'Size(KB)' -Descending |
    Select-Object -First 15 |
    Format-Table -AutoSize

# Show app-specific chunks
Write-Host "`nApp Route Chunks:" -ForegroundColor Cyan
Get-ChildItem -Path $appPath -Filter "*.js" -ErrorAction SilentlyContinue |
    Select-Object Name, @{N='Size(KB)';E={[math]::Round($_.Length/1KB,2)}} |
    Sort-Object 'Size(KB)' -Descending |
    Format-Table -AutoSize

Write-Host ""
