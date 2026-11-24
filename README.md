---------------------
INSTALAR JAVA SDK:
----------------------
winget install EclipseAdoptium.Temurin.21.JDK



---------------------
INSTALAR ANDROID SDK:
----------------------

$Sdk = "C:\Android\Sdk"
$Temp = "$env:TEMP\android-cli"

New-Item -ItemType Directory -Force "$Sdk\cmdline-tools" | Out-Null
New-Item -ItemType Directory -Force $Temp | Out-Null

Invoke-WebRequest "https://dl.google.com/android/repository/commandlinetools-win-15859902_latest.zip" -OutFile "$Temp\tools.zip"

Expand-Archive "$Temp\tools.zip" -DestinationPath $Temp -Force

Move-Item "$Temp\cmdline-tools" "$Sdk\cmdline-tools\latest" -Force

----------------------------
VARIABLES DE ANDROID SDK:
----------------------------
$env:ANDROID_HOME = "C:\Android\Sdk"
$env:ANDROID_SDK_ROOT = "C:\Android\Sdk"
$env:PATH += ";C:\Android\Sdk\cmdline-tools\latest\bin;C:\Android\Sdk\platform-tools"

sdkmanager --version

--------------------------------------------------------
HERRAMIENTAS  PARA COMPILAR ANDROID:
--------------------------------------------------------

sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"

--------------------------------------------------------
COMPILAR ANDROID:
--------------------------------------------------------
npm run build
npx cap sync android


.\android\gradlew.bat -p android assembleDebug

npm run build; npx cap sync android; .\android\gradlew.bat -p android assembleDebug

LICENSE VALIDATION FAILURE

BGGeo is fully functional in DEBUG builds without a license so you can 'try before you buy'.