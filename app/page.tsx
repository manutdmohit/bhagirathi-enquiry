import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-white p-6">
      {/* Hero Section */}
      <div className="text-center max-w-xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6">
          Student & Sponsor PDF Generator
        </h1>
        <p className="text-lg md:text-xl text-blue-800 mb-10">
          Easily fill enquiry forms and download them as professional PDFs.
          Fast, bilingual, and hassle-free.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            href="/students"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
          >
            Open Student Form
          </Link>
          <Link
            href="/sponsors"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
          >
            Open Sponsor Form
          </Link>
        </div>
      </div>

      {/* Footer / Extra Info */}
      <footer className="mt-16 text-center text-sm text-blue-600">
        &copy; {new Date().getFullYear()} Bhagirathi Abroad Study Pvt. Ltd. |
        Designed for seamless PDF generation
      </footer>
    </main>
  );
}
