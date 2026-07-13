# Mohammad Sohail Shaikh - Portfolio Website

A modern, interactive personal portfolio website built with Next.js, React, and TypeScript. Features a cyberpunk/matrix themed design with OTP-based contact form verification.

## Features

- 🎨 **Dual Theme Support** - Cyberpunk & Matrix themes
- 📱 **OTP Verification** - Twilio Verify integration for secure contact form
- 🔐 **Backend Security** - All API calls on backend, no exposed credentials
- ✨ **Smooth Animations** - Framer Motion animations throughout
- 📱 **Fully Responsive** - Mobile-first design
- 🌙 **Interactive UI** - Animated particles, terminal, custom cursor
- 🚀 **Next.js 15** - Latest version with App Router
- 📝 **TypeScript** - Full type safety

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Twilio Account (for OTP verification)

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/Portfolio_Web.git
cd Portfolio_Web
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables

Create `.env.local` file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Twilio credentials:
```env
TWILIO_ACCOUNT_SID=your_actual_account_sid
TWILIO_AUTH_TOKEN=your_actual_auth_token
TWILIO_VERIFY_SERVICE_SID=your_actual_verify_service_sid
```

**Get Twilio Credentials:**
1. Go to [Twilio Console](https://console.twilio.com/)
2. Copy your Account SID and Auth Token
3. Create a Verify Service and copy the Service SID

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
Portfolio_Web/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── otp/              # OTP API endpoints
│   │   │       ├── send/
│   │   │       └── verify/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── sections/             # Page sections
│   │   │   ├── About.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── ...
│   │   └── ui/                   # Reusable UI components
│   └── lib/
│       ├── twilio.ts             # Twilio client
│       └── phoneValidation.ts    # Phone number utilities
├── public/
├── .env.example                  # Environment variables template
├── .env.local                    # (⚠️ Never commit - local only)
├── package.json
└── tsconfig.json
```

## OTP Verification Flow

1. User enters mobile number in contact form
2. Frontend sends POST request to `/api/otp/send`
3. Backend calls Twilio Verify API to send OTP via SMS
4. User receives OTP and enters it
5. Frontend sends POST request to `/api/otp/verify`
6. Backend verifies OTP with Twilio
7. On success, "Send Message" button is enabled
8. Message is sent via WhatsApp with verified phone number

## Environment Variables

All environment variables are stored in `.env.local` (not committed to GitHub).

| Variable | Purpose |
|----------|---------|
| `TWILIO_ACCOUNT_SID` | Twilio Account identifier |
| `TWILIO_AUTH_TOKEN` | Twilio authentication token |
| `TWILIO_VERIFY_SERVICE_SID` | Twilio Verify Service identifier |

⚠️ **Security Note:** `.env.local` is in `.gitignore` and will never be committed to GitHub.

## Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Then add environment variables in Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_VERIFY_SERVICE_SID`

### Deploy to Other Platforms

Make sure to set environment variables in your hosting platform's settings.

## Technologies Used

- **Framework:** Next.js 15
- **UI:** React 19, Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Language:** TypeScript
- **OTP Service:** Twilio Verify
- **HTTP Client:** Fetch API
- **Linting:** ESLint

## Contributing

Feel free to fork this project and submit pull requests for improvements!

## License

This project is open source and available under the MIT License.

## Contact

- 📧 Email: sohailsk0160@gmail.com
- 📱 WhatsApp: +91 8850314221
- 🔗 LinkedIn: [Mohammad Sohail Shaikh](https://www.linkedin.com/in/mohammad-sohail-shaikh-537432291/)

## Support

For issues or questions, please create an GitHub issue or contact me directly.
