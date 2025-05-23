const getTransactionalTemplate = (
  preheader: string,
  subject: string,
  body: string
) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <!--<![endif]-->
      <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      <!--[if (gte mso 9)|(IE)]>
  <style type="text/css">
    body {width: 600px;margin: 0 auto;}
    table {border-collapse: collapse;}
    table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
    img {-ms-interpolation-mode: bicubic;}
  </style>
<![endif]-->
      <style type="text/css">
    body, p, div {
      font-family: helvetica,sans-serif;
      font-size: 16px;
    }
    body {
      color: #4B5767;
    }
    body a {
      color: #CE312C;
      text-decoration: none;
    }
    p { margin: 0; padding: 0; }
    table.wrapper {
      width:100% !important;
      table-layout: fixed;
      -webkit-font-smoothing: antialiased;
      -webkit-text-size-adjust: 100%;
      -moz-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    img.max-width {
      max-width: 100% !important;
    }
    .column.of-2 {
      width: 50%;
    }
    .column.of-3 {
      width: 33.333%;
    }
    .column.of-4 {
      width: 25%;
    }
    ul ul ul ul  {
      list-style-type: disc !important;
    }
    ol ol {
      list-style-type: lower-roman !important;
    }
    ol ol ol {
      list-style-type: lower-latin !important;
    }
    ol ol ol ol {
      list-style-type: decimal !important;
    }
    .fp-email-body p + p {
      margin-top: 20px;
    }
    @media screen and (max-width:480px) {
      .preheader .rightColumnContent,
      .footer .rightColumnContent {
        text-align: left !important;
      }
      .preheader .rightColumnContent div,
      .preheader .rightColumnContent span,
      .footer .rightColumnContent div,
      .footer .rightColumnContent span {
        text-align: left !important;
      }
      .preheader .rightColumnContent,
      .preheader .leftColumnContent {
        font-size: 80% !important;
        padding: 5px 0;
      }
      table.wrapper-mobile {
        width: 100% !important;
        table-layout: fixed;
      }
      img.max-width {
        height: auto !important;
        max-width: 100% !important;
      }
      a.bulletproof-button {
        display: block !important;
        width: auto !important;
        font-size: 80%;
        padding-left: 0 !important;
        padding-right: 0 !important;
      }
      .columns {
        width: 100% !important;
      }
      .column {
        display: block !important;
        width: 100% !important;
        padding-left: 0 !important;
        padding-right: 0 !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
      .social-icon-column {
        display: inline-block !important;
      }
      .fp-email-body p + p {
        margin-top: 10px;
      }
    }
  </style>
      <!--user entered Head Start-->

     <!--End Head user entered-->
    </head>
    <body>
      <center class="wrapper" data-link-color="#CE312C" data-body-style="font-size:16px; font-family:helvetica,sans-serif; color:#4B5767; background-color:#e1e1e1;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#e1e1e1">
            <tr>
              <td valign="top" bgcolor="#e1e1e1" width="100%">
                <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td width="100%">
                      <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td>
                            <!--[if mso]>
    <center>
    <table><tr><td width="600">
  <![endif]-->
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                      <tr>
                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#4B5767; text-align:left;" bgcolor="#f2f2f2" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    <tr>
      <td role="module-content">
        <p>${preheader}</p>
      </td>
    </tr>
  </table>

  <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="aQTmVGoZvs6GLJLWsiastG">
    <tbody>
      <tr>
        <td style="padding:0px 0px 40px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody>
  </table>

  <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="4UqFsRLozLcypAAv4CeoFS">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:5px 0px 5px 0px;" valign="top" align="center"><a href="https://4-playersofcolorado.org"><img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:25% !important; width:25%; height:auto !important;" src="http://cdn.mcauto-images-production.sendgrid.net/9cd152eb5e014511/af5d1283-dbb2-4e39-9375-9bd77a8d8055/800x800.png" alt="4-Players of Colorado logo" width="150" data-responsive="true" data-proportionally-constrained="false"></a></td>
      </tr>
    </tbody>
  </table>
  
  <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="9933f5b0-3e32-44bb-a74a-2791ed80ea0c" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:18px 0px 18px 0px; line-height:40px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 36px"><strong>4-Players of Colorado</strong></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table>
  
  <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8VquPM2ZMj7RJRhAUE6wmF" data-mc-module-version="2019-10-22">
      <tbody><tr>
        <td style="background-color:#ffffff; padding:15px 40px 10px 40px; line-height:30px; text-align:inherit;" height="100%" valign="top" bgcolor="#ffffff">
          <div>
            <div style="font-family: inherit; text-align: center">
              <span style="color: #516775; font-size: 28px; font-family: helvetica,sans-serif">
                <strong>${subject}</strong>
              </span>
            </div>
            <div></div>
          </div>
        </td>
      </tr>
    </tbody></table>
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="keQHYG1b1ztewxwhDtuCpS" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="background-color:#ffffff; padding:30px 40px 30px 40px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="#ffffff">
            <div class="fp-email-body">
              ${body}
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="aQTmVGoZvs6GLJLWsiastG">
      <tbody><tr>
        <td style="padding:0px 0px 40px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody></table>

    <table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="08e3f4bc-f1bb-4211-995d-b57e2bf9ce45.1">
      <tbody>
        <tr>
          <td align="center" bgcolor="" class="outer-td" style="padding:10px 0px 10px 0px;">
            <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
              <tbody>
                <tr>
                <td align="center" bgcolor="#CE312C" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                  <a href="https://4-playersofcolorado.org" style="background-color:#CE312C; border:1px solid #CE312C; border-color:#CE312C; border-radius:0px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:6px 9px 6px 9px; text-align:center; text-decoration:none; border-style:solid;" target="_blank">Visit Public Site</a>
                </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table><table border="0" cellpadding="0" cellspacing="0" class="module" data-role="module-button" data-type="button" role="module" style="table-layout:fixed;" width="100%" data-muid="08e3f4bc-f1bb-4211-995d-b57e2bf9ce45.1.1">
      <tbody>
        <tr>
          <td align="center" bgcolor="" class="outer-td" style="padding:0px 0px 0px 0px;">
            <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
              <tbody>
                <tr>
                <td align="center" bgcolor="#CE312C" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;">
                  <a href="https://members.4-playersofcolorado.org" style="background-color:#CE312C; border:1px solid #CE312C; border-color:#CE312C; border-radius:0px; border-width:1px; color:#ffffff; display:inline-block; font-size:14px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:6px 9px 6px 9px; text-align:center; text-decoration:none; border-style:solid;" target="_blank">Visit Members Site</a>
                </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    
    <table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="aQTmVGoZvs6GLJLWsiastG">
      <tbody><tr>
        <td style="padding:0px 0px 40px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody></table><table class="module" role="module" data-type="social" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7c8774ac-1807-440e-ad08-f33c228c1d7f">
    <tbody>
      <tr>
        <td valign="top" style="padding:0px 0px 0px 0px; font-size:6px; line-height:10px; background-color:#F2F2F2;" align="center">
          <table align="center" style="-webkit-margin-start:auto;-webkit-margin-end:auto;">
            <tbody><tr align="center"><td style="padding: 0px 5px;" class="social-icon-column">
      <a role="social-icon-link" href="https://www.facebook.com/groups/4playersofcolorado" target="_blank" alt="Facebook" title="Facebook" style="display:inline-block; background-color:#516775; height:30px; width:30px; border-radius:30px; -webkit-border-radius:30px; -moz-border-radius:30px;">
        <img role="social-icon" alt="Facebook" title="Facebook" src="https://mc.sendgrid.com/assets/social/white/facebook.png" style="height:30px; width:30px;" height="30" width="30">
      </a>
    </td><td style="padding: 0px 5px;" class="social-icon-column">
      <a role="social-icon-link" href="https://twitter.com/4playersco" target="_blank" alt="Twitter" title="Twitter" style="display:inline-block; background-color:#516775; height:30px; width:30px; border-radius:30px; -webkit-border-radius:30px; -moz-border-radius:30px;">
        <img role="social-icon" alt="Twitter" title="Twitter" src="https://mc.sendgrid.com/assets/social/white/twitter.png" style="height:30px; width:30px;" height="30" width="30">
      </a>
    </td><td style="padding: 0px 5px;" class="social-icon-column">
      <a role="social-icon-link" href="https://www.instagram.com/4playersco" target="_blank" alt="Instagram" title="Instagram" style="display:inline-block; background-color:#516775; height:30px; width:30px; border-radius:30px; -webkit-border-radius:30px; -moz-border-radius:30px;">
        <img role="social-icon" alt="Instagram" title="Instagram" src="https://mc.sendgrid.com/assets/social/white/instagram.png" style="height:30px; width:30px;" height="30" width="30">
      </a>
    </td></tr></tbody>
          </table>
        </td>
      </tr>
    </tbody>

    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c7b92bfc-8015-4512-b2f7-ef2ea124f35d">
    <tbody>
      <tr>
        <td style="padding:18px 0px 18px 0px; line-height:14px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 12px">4-Players of Colorado</span></div>
        <div style="font-family: inherit; text-align: center"><span style="font-size: 12px">PO Box 300442, Denver, CO 80203</span></div>
        <div style="font-family: inherit; text-align: center"><br></div>
        <div style="font-family: inherit; text-align: center"><a href="https://members.4-playersofcolorado.org/settings/notifications"><span style="font-size: 12px">Update notifications preferences</span></a></div><div></div></div></td>
      </tr>
    </tbody>
  </table>

  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="eAq5DwvRYWV4D7T3oBCXhH">
      <tbody><tr>
        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody></table></td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                            </center>
                            <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </div>
      </center>
    </body>
  </html>
`;

export default getTransactionalTemplate;
