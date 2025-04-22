import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-inter antialiased">
        {children}
      </body>
    </html>
  );
}

export const metadata = {
  title: 'Meeting Scheduler',
  description: 'Schedule meetings with our team',
};
