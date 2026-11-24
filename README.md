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



----------------------------
GIT:
-------------------------

decodificas cred pat
https://www.convertstring.com/es/EncodeDecode/HexEncode


$hex="6769746875625F7061745F3131424F4D4C594749305076354433557653317235525F4F625258714979694C6C37566D7770366173573030473843573534344375576869577161347A69376B7277524554354744535A68516B5243667263"; 
[Text.Encoding]::UTF8.GetString(($hex -split '(..)' | ? {$_} | % {[Convert]::ToByte($_,16)}))

git add .

git -c user.name="adolfoaraya-dev" -c user.email="araya.info@gmail.com" commit -m "doc"

git remote set-url origin https://github.com/adolfoaraya-dev/app-geo.git

git -c credential.helper= push origin main

