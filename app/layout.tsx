import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import CognitoInit from './cognito';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CognitoInit />
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
