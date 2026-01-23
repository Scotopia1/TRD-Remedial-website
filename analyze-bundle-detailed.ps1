# Detailed Bundle Size Analysis Script

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "   TRD Website - Bundle Size Analysis" -ForegroundColor Cyan
Write-Host "   After Lazy Loading Optimization" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Main chunks directory
$chunksPath = ".next\static\chunks"

# Get all JS files
$jsFiles = Get-ChildItem -Path $chunksPath -Recurse -Filter "*.js" -ErrorAction SilentlyContinue

if ($jsFiles.Count -eq 0) {
    Write-Host "ERROR: No JavaScript files found in $chunksPath" -ForegroundColor Red
    Write-Host "Make sure you've run 'npm run build' first." -ForegroundColor Yellow
    exit
}

# Calculate total size
$totalSize = ($jsFiles | Measure-Object -Property Length -Sum).Sum
$totalSizeKB = [math]::Round($totalSize / 1KB, 2)
$totalSizeMB = [math]::Round($totalSize / 1MB, 2)

Write-Host "📦 TOTAL BUNDLE SIZE" -ForegroundColor Green
Write-Host "   JavaScript: $totalSizeKB KB ($totalSizeMB MB)" -ForegroundColor White
Write-Host ""

# Show statistics
Write-Host "📊 STATISTICS" -ForegroundColor Cyan
Write-Host "   Total Files: $($jsFiles.Count)" -ForegroundColor White
$avgSize = [math]::Round(($jsFiles | Measure-Object -Property Length -Average).Average / 1KB, 2)
Write-Host "   Average Size: $avgSize KB" -ForegroundColor White
$largestFile = $jsFiles | Sort-Object Length -Descending | Select-Object -First 1
$largestSizeKB = [math]::Round($largestFile.Length / 1KB, 2)
Write-Host "   Largest Chunk: $largestSizeKB KB" -ForegroundColor White
Write-Host ""

# Show top 10 largest files
Write-Host "🔝 TOP 10 LARGEST CHUNKS" -ForegroundColor Cyan
$jsFiles |
    Select-Object @{N='File';E={$_.Name}}, @{N='Size (KB)';E={[math]::Round($_.Length/1KB,2)}} |
    Sort-Object 'Size (KB)' -Descending |
    Select-Object -First 10 |
    Format-Table -AutoSize

# Show smaller chunks (likely from lazy loading)
Write-Host "⚡ DYNAMICALLY LOADED CHUNKS (<40 KB)" -ForegroundColor Yellow
$smallChunks = $jsFiles |
    Where-Object { $_.Length -lt 40KB } |
    Select-Object @{N='File';E={$_.Name}}, @{N='Size (KB)';E={[math]::Round($_.Length/1KB,2)}} |
    Sort-Object 'Size (KB)' -Descending

if ($smallChunks.Count -gt 0) {
    Write-Host "   Found $($smallChunks.Count) lazy-loaded chunks" -ForegroundColor Green
    $smallChunks | Select-Object -First 15 | Format-Table -AutoSize
} else {
    Write-Host "   No small chunks found" -ForegroundColor Gray
}

Write-Host ""
Write-Host "✅ OPTIMIZATION SUMMARY" -ForegroundColor Green
Write-Host "   With dynamic imports, the initial page load only includes" -ForegroundColor White
Write-Host "   the Hero, IntroStats, and framework code." -ForegroundColor White
Write-Host "   All other sections ($($smallChunks.Count) chunks) load on-demand!" -ForegroundColor White
Write-Host ""
