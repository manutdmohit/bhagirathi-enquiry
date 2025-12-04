import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

interface StudentData {
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
  educationStatus: string;
  languageSchoolName: string;
  languageSchoolJoiningDate: string;
  languageSchoolAddress: string;
  familyMembersCount: string;
  plansAfterLanguageSchool: string;
  signedBy: string;
  signedDate: string;
}

export async function POST(req: Request) {
  try {
    const data: StudentData = await req.json();

    // Validation
    const requiredFields: (keyof StudentData)[] = [
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
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing field: ${field}` },
          { status: 400 }
        );
      }
    }

    const html = `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8"/>
        <style>
          * { box-sizing: border-box; }
          html { 
            width: 8.5in;
            height: 11in;
          }
          body { 
            font-family: Arial, sans-serif; 
            padding: 8px; 
            line-height: 1.35;
            background: white;
            color: #333;
            margin: 0;
            font-size: 13px;
            width: 8.5in;
            height: 11in;
            overflow: hidden;
          }
          .header {
            text-align: center;
            margin-bottom: 6px;
            border-bottom: 1px solid #003d99;
            padding-bottom: 4px;
          }
          .header h1 {
            margin: 0;
            font-size: 20px;
            color: #003d99;
          }
          .header p {
            margin: 2px 0;
            font-size: 14px;
            font-weight: bold;
          }
          .section {
            margin: 3px 0;
            page-break-inside: avoid;
          }
          .section-title {
            background: #003d99;
            color: white;
            padding: 2px 4px;
            font-weight: bold;
            font-size: 12px;
            margin-bottom: 3px;
            border-radius: 1px;
          }
          .field-row {
            display: flex;
            margin-bottom: 2px;
            padding: 1px 0;
            border-bottom: 0.5px solid #e0e0e0;
            font-size: 13px;
          }
          .field-label {
            font-weight: bold;
            width: 35%;
            color: #003d99;
            padding-right: 4px;
            font-size: 12px;
          }
          .field-value {
            width: 65%;
            word-wrap: break-word;
            background: #f9f9f9;
            padding: 1px 2px;
            font-size: 12px;
          }
          .two-col {
            display: flex;
            gap: 20px;
          }
          .col {
            flex: 1;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
          }
          th {
            background: #e8e8e8;
            padding: 6px;
            text-align: left;
            font-weight: bold;
            border: 1px solid #ccc;
          }
          td {
            padding: 6px;
            border: 1px solid #ccc;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>STUDENT ENQUIRY FORM</h1>
          <p>${data.college ?? 'FUTABA COLLEGE OF FOREIGN LANGUAGES'}</p>
        </div>

        <!-- STUDENT BASIC INFORMATION -->
        <div class="section">
          <div class="section-title">STUDENT BASIC INFORMATION / विद्यार्थीको मूल जानकारी</div>
          <div class="field-row">
            <div class="field-label">Student Name / विद्यार्थीको नाम</div>
            <div class="field-value">${data.name ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">School Fee / स्कुल शुल्क</div>
            <div class="field-value">${data.schoolFee ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Living Expenses / जीवन खर्च</div>
            <div class="field-value">${data.livingExpenses ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Date of Birth / जन्म मिति</div>
            <div class="field-value">${data.dob ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Contact Number / फोन नम्बर</div>
            <div class="field-value">${data.phone ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">No. of Family Members / परिवारका सदस्यहरूको संख्या</div>
            <div class="field-value">${data.familyMembersCount ?? ''}</div>
          </div>
        </div>

        <!-- ADDRESS INFORMATION -->
        <div class="section">
          <div class="section-title">ADDRESS INFORMATION / पतासम्बन्धी जानकारी</div>
          <div class="field-row">
            <div class="field-label">Permanent Address / स्थायी ठेगाना</div>
            <div class="field-value">${data.permanentAddress ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Current Address / हालको ठेगाना</div>
            <div class="field-value">${data.currentAddress ?? ''}</div>
          </div>
        </div>

        <!-- FAMILY INFORMATION -->
        <div class="section">
          <div class="section-title">FAMILY INFORMATION / पारिवारिक जानकारी</div>
          <div class="field-row">
            <div class="field-label">Father's Name / बुबाको नाम</div>
            <div class="field-value">${data.father ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Father's Age / बुबाको उमेर</div>
            <div class="field-value">${data.fatherAge ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Father's Phone / बुबाको फोन</div>
            <div class="field-value">${data.fatherPhone ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Father's Profession / बुबाको काम</div>
            <div class="field-value">${data.fatherProfession ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Father's Address / बुबाको ठेगाना</div>
            <div class="field-value">${data.fatherAddress ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Mother's Name / आमाको नाम</div>
            <div class="field-value">${data.mother ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Mother's Age / आमाको उमेर</div>
            <div class="field-value">${data.motherAge ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Mother's Profession / आमाको काम</div>
            <div class="field-value">${data.motherProfession ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Mother's Address / आमाको ठेगाना</div>
            <div class="field-value">${data.motherAddress ?? ''}</div>
          </div>
        </div>

        <!-- FINANCIAL INFORMATION -->
        <div class="section">
          <div class="section-title">FINANCIAL INFORMATION / आर्थिक जानकारी</div>
          <div class="field-row">
            <div class="field-label">Last Year Income / गत वर्षको आम्दानी</div>
            <div class="field-value">${data.lastYearIncome ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Bank Name / बैंकको नाम</div>
            <div class="field-value">${data.bankName ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Bank Account Holder / खातावालाको नाम</div>
            <div class="field-value">${data.bankAccountHolder ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Bank Address / बैंकको ठेगाना</div>
            <div class="field-value">${data.bankAddress ?? ''}</div>
          </div>
        </div>

        <!-- COLLEGE & EDUCATION INFORMATION -->
        <div class="section">
          <div class="section-title">COLLEGE & EDUCATION INFORMATION / कलेज र शिक्षा जानकारी</div>
          <div class="field-row">
            <div class="field-label">School Name / स्कुलको नाम</div>
            <div class="field-value">${data.college ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">College Year/Semester / कलेज चलिरहेको वर्ष</div>
            <div class="field-value">${data.collegeRunning ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Work Experience / काम गरेको अनुभव</div>
            <div class="field-value">${data.workExperience ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Education Status / शिक्षा स्थिति</div>
            <div class="field-value">${data.educationStatus ?? ''}</div>
          </div>
        </div>

        <!-- LANGUAGE SCHOOL INFORMATION -->
        <div class="section">
          <div class="section-title">LANGUAGE SCHOOL INFORMATION / भाषा स्कूल जानकारी</div>
          <div class="field-row">
            <div class="field-label">Language School Name / भाषा स्कूलको नाम</div>
            <div class="field-value">${data.languageSchoolName ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Joining Date / भाषा विद्यालय भर्ना मिति (YYYY-MM-DD)</div>
            <div class="field-value">${
              data.languageSchoolJoiningDate ?? ''
            }</div>
          </div>
          <div class="field-row">
            <div class="field-label">Language School Address / भाषा स्कूलको ठेगाना</div>
            <div class="field-value">${data.languageSchoolAddress ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Plans After Language School / भाषा स्कूल पछिको योजना</div>
            <div class="field-value">${
              data.plansAfterLanguageSchool ?? ''
            }</div>
          </div>
        </div>

        <!-- AUTHORIZATION -->
        <div class="section">
          <div class="section-title">AUTHORIZATION / अधिकार</div>
          <div class="field-row">
            <div class="field-label">Signed By / हस्ताक्षर गरेको</div>
            <div class="field-value">${data.signedBy ?? ''}</div>
          </div>
          <div class="field-row">
            <div class="field-label">Signed Date / हस्ताक्षर गरेको मिति</div>
            <div class="field-value">${data.signedDate ?? ''}</div>
          </div>
        </div>

      </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: 5, bottom: 5, left: 5, right: 5 },
      scale: 1,
    });
    await browser.close();

    // Convert the returned buffer / Uint8Array to a proper ArrayBuffer slice
    // so it satisfies the Fetch BodyInit typing used by NextResponse.
    const arrayBuffer = pdfBuffer.buffer.slice(
      pdfBuffer.byteOffset,
      pdfBuffer.byteOffset + pdfBuffer.byteLength
    );

    return new NextResponse(arrayBuffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="student-form.pdf"',
      },
    });
  } catch (err) {
    console.error('PDF Generation Error:', err);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
