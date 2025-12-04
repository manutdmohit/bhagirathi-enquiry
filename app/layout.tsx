import './globals.css';

export const metadata = {
  title: 'Student Form',
  description: 'Bilingual Student PDF Generator',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, Arial, sans-serif' }}>
        <div style={{ maxWidth: 900, margin: '40px auto', padding: 20 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
