# Full Spoon - APK Build Environment Setup

## 📋 Required Software

To build the Android APK, you need:

### 1. Java Development Kit (JDK)
- **Version**: JDK 17 or higher
- **Download**: https://adoptium.net/
- **Verification**: `java -version`

**Installation (Ubuntu/Debian)**:
```bash
sudo apt update
sudo apt install openjdk-17-jdk
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

**Installation (macOS)**:
```bash
brew install openjdk@17
export JAVA_HOME=/usr/local/opt/openjdk@17
```

**Installation (Windows)**:
- Download from https://adoptium.net/
- Run installer
- Set JAVA_HOME environment variable

### 2. Android SDK (via Android Studio)
- **Download**: https://developer.android.com/studio
- **Components needed**:
  - Android SDK Platform 34
  - Android SDK Build-Tools
  - Android SDK Command-line Tools

**OR use sdkmanager (command-line)**:
```bash
sdkmanager "platforms;android-34" "build-tools;34.0.0"
```

### 3. Gradle (included with project)
- **Version**: 8.x (auto-installed)
- **Location**: `/app/frontend/android/gradlew`

---

## 🚀 Quick Build (After Setup)

```bash
# 1. Set JAVA_HOME
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64

# 2. Build React app
cd /app/frontend
yarn build:mobile

# 3. Build APK
cd android
./gradlew assembleDebug

# 4. Locate APK
ls -lh app/build/outputs/apk/debug/app-debug.apk
```

---

## 🎯 Alternative: Use Android Studio (Recommended)

**Easiest method** for building APKs:

1. **Install Android Studio**
   - Download from https://developer.android.com/studio
   - Install with default settings

2. **Open Project**
   ```bash
   cd /app/frontend
   yarn android:open
   ```

3. **Build APK in Android Studio**
   - Menu: Build → Build Bundle(s) / APK(s) → Build APK(s)
   - Wait for build completion
   - Click "locate" in notification

4. **APK Location**
   - `android/app/build/outputs/apk/debug/app-debug.apk`

---

## 🐳 Alternative: Docker Build (No Local Setup)

If you don't want to install Java/Android SDK:

```bash
# Use official Gradle Docker image
docker run --rm -v /app/frontend:/app -w /app/android gradle:8.5-jdk17 \
  gradle assembleDebug

# APK will be in /app/frontend/android/app/build/outputs/apk/debug/
```

---

## ☁️ Alternative: Cloud Build Services

### GitHub Actions
Create `.github/workflows/build-apk.yml`:

```yaml
name: Build Android APK
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-java@v3
        with:
          java-version: '17'
          distribution: 'temurin'
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: cd frontend && yarn install && yarn build:mobile
      - run: cd frontend/android && ./gradlew assembleDebug
      - uses: actions/upload-artifact@v3
        with:
          name: app-debug.apk
          path: frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

### Bitrise
- Connect GitHub repo
- Add "Install Node" step
- Add "Gradle Build" step
- Download APK from artifacts

---

## 📱 Build Without Full Environment

If you only need to test the app as a web app (not APK):

```bash
cd /app/frontend
yarn build
npx serve -s build
```

Open http://localhost:3000 in mobile browser or use Chrome DevTools mobile emulation.

---

## ✅ Verification

After installing prerequisites:

```bash
# Check Java
java -version
# Expected: openjdk version "17" or higher

# Check Gradle
cd /app/frontend/android
./gradlew --version
# Expected: Gradle 8.x

# Test build
./gradlew assembleDebug
# Expected: BUILD SUCCESSFUL
```

---

## 📚 Resources

- [Android Studio Download](https://developer.android.com/studio)
- [JDK Download](https://adoptium.net/)
- [Capacitor Documentation](https://capacitorjs.com/docs/android)
- [Gradle Documentation](https://gradle.org/)

---

**Note**: The app code is fully ready for APK building. The only requirement is setting up the build environment with Java + Android SDK.
