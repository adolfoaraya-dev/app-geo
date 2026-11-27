Write-Host "Copiando iconos..."
Copy-Item ".\src\res\*" ".\android\app\src\main\res\" -Recurse -Force

$env:ANDROID_HOME = "C:\Android\Sdk"
$env:ANDROID_SDK_ROOT = "C:\Android\Sdk"
$env:PATH += ";C:\Android\Sdk\cmdline-tools\latest\bin;C:\Android\Sdk\platform-tools"

Write-Host "Compilando Angular..."
npm run build
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Sincronizando Capacitor..."
npx cap sync android
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Generando APK..."
.\android\gradlew.bat -p android assembleDebug
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "APK generado correctamente."