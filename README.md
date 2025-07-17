# RealTime Translator

A mobile application designed to facilitate real-time translation during medical consultations, bridging the communication gap between healthcare providers and patients who speak different languages.

## Features

- 🏥 **Real-time Translation**

  - Instant voice-to-voice translation
  - Support for multiple languages
  - Emergency translation mode

- 👨‍⚕️ **Doctor Features**

  - Patient management
  - Session history tracking
  - Quick access to patient medical records
  - Emergency consultation handling

- 👥 **Patient Features**

  - Easy appointment scheduling
  - Medical history access
  - Session history review
  - Emergency translation access

- 🔐 **Authentication & Security**
  - Secure login/signup
  - Role-based access control
  - Data encryption
  - HIPAA compliance

## Technology Stack

- **Frontend Framework**: React Native with Expo
- **Navigation**: Expo Router
- **UI Components**: Custom components with reusable design patterns
- **Styling**: React Native StyleSheet with global styles
- **Icons**: Expo Vector Icons

## Project Structure

```
RealTime-Translator/
├── app/                      # Main application screens
│   ├── auth/                 # Authentication screens
│   ├── doctor/              # Doctor-specific screens
│   └── patient/             # Patient-specific screens
├── components/              # Reusable components
│   ├── auth/               # Auth-related components
│   ├── form/               # Form components
│   ├── homepage/           # Homepage components
│   ├── patient/            # Patient-related components
│   └── ui/                 # UI components
├── constants/              # Constants and dummy data
├── enums/                 # Enum definitions
├── styles/               # Global styles
├── utils/               # Utility functions
└── assets/             # Images, fonts, etc.
```

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   ```

2. Install dependencies:

   ```bash
   cd RealTime-Translator
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS
   - Press `a` for Android
   - Press `w` for web

## Code Style

- Follow the established project structure
- Use reusable components where possible
- Utilize global styles from `styles/global.js`
- Follow enumeration patterns for static values
- Maintain consistent naming conventions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Your Name - your.email@example.com
Project Link: [https://github.com/yourusername/RealTime-Translator](https://github.com/yourusername/RealTime-Translator)
