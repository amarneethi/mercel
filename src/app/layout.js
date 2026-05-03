import 'aopends/styles.css';
import 'aopends/themes/light';
import './globals.css';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'aopends';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Mercel',
  description: 'Deploy, scale, and ship frontend apps',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <ThemeProvider>
        <body className="bg-[var(--ds-bg-primary)] text-[var(--ds-text-primary)]">
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
