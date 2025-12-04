import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

interface SponsorData {
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

export async function POST(req: Request) {
  try {
    const data: SponsorData = await req.json();

    const required: (keyof SponsorData)[] = [
      'bankName',
      'accountHolderName',
      'accountNumber',
    ];
    for (const f of required) {
      if (!data[f]) {
        return NextResponse.json(
          { error: `Missing field: ${f}` },
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
    width: 8.27in;
    height: 11.69in;
  }

  body {
    font-family: Arial, sans-serif;
    padding: 8px;              /* slightly smaller padding */
    margin: 0;
    font-size: 12px;           /* reduced from 14px */
    line-height: 1.35;         /* tighter line spacing */
    width: 8.27in;
    height: 11.69in;
    overflow: hidden;
  }

  .header {
    text-align: center;
    margin-bottom: 6px;        /* reduced spacing */
    border-bottom: 2px solid #003d99;
    padding-bottom: 4px;
  }

  .header h1 {
    margin: 0;
    color: #003d99;
    font-size: 18px;           /* reduced from 22px */
  }

  .section {
    margin-bottom: 4px;        /* reduced spacing */
  }

  .section-title {
    background: #003d99;
    color: #fff;
    padding: 3px 5px;          /* slightly smaller padding */
    font-size: 13px;           /* reduced from 15px */
    margin-bottom: 4px;
    font-weight: bold;
  }

  .field-row {
    display: flex;
    margin-bottom: 2px;        /* tighter spacing */
    padding: 2px 0;
    border-bottom: 1px solid #e0e0e0;
    font-size: 12px;           /* reduced from 14px */
  }

  .field-label {
    width: 38%;
    font-weight: bold;
    color: #003d99;
    padding-right: 4px;        /* reduced padding */
    font-size: 12px;           /* reduced from 14px */
  }

  .field-value {
    width: 62%;
    background: #f9f9f9;
    padding: 2px 4px;          /* reduced padding */
    font-size: 12px;           /* reduced from 14px */
    word-break: break-word;
  }
</style>


      </head>
      <body>
        <div class="header">
          <h1>SPONSOR INQUIRY FORM / स्पोन्सर सोधपत्र</h1>
        </div>

        <div class="section">
          <div class="section-title">BANK DETAILS / बैंक विवरण</div>
          <div class="field-row"><div class="field-label">बैंकको नाम के हो? / Bank Name</div><div class="field-value">${
            data.bankName ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">बैंक म्यानेजरको नाम के हो? / Bank Manager Name</div><div class="field-value">${
            data.bankManagerName ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">बैंक खातावालाको नाम के हो? / Account Holder Name</div><div class="field-value">${
            data.accountHolderName ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">बैंकको ठेगाना के हो? / Bank Address</div><div class="field-value">${
            data.bankAddress ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">बैंक खाता नम्बर के हो? / Account Number</div><div class="field-value">${
            data.accountNumber ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">खाताको प्रकार के हो? / Account Type</div><div class="field-value">${
            data.accountType ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">खाता कहिले खोलिएको हो? / Account Opened Date</div><div class="field-value">${
            data.accountOpenedDate ?? ''
          }</div></div>
        </div>

        <div class="section">
          <div class="section-title">TRANSACTIONS / कारोबार</div>
          <div class="field-row"><div class="field-label">लकडाउनको बेला कारोबार भएको थियो कि थिएन? / Business during lockdown</div><div class="field-value">${
            data.lockdownBusiness ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">महिनाको कति जति रकम जम्मा तथा झिक्ने गर्नु हुन्छ? / Monthly deposit/withdraw amount</div><div class="field-value">${
            data.monthlyTxnAmount ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">अन्तिम कारोबार कहिले गर्नु भएको हो? / Last transaction date</div><div class="field-value">${
            data.lastTransactionDate ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">अन्तिम चेक कस्को नाममा काट्नु भएको थियो? / Last check issued to</div><div class="field-value">${
            data.lastCheckToName ?? ''
          }</div></div>
        </div>

        <div class="section">
          <div class="section-title">BALANCE & ACCOUNTS / बैलन्स र खाता</div>
          <div class="field-row"><div class="field-label">अरु बैंकमा पनि खाता छ कि छैन? / Other accounts exist?</div><div class="field-value">${
            data.otherAccounts ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">यदि अरु खाता भए किन यसैमा खाता खोल्नुभयो? / Why opened this account if other accounts exist</div><div class="field-value">${
            data.reasonOpenIfOther ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">हाल खातामा कति जति रकम छ? / Current balance</div><div class="field-value">${
            data.currentBalance ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">बैंक खातामा रहेको रकम कति हो? / Amount in bank account</div><div class="field-value">${
            data.amountInBank ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">कहिले ब्यालेन्स सर्टिफिकेट निकाल्नु भएको थियो? / Balance certificate date</div><div class="field-value">${
            data.balanceCertificateDate ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">ब्याज कति–कति महिनामा आउँछ र कति आउँछ? / Interest frequency and amount</div><div class="field-value">${
            data.interestFrequencyAndAmount ?? ''
          }</div></div>
        </div>

        <div class="section">
          <div class="section-title">AUTHORIZATION / अधिकार</div>
          <div class="field-row"><div class="field-label">स्पोन्सरको साइन कसले गरेको हो? / Sponsor signed by</div><div class="field-value">${
            data.sponsorSignedBy ?? ''
          }</div></div>
          <div class="field-row"><div class="field-label">कहिले र कुन मितिमा गरेको हो? / Sponsor signed date</div><div class="field-value">${
            data.sponsorSignedDate ?? ''
          }</div></div>
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
      margin: { top: 1, bottom: 1, left: 5, right: 5 },
      scale: 1,
    });
    await browser.close();

    const arrayBuffer = pdfBuffer.buffer.slice(
      pdfBuffer.byteOffset,
      pdfBuffer.byteOffset + pdfBuffer.byteLength
    );
    return new NextResponse(arrayBuffer as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="sponsor-form.pdf"',
      },
    });
  } catch (err) {
    console.error('Sponsor PDF Error:', err);
    return NextResponse.json(
      { error: 'Failed to generate sponsor PDF' },
      { status: 500 }
    );
  }
}
