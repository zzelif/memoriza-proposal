interface InquiryData {
  fullName: string;
  email: string;
  contactNumber: string;
  eventType: string;
  eventDate: string;
  venue: string;
  message: string;
}

export const ownerEmailTemplate = (data: InquiryData) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry - Memoriza Events</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 30px; background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); text-align: center;">
              <!-- Logo -->
              <img src="cid:logo" alt="Memoriza Events Management" style="height: 50px; width: auto; margin-bottom: 15px; display: inline-block;" />
              <h1 style="margin: 0; color: #F5C842; font-size: 28px; font-weight: 700; letter-spacing: 1px;">
                Memoriza Events Management
              </h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                New Client Inquiry Received
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.6;">
                A potential client has submitted an inquiry through your website. Here are the details:
              </p>

              <!-- Inquiry Details -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                <tr>
                  <td style="padding: 15px; background-color: #f9f9f9; border-left: 4px solid #F5C842;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Full Name
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0 12px; color: #333333; font-size: 16px; font-weight: 500;">
                          ${data.fullName}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Email Address
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0 12px;">
                          <a href="mailto:${data.email}" style="color: #F5C842; font-size: 16px; text-decoration: none; font-weight: 500;">
                            ${data.email}
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Contact Number
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0 12px;">
                          <a href="tel:${data.contactNumber}" style="color: #F5C842; font-size: 16px; text-decoration: none; font-weight: 500;">
                            ${data.contactNumber}
                          </a>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Event Type
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0 12px; color: #333333; font-size: 16px; font-weight: 500;">
                          ${data.eventType}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Requested Event Date
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0 12px; color: #333333; font-size: 16px; font-weight: 500;">
                          ${new Date(data.eventDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Requested Venue/Location
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0 12px; color: #333333; font-size: 16px; font-weight: 500;">
                          ${data.venue}
                        </td>
                      </tr>

                      ${data.message ? `
                      <tr>
                        <td style="padding: 8px 0; color: #666666; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                          Message/Special Requests
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; color: #333333; font-size: 15px; line-height: 1.6;">
                          ${data.message}
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <div style="margin: 30px 0; padding: 20px; background-color: #FFF9E6; border-radius: 8px; border: 1px solid #F5C842;">
                <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.6;">
                  <strong style="color: #333333;">⏰ Quick Action Required:</strong><br>
                  Please respond to this inquiry within 48 hours to maintain excellent client service standards.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f9f9f9; text-align: center; border-top: 3px solid #F5C842;">
              <p style="margin: 0 0 10px; color: #999999; font-size: 12px;">
                This email was automatically generated from your Memoriza Events website inquiry form.
              </p>
              <p style="margin: 0; color: #999999; font-size: 12px;">
                Memoriza Events Management • Premium Wedding & Event Coordination
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const clientEmailTemplate = (data: InquiryData) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - Memoriza Events</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f4f4f4;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header with Logo -->
          <tr>
            <td style="padding: 40px 30px; background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); text-align: center;">
              <!-- Logo -->
              <img src="cid:logo" alt="Memoriza Events Management" style="height: 50px; width: auto; margin-bottom: 15px; display: inline-block;" />
              <h1 style="margin: 0; color: #F5C842; font-size: 28px; font-weight: 700; letter-spacing: 1px;">
                Memoriza Events Management
              </h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                Premium Wedding & Event Coordination
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px; color: #333333; font-size: 24px; font-weight: 700;">
                Thank You for Your Inquiry!
              </h2>

              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.8;">
                Dear ${data.fullName.split(' ')[0]},
              </p>

              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.8;">
                Thank you for considering Memoriza Events Management for your special occasion. We are truly honored that you've reached out to us, and we're excited about the possibility of bringing your vision to life.
              </p>

              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.8;">
                We have received your inquiry for a <strong>${data.eventType}</strong> event scheduled for <strong>${new Date(data.eventDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>, and our team is already reviewing the details you've shared with us.
              </p>

              <!-- What's Next Box -->
              <div style="margin: 30px 0; padding: 25px; background: linear-gradient(135deg, #FFF9E6 0%, #FFFBF0 100%); border-radius: 12px; border-left: 4px solid #F5C842;">
                <h3 style="margin: 0 0 15px; color: #333333; font-size: 18px; font-weight: 700;">
                  📋 What Happens Next?
                </h3>
                <ul style="margin: 0; padding: 0 0 0 20px; color: #555555; font-size: 15px; line-height: 1.8;">
                  <li style="margin-bottom: 10px;">Our team will carefully review your event requirements</li>
                  <li style="margin-bottom: 10px;">We'll check availability for your preferred date and venue</li>
                  <li style="margin-bottom: 10px;">A dedicated event coordinator will reach out to you within <strong>48 hours</strong></li>
                  <li>You'll receive personalized recommendations tailored to your vision</li>
                </ul>
              </div>

              <!-- Inquiry Summary -->
              <div style="margin: 30px 0; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                <h3 style="margin: 0 0 15px; color: #333333; font-size: 16px; font-weight: 700;">
                  Your Inquiry Summary
                </h3>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px;">Event Type:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600; text-align: right;">${data.eventType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px;">Preferred Date:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600; text-align: right;">
                      ${new Date(data.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666666; font-size: 14px;">Location:</td>
                    <td style="padding: 8px 0; color: #333333; font-size: 14px; font-weight: 600; text-align: right;">${data.venue}</td>
                  </tr>
                </table>
              </div>

              <p style="margin: 0 0 20px; color: #333333; font-size: 16px; line-height: 1.8;">
                In the meantime, feel free to explore our portfolio and services on our website, or reach us directly at <a href="tel:+639123456789" style="color: #F5C842; text-decoration: none; font-weight: 600;">+63 912 345 6789</a> if you have any urgent questions.
              </p>

              <p style="margin: 0 0 10px; color: #333333; font-size: 16px; line-height: 1.8;">
                We look forward to creating unforgettable memories with you!
              </p>

              <p style="margin: 0; color: #333333; font-size: 16px; line-height: 1.8;">
                Warm regards,<br>
                <strong style="color: #F5C842;">The Memoriza Events Team</strong>
              </p>
            </td>
          </tr>

          <!-- Social Media / Footer -->
          <tr>
            <td style="padding: 30px; background-color: #000000; text-align: center;">
              <p style="margin: 0 0 15px; color: #F5C842; font-size: 16px; font-weight: 600;">
                Follow Us for Inspiration
              </p>
              <div style="margin: 0 0 20px;">
                <a href="https://facebook.com/memorizaevents" style="display: inline-block; margin: 0 10px; color: #F5C842; text-decoration: none; font-size: 14px;">Facebook</a>
                <span style="color: #666666;">•</span>
                <a href="https://instagram.com/memorizaevents" style="display: inline-block; margin: 0 10px; color: #F5C842; text-decoration: none; font-size: 14px;">Instagram</a>
              </div>
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.6;">
                Memoriza Events Management<br>
                inquiries@memoriza-events.com • +63 912 345 6789<br>
                Premium Wedding & Event Coordination
              </p>
              <p style="margin: 15px 0 0; color: #666666; font-size: 11px;">
                You're receiving this email because you submitted an inquiry through our website.<br>
                We respect your privacy and will never share your information.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
