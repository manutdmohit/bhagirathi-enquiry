'use client';

import { useState } from 'react';

interface SponsorFormData {
  bankName: string;
  bankManagerName: string;
  accountHolderName: string;
  bankAddress: string;
  accountNumber: string;
  accountType: string;
  accountOpenedDate: string;
  lockdownBusiness: string;
  monthlyTxnAmount: string;
  lastTransactionDate: string;
  otherAccounts: string;
  reasonOpenIfOther: string;
  currentBalance: string;
  amountInBank: string;
  lastCheckToName: string;
  balanceCertificateDate: string;
  interestFrequencyAndAmount: string;
  sponsorSignedBy: string;
  sponsorSignedDate: string;
}

export default function SponsorFormPage() {
  const [form, setForm] = useState<SponsorFormData>({
    bankName: '',
    bankManagerName: '',
    accountHolderName: '',
    bankAddress: '',
    accountNumber: '',
    accountType: '',
    accountOpenedDate: '',
    lockdownBusiness: '',
    monthlyTxnAmount: '',
    lastTransactionDate: '',
    otherAccounts: '',
    reasonOpenIfOther: '',
    currentBalance: '',
    amountInBank: '',
    lastCheckToName: '',
    balanceCertificateDate: '',
    interestFrequencyAndAmount: '',
    sponsorSignedBy: '',
    sponsorSignedDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }

  function validateForm(): boolean {
    const requiredFields: (keyof SponsorFormData)[] = [
      'bankName',
      'accountHolderName',
      'accountNumber',
    ];

    const nextErrors: Record<string, string> = {};

    for (const field of requiredFields) {
      if (!String(form[field]).trim()) {
        nextErrors[field] = 'This field is required';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function downloadPDF() {
    setLoading(true);
    setError('');

    try {
      if (!validateForm()) {
        setError('Please fix required fields');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/generate-sponsor-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${form.accountHolderName || 'sponsor'}-form.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError('PDF Generation Failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Sponsor Enquiry Form
          </h1>
          <p className="text-lg text-gray-600">
            Please fill sponsor banking information carefully
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* BANK DETAILS */}
          <Section title="Bank Details / बैंक विवरण">
            <Grid>
              <Input
                name="bankName"
                label="बैंकको नाम के हो? / Bank Name"
                value={form.bankName}
                onChange={handleChange}
                error={errors.bankName}
              />
              <Input
                name="bankManagerName"
                label="बैंक म्यानेजरको नाम / Bank Manager Name"
                value={form.bankManagerName}
                onChange={handleChange}
              />
              <Input
                name="accountHolderName"
                label="खातावालाको नाम / Account Holder Name"
                value={form.accountHolderName}
                onChange={handleChange}
                error={errors.accountHolderName}
              />
              <Input
                name="bankAddress"
                label="बैंकको ठेगाना / Bank Address"
                value={form.bankAddress}
                onChange={handleChange}
              />
              <Input
                name="accountNumber"
                label="खाता नम्बर / Account Number"
                value={form.accountNumber}
                onChange={handleChange}
                error={errors.accountNumber}
              />
              <Input
                name="accountType"
                label="खाताको प्रकार / Account Type"
                value={form.accountType}
                onChange={handleChange}
              />
              <Input
                name="accountOpenedDate"
                label="खाता खोलिएको मिति / Account Opened Date"
                value={form.accountOpenedDate}
                onChange={handleChange}
              />
            </Grid>
          </Section>

          {/* TRANSACTIONS */}
          <Section title="Transactions / कारोबार">
            <Grid>
              <Input
                name="lockdownBusiness"
                label="लकडाउनमा कारोबार भएको थियो? / Business during lockdown"
                value={form.lockdownBusiness}
                onChange={handleChange}
              />
              <Input
                name="monthlyTxnAmount"
                label="महिनाको जम्मा/झिक्ने रकम"
                value={form.monthlyTxnAmount}
                onChange={handleChange}
              />
              <Input
                name="lastTransactionDate"
                label="अन्तिम कारोबार मिति"
                value={form.lastTransactionDate}
                onChange={handleChange}
              />
              <Input
                name="lastCheckToName"
                label="अन्तिम चेक कसको नाममा?"
                value={form.lastCheckToName}
                onChange={handleChange}
              />
            </Grid>
          </Section>

          {/* BALANCE */}
          <Section title="Balance & Accounts / बैलन्स">
            <Grid>
              <Input
                name="otherAccounts"
                label="अरु खाता छ?"
                value={form.otherAccounts}
                onChange={handleChange}
              />
              <Input
                name="reasonOpenIfOther"
                label="अरु भए पनि किन यसैमा?"
                value={form.reasonOpenIfOther}
                onChange={handleChange}
              />
              <Input
                name="currentBalance"
                label="हालको बैलन्स"
                value={form.currentBalance}
                onChange={handleChange}
              />
              <Input
                name="amountInBank"
                label="बैंकमा रहेको रकम"
                value={form.amountInBank}
                onChange={handleChange}
              />
              <Input
                name="balanceCertificateDate"
                label="ब्यालेन्स सर्टिफिकेट मिति"
                value={form.balanceCertificateDate}
                onChange={handleChange}
              />
              <Input
                name="interestFrequencyAndAmount"
                label="ब्याज कति महिनामा / Amount"
                value={form.interestFrequencyAndAmount}
                onChange={handleChange}
              />
            </Grid>
          </Section>

          {/* AUTHORIZATION */}
          <Section title="Authorization / अधिकार">
            <Grid>
              <Input
                name="sponsorSignedBy"
                label="साइन गर्ने व्यक्ति"
                value={form.sponsorSignedBy}
                onChange={handleChange}
              />
              <Input
                name="sponsorSignedDate"
                label="साइन मिति"
                value={form.sponsorSignedDate}
                onChange={handleChange}
              />
            </Grid>
          </Section>

          {/* BUTTON */}
          <div className="flex justify-center pt-8">
            <button
              onClick={downloadPDF}
              disabled={loading}
              className={`px-8 py-3 rounded-lg font-semibold text-white shadow-md transition ${
                loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? '⏳ Generating PDF...' : '📥 Download Sponsor PDF'}
            </button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              ❌ {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ----------------- UI Components ----------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
        {title}
      </h3>
      {children}
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
  );
}

function Input({
  name,
  value,
  onChange,
  label,
  type = 'text',
  error,
}: {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  type?: 'text' | 'number';
  error?: string;
}) {
  return (
    <div className="flex flex-col">
      <label className="mb-2 font-medium text-gray-700">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className={`px-4 py-2.5 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
