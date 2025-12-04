import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>Student Form → PDF Generator</h1>
      <Link href="/students">Open Student Entry Form</Link>
    </main>
  );
}
