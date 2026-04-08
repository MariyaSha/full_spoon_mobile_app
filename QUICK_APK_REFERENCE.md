# Full Spoon - Quick APK Build Reference

## 🚀 One-Command APK Build

```bash
cd /app/frontend && yarn build:mobile && cd android && ./gradlew assembleDebug
```

**Output**: `/app/frontend/android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📱 Available Commands

| Command | Description |
|---------|-------------|
| `yarn build` | Build React app to /build |
| `yarn build:mobile` | Build + sync to Android |
| `yarn android:open` | Open in Android Studio |
| `yarn android:build` | Build debug APK |
| `yarn android:build:release` | Build release APK (unsigned) |

---

## 📍 APK Output Locations

- **Debug APK**: `android/app/build/outputs/apk/debug/app-debug.apk`
- **Release APK**: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

---

## 🔧 Quick Install on Device

```bash
# Via ADB
adb install android/app/build/outputs/apk/debug/app-debug.apk

# Via file transfer
# Copy APK to device, tap to install
```

---

## ✅ Standalone Features

### Works Offline
- ✅ Recipe browsing (15.6 MB dataset bundled)
- ✅ Recipe details
- ✅ Cart management
- ✅ Loved recipes
- ✅ Saved carts
- ✅ Filter system
- ✅ Dark mode

### Requires Internet
- ⚠️ Recipe images only (loaded from URLs)

---

## 📊 App Info

- **Package**: `com.fullspoon.app`
- **Name**: Full Spoon
- **Version**: 1.0.0
- **Min Android**: 7.0 (API 24)
- **Target Android**: 14 (API 34)

---

## 🐛 Quick Troubleshooting

```bash
# Clean build
cd android && ./gradlew clean && ./gradlew assembleDebug

# Re-sync Capacitor
cd .. && npx cap sync android

# Rebuild from scratch
rm -rf android && npx cap add android && yarn build:mobile
```

---

See **ANDROID_APK_BUILD_GUIDE.md** for detailed instructions.
