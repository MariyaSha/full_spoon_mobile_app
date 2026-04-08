# Full Spoon - Android APK Build Guide

## 📱 Standalone Mobile App Configuration

Full Spoon is now configured as a **standalone Android application** that works independently of Emergent.

### ✅ Standalone Architecture Verification

#### Data Layer (100% Standalone)
- ✅ **Recipe Dataset**: Bundled in `/app/frontend/build/recipes.json` (15.6 MB)
- ✅ **No Backend Dependency**: All recipe logic runs client-side
- ✅ **Offline Recipe Browsing**: Full dataset available without internet

#### User State Persistence (100% Local)
- ✅ **Loved Recipes**: Stored in device LocalStorage
- ✅ **Cart Recipes**: Stored in device LocalStorage
- ✅ **Cart Ingredients**: Stored in device LocalStorage (with smart aggregation)
- ✅ **Saved Carts**: Stored in device LocalStorage
- ✅ **Dark Mode Preference**: Stored in device LocalStorage
- ✅ **Filter Selections**: Managed in React Context (session-based)

#### External Dependencies
- ⚠️ **Recipe Images Only**: Loads from remote URLs (requires internet for images)
- ✅ **App Logic**: 100% standalone, no Emergent dependency

---

## 🔧 Prerequisites

### Required Tools
- **Node.js**: v20+ (current: v20.20.2)
- **Yarn**: v1.22+
- **Android Studio**: Latest version (for APK building)
- **Java JDK**: v17+ (required by Gradle)

### Optional (for device testing)
- Android device with USB debugging enabled
- OR Android emulator

---

## 📦 Build Commands

### 1. Build Web Assets
```bash
cd /app/frontend
yarn build
```

This creates an optimized production build in `/app/frontend/build/`

### 2. Sync to Android
```bash
yarn build:mobile
```

This runs both `yarn build` and `npx cap sync android`

### 3. Open in Android Studio
```bash
yarn android:open
```

This opens the Android project in Android Studio for:
- Visual APK building
- Device testing
- Signing configurations

### 4. Build Debug APK (Command Line)
```bash
yarn android:build
```

**Output**: `/app/frontend/android/app/build/outputs/apk/debug/app-debug.apk`

### 5. Build Release APK (Command Line)
```bash
yarn android:build:release
```

**Output**: `/app/frontend/android/app/build/outputs/apk/release/app-release-unsigned.apk`

⚠️ **Note**: Release APKs must be signed before distribution.

---

## 🔐 APK Signing (for Production)

### Generate Keystore (One-time)
```bash
keytool -genkey -v -keystore fullspoon-release.keystore \
  -alias fullspoon -keyalg RSA -keysize 2048 -validity 10000
```

### Configure Signing in Gradle

Edit `/app/frontend/android/app/build.gradle`:

```gradle
android {
    ...
    signingConfigs {
        release {
            storeFile file('../../fullspoon-release.keystore')
            storePassword 'YOUR_KEYSTORE_PASSWORD'
            keyAlias 'fullspoon'
            keyPassword 'YOUR_KEY_PASSWORD'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            ...
        }
    }
}
```

### Build Signed Release APK
```bash
cd /app/frontend/android
./gradlew assembleRelease
```

**Output**: `/app/frontend/android/app/build/outputs/apk/release/app-release.apk`

---

## 📱 Installation & Testing

### Install on Device via ADB
```bash
adb install /app/frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

### Install on Emulator
```bash
adb -e install /app/frontend/android/app/build/outputs/apk/debug/app-debug.apk
```

### Direct Device Install
- Copy APK to device
- Enable "Install from Unknown Sources" in device settings
- Tap APK file to install

---

## 🧪 Standalone Functionality Tests

### Test Checklist (All features work offline except images)

#### Recipe Browsing
- [ ] Main Categories page loads
- [ ] Category pages (All Recipes, Quick, Low Calorie, etc.) load
- [ ] Recipe cards display with titles
- [ ] Recipe search/filter works

#### Recipe Details
- [ ] Recipe detail page opens
- [ ] Ingredients list displays
- [ ] Instructions display
- [ ] Nutrition facts display
- [ ] Time information shows

#### Cart Functionality
- [ ] Add recipes to cart
- [ ] View cart ingredients (aggregated)
- [ ] View cart recipes
- [ ] Remove recipes from cart
- [ ] Empty cart functionality

#### Saved Carts
- [ ] Save current cart with custom name
- [ ] View saved carts list
- [ ] Load saved cart
- [ ] Saved carts persist after app restart

#### Loved Recipes
- [ ] Heart icon toggles on recipe cards
- [ ] Loved recipes page shows saved favorites
- [ ] Loved recipes persist after app restart

#### Filter System
- [ ] Time filters work (< 15 mins, < 30 mins, etc.)
- [ ] Dietary filters work (Vegetarian, Vegan, etc.)
- [ ] Dish type filters work (Dessert, Breakfast, etc.)
- [ ] Cooking method filters work (No Cook, Oven, etc.)
- [ ] Multiple filters combine with AND logic
- [ ] Clear all filters resets selection

#### Dark Mode
- [ ] Dark mode toggle works
- [ ] Dark mode persists after app restart
- [ ] All pages respect dark mode setting

#### Data Persistence
- [ ] All user data persists after:
  - App restart
  - Device reboot
  - App force-stop

---

## 📂 Project Structure

```
/app/frontend/
├── android/                          # Native Android project
│   ├── app/
│   │   ├── build/
│   │   │   └── outputs/apk/         # Built APK files
│   │   └── src/main/
│   │       ├── AndroidManifest.xml  # App permissions & config
│   │       └── assets/public/       # Bundled web assets
│   └── build.gradle                 # Android build config
├── build/                           # Compiled React app
│   ├── index.html
│   ├── static/
│   └── recipes.json                 # Bundled recipe dataset (15.6 MB)
├── public/
│   └── recipes.json                 # Source recipe dataset
├── src/                             # React source code
└── capacitor.config.json            # Capacitor configuration
```

---

## 🔍 Troubleshooting

### Build Fails
```bash
# Clear build cache
cd /app/frontend/android
./gradlew clean

# Rebuild
./gradlew assembleDebug
```

### Sync Issues
```bash
cd /app/frontend
rm -rf android
npx cap add android
yarn build:mobile
```

### App Crashes on Launch
- Check Android Studio Logcat
- Verify recipes.json is bundled in build/
- Ensure internet permission in AndroidManifest.xml

### Data Not Persisting
- Verify LocalStorage is enabled
- Check browser DevTools → Application → Local Storage
- Test on physical device (not just browser)

---

## 📊 APK Size Optimization

Current APK size: ~16-18 MB (includes 15.6 MB recipe dataset)

### Optimization Options (Optional)

1. **Enable ProGuard** (code minification)
   ```gradle
   buildTypes {
       release {
           minifyEnabled true
           proguardFiles getDefaultProguardFile('proguard-android-optimize.txt')
       }
   }
   ```

2. **Enable App Bundle** (Google Play)
   ```bash
   ./gradlew bundleRelease
   ```
   Output: `.aab` file (smaller than APK)

3. **Image Optimization**
   - Recipe images load from URLs (not bundled)
   - Keeps APK size minimal

---

## 🎯 App Configuration

### Package Name
`com.fullspoon.app`

### App Name
`Full Spoon`

### Version
`1.0.0` (set in `/app/frontend/android/app/build.gradle`)

### Minimum Android Version
Android 7.0 (API Level 24)

### Target Android Version
Android 14 (API Level 34)

---

## 🚀 Distribution Options

### 1. Direct APK Distribution
- Share APK file directly
- Users install via file manager
- No app store account needed

### 2. Google Play Store
- Requires developer account ($25 one-time fee)
- Submit signed `.aab` file
- Automatic updates for users

### 3. Alternative App Stores
- Amazon Appstore
- Samsung Galaxy Store
- F-Droid (requires open source)

---

## 📝 Important Notes

### Standalone Verification
✅ **The app is 100% standalone** except for recipe images:
- No Emergent API calls
- No backend server required
- Works offline for all core features
- Recipe images require internet (URLs are remote)

### Data Ownership
- All user data stored on device
- No cloud sync (fully private)
- No analytics or tracking
- No third-party dependencies

### Future Enhancements (Optional)
- [ ] Offline recipe images (bundle or cache)
- [ ] Cloud sync for cross-device data
- [ ] Recipe sharing via export/import
- [ ] Custom recipe additions

---

## 💡 Quick Start Summary

```bash
# 1. Build the app
cd /app/frontend
yarn build:mobile

# 2. Open in Android Studio
yarn android:open

# 3. In Android Studio:
#    - Build → Build Bundle(s) / APK(s) → Build APK(s)
#    - Wait for build to complete
#    - Click "locate" in notification to find APK

# 4. Install APK on device
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

**APK Location**: `/app/frontend/android/app/build/outputs/apk/debug/app-debug.apk`

---

## ✅ Verification Checklist

Before distributing the APK:

- [ ] Build completes without errors
- [ ] APK installs on test device
- [ ] App launches successfully
- [ ] Recipe browsing works
- [ ] All 6 categories load correctly
- [ ] Recipe details display
- [ ] Cart functionality works
- [ ] Saved carts persist
- [ ] Loved recipes persist
- [ ] Dark mode works
- [ ] App works after device reboot
- [ ] No crashes during normal use

---

**Last Updated**: April 2026  
**Capacitor Version**: 6.2.1  
**React Version**: 18.2.0  
**Build Tool**: Gradle 8.x
