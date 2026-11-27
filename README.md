### CONFIGURACIÓN DEL ENTORNO ANDROID

#### NODE.JS
```powershell
nvm install 22.23.5
nvm use 22.23.5
node -v
```

  JAVA SDK
```powershell
winget install EclipseAdoptium.Temurin.21.JDK
```

Alternativa con Jabba:
```powershell
jabba install 21.0.0-temurin=zip+https://api.adoptium.net/v3/binary/latest/21/ga/windows/x64/jdk/hotspot/normal/eclipse
jabba use 21.0.0-temurin
```

  ANDROID SDK

```powershell
$Sdk = "C:\Android\Sdk"
$Temp = "$env:TEMP\android-cli"

if (Test-Path $Sdk) { throw "La carpeta ya existe: $Sdk" }

New-Item -ItemType Directory -Force "$Sdk\cmdline-tools" | Out-Null
New-Item -ItemType Directory -Force $Temp | Out-Null

Invoke-WebRequest "https://dl.google.com/android/repository/commandlinetools-win-15859902_latest.zip" -OutFile "$Temp\tools.zip" -ErrorAction Stop

Expand-Archive "$Temp\tools.zip" -DestinationPath $Temp -Force

Move-Item "$Temp\cmdline-tools" "$Sdk\cmdline-tools\latest" -Force
```

#### VARIABLES DE ANDROID SDK

```powershell
$env:ANDROID_HOME = "C:\Android\Sdk"
$env:ANDROID_SDK_ROOT = "C:\Android\Sdk"
$env:PATH += ";C:\Android\Sdk\cmdline-tools\latest\bin;C:\Android\Sdk\platform-tools"

sdkmanager --version
```

**IMPORTANTE:** Reiniciar la IDE de Visual Studio para que reconozca los cambios en las variables de entorno.

#### HERRAMIENTAS PARA COMPILAR ANDROID

```powershell
sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"
```

#### COMPILAR ANDROID

```powershell
$env:ANDROID_HOME = "C:\Android\Sdk"
$env:ANDROID_SDK_ROOT = "C:\Android\Sdk"
$env:PATH += ";C:\Android\Sdk\cmdline-tools\latest\bin;C:\Android\Sdk\platform-tools"

npm run build
npx cap sync android
.\android\gradlew.bat -p android assembleDebug
```

Comando completo en una línea:

```powershell
npm run build; npx cap sync android; .\android\gradlew.bat -p android assembleDebug
```

comando parametrizado en package.json
```powershell
npm run apk:build
```

#### LICENSE VALIDATION FAILURE

BGGeo es completamente funcional en compilaciones DEBUG sin licencia, para permitir probarlo antes de comprar.

#### GIT

Decodificar token hexadecimal: https://www.convertstring.com/es/EncodeDecode/HexEncode

configurar cred una sola vez:
```powershell
$hex="6769746875625F7061745F3131424F4D4C594749305076354433557653317235525F4F625258714979694C6C37566D7770366173573030473843573534344375576869577161347A69376B7277524554354744535A68516B5243667263"; 
$token=[Text.Encoding]::UTF8.GetString(($hex -split '(..)' | Where-Object {$_} | ForEach-Object {[Convert]::ToByte($_,16)}))

$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("adolfoaraya-dev:$token"))
git config --local http.extraheader "AUTHORIZATION: basic $auth"
git config --local user.name "adolfoaraya-dev"
git config --local user.email "araya.info@gmail.com"
git remote set-url origin https://github.com/adolfoaraya-dev/app-geo.git
```

Commits:
```powershell
git add .
git commit -m "doc"
git push -u origin main
```
