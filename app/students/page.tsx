'use client';

import { useState } from 'react';

interface StudentFormData {
  name: string;
  dob: string;
  phone: string;
  permanentAddress: string;
  currentAddress: string;
  father: string;
  mother: string;
  college: string;
  schoolFee: string;
  livingExpenses: string;
  workExperience: string;
  collegeRunning: string;
  motherAge: string;
  motherProfession: string;
  motherAddress: string;
  fatherAge: string;
  fatherPhone: string;
  fatherAddress: string;
  fatherProfession: string;
  lastYearIncome: string;
  bankName: string;
  bankAccountHolder: string;
  bankAddress: string;
  educationStatus: string; // N4 Preparing / M5 passout etc
  languageSchoolName: string;
  languageSchoolJoiningDate: string;
  languageSchoolAddress: string;
  familyMembersCount: string;
  plansAfterLanguageSchool: string;
  signedBy: string;
  signedDate: string;
}

export default function StudentFormPage() {
  const [form, setForm] = useState<StudentFormData>({
    name: '',
    dob: '',
    phone: '',
    permanentAddress: '',
    currentAddress: '',
    father: '',
    mother: '',
    college: '',
    schoolFee: '',
    livingExpenses: '',
    workExperience: '',
    collegeRunning: '',
    motherAge: '',
    motherProfession: '',
    motherAddress: '',
    fatherAge: '',
    fatherPhone: '',
    fatherAddress: '',
    fatherProfession: '',
    lastYearIncome: '',
    bankName: '',
    bankAccountHolder: '',
    bankAddress: '',
    educationStatus: '',
    languageSchoolName: '',
    languageSchoolJoiningDate: '',
    languageSchoolAddress: '',
    familyMembersCount: '',
    plansAfterLanguageSchool: '',
    signedBy: '',
    signedDate: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = e.target as HTMLInputElement;
    setForm((prev) => ({ ...prev, [name]: value }));
    // clear field error when user types
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  }

  function validateForm(): boolean {
    const requiredFields = [
      'name',
      'dob',
      'phone',
      'permanentAddress',
      'currentAddress',
      'father',
      'mother',
      'college',
      'schoolFee',
    ];

    const nextErrors: Record<string, string> = {};
    for (const field of requiredFields) {
      const value = (form as unknown as Record<string, unknown>)[field];
      if (
        value === undefined ||
        value === null ||
        String(value).trim() === ''
      ) {
        nextErrors[field] = 'This field is required';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function downloadPDF(): Promise<void> {
    setLoading(true);
    setError('');

    try {
      // client-side validation before sending
      if (!validateForm()) {
        setLoading(false);
        setError('Please fix the highlighted errors.');
        return;
      }
      const res = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${form.name || 'student'}-form.pdf`;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Student Enquiry Form
          </h1>
          <p className="text-lg text-gray-600">
            Please fill in all required information below
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Content */}
          <div className="p-8">
            {/* Personal Information */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="college"
                  value={form.college}
                  onChange={handleChange}
                  label="School Name / स्कुलको नाम"
                  error={errors.college}
                />
                <InputField
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  label="Student Name / विद्यार्थीको नाम"
                  error={errors.name}
                />
                <InputField
                  name="schoolFee"
                  value={form.schoolFee}
                  onChange={handleChange}
                  label="School Fee / स्कुल शुल्क"
                  type="text"
                  error={errors.schoolFee}
                />
                <InputField
                  name="livingExpenses"
                  value={form.livingExpenses}
                  onChange={handleChange}
                  label="Living Expenses / जीवन खर्च"
                  type="text"
                />
                <InputField
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  label="Date of Birth / जन्म मिति (YYYY-MM-DD)"
                  type="text"
                  placeholder="YYYY-MM-DD"
                  error={errors.dob}
                />
                <InputField
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  label="Phone Number / फोन नम्बर"
                  type="tel"
                  error={errors.phone}
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
                Address Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="permanentAddress"
                  value={form.permanentAddress}
                  onChange={handleChange}
                  label="Permanent Address / स्थायी ठेगाना"
                  error={errors.permanentAddress}
                />
                <InputField
                  name="currentAddress"
                  value={form.currentAddress}
                  onChange={handleChange}
                  label="Current Address / हालको ठेगाना"
                  error={errors.currentAddress}
                />
                <InputField
                  name="workExperience"
                  value={form.workExperience}
                  onChange={handleChange}
                  label="Work Experience / काम गरेको अनुभव"
                />
                <InputField
                  name="collegeRunning"
                  value={form.collegeRunning}
                  onChange={handleChange}
                  label="College Year/Semester / कलेज चलिरहेको वर्ष"
                />
              </div>
            </div>

            {/* Family Information */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
                Family Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="father"
                  value={form.father}
                  onChange={handleChange}
                  label="Father's Name / बुबाको नाम"
                  error={errors.father}
                />
                <InputField
                  name="mother"
                  value={form.mother}
                  onChange={handleChange}
                  label="Mother's Name / आमाको नाम"
                  error={errors.mother}
                />
                <InputField
                  name="familyMembersCount"
                  value={form.familyMembersCount}
                  onChange={handleChange}
                  label="No. of Family Members / परिवारका सदस्यहरूको संख्या"
                  type="text"
                />
              </div>

              {/* Mother's Details */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">
                  Mother&#39;s Details / आमाको विवरण
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <InputField
                    name="motherAge"
                    value={form.motherAge}
                    onChange={handleChange}
                    label="Age / उमेर"
                    type="text"
                  />
                  <InputField
                    name="motherProfession"
                    value={form.motherProfession}
                    onChange={handleChange}
                    label="Profession / पेशा"
                  />
                  <InputField
                    name="motherAddress"
                    value={form.motherAddress}
                    onChange={handleChange}
                    label="Address / ठेगाना"
                  />
                </div>
              </div>

              {/* Father's Details */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">
                  Father&apos;s Details / बुबाको विवरण
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <InputField
                    name="fatherAge"
                    value={form.fatherAge}
                    onChange={handleChange}
                    label="Age / उमेर"
                    type="text"
                  />
                  <InputField
                    name="fatherPhone"
                    value={form.fatherPhone}
                    onChange={handleChange}
                    label="Phone / फोन"
                    type="tel"
                  />
                  <InputField
                    name="fatherProfession"
                    value={form.fatherProfession}
                    onChange={handleChange}
                    label="Profession / पेशा"
                  />
                  <InputField
                    name="fatherAddress"
                    value={form.fatherAddress}
                    onChange={handleChange}
                    label="Address / ठेगाना"
                  />
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
                Financial Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="lastYearIncome"
                  value={form.lastYearIncome}
                  onChange={handleChange}
                  label="Last Year Income / गत वर्षको आम्दानी"
                  type="text"
                />
              </div>

              {/* Bank Details */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">
                  Bank Details / बैंक विवरणहरू
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputField
                    name="bankName"
                    value={form.bankName}
                    onChange={handleChange}
                    label="Bank Name / बैंकको नाम"
                  />
                  <InputField
                    name="bankAccountHolder"
                    value={form.bankAccountHolder}
                    onChange={handleChange}
                    label="Account Holder Name / खातावालाको नाम"
                  />
                  <InputField
                    name="bankAddress"
                    value={form.bankAddress}
                    onChange={handleChange}
                    label="Bank Address / बैंकको ठेगाना"
                  />
                </div>
              </div>
            </div>

            {/* Education & Language School */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
                Education & Language School
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="educationStatus"
                  value={form.educationStatus}
                  onChange={handleChange}
                  label="Education Status / शिक्षा स्थिति"
                  placeholder="e.g., N4 Preparing / N5 passout"
                />
                <InputField
                  name="languageSchoolName"
                  value={form.languageSchoolName}
                  onChange={handleChange}
                  label="Language School Name / भाषा स्कूलको नाम"
                />
                <InputField
                  name="languageSchoolJoiningDate"
                  value={form.languageSchoolJoiningDate}
                  onChange={handleChange}
                  label="Joining Date / भाषा विद्यालय भर्ना मिति (YYYY-MM-DD)"
                  type="text"
                  placeholder="YYYY-MM-DD"
                />
                <InputField
                  name="languageSchoolAddress"
                  value={form.languageSchoolAddress}
                  onChange={handleChange}
                  label="Language School Address / भाषा स्कूलको ठेगाना"
                />
              </div>

              {/* Plans */}
              <div className="mt-6">
                <label className="block mb-2 text-gray-700 font-medium">
                  Plans After Language School / भाषा स्कूल पछिको योजना
                </label>
                <textarea
                  name="plansAfterLanguageSchool"
                  value={form.plansAfterLanguageSchool}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Please describe your plans..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>
            </div>

            {/* Authorization */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-blue-500">
                Authorization
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  name="signedBy"
                  value={form.signedBy}
                  onChange={handleChange}
                  label="Signed By / हस्ताक्षर गरेको"
                />
                <InputField
                  name="signedDate"
                  value={form.signedDate}
                  onChange={handleChange}
                  label="Date / मिति (YYYY-MM-DD)"
                  type="text"
                  placeholder="YYYY-MM-DD"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center pt-8 border-t-2 border-gray-200">
              <button
                onClick={downloadPDF}
                disabled={loading}
                className={`px-8 py-3 font-semibold text-white rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                }`}
                aria-disabled={loading}
              >
                {loading ? '⏳ Generating PDF...' : '📥 Download PDF'}
              </button>
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">❌ {error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface InputFieldProps {
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  label: string;
  type?: string;
  error?: string;
  placeholder?: string;
}

function InputField({
  name,
  value,
  onChange,
  label,
  type = 'text',
  error,
  placeholder,
}: InputFieldProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-2 font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`px-4 py-2.5 border rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition ${
          error
            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
