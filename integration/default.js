// eslint-disable-next-line import/no-extraneous-dependencies
import { Selector } from "testcafe";

// eslint-disable-next-line
fixture`Getting Started`.page`http://localhost:3000`;

const ButtonViewCertificateAnyway = Selector("#certificate-view-anyway");
const CertificateVerifyBlock = Selector("#certificate-verify-block");
const ButtonPrint = Selector("#btn-print");
const ButtonEmail = Selector("#btn-email");
const ButtonDownload = Selector("#btn-download");
const ButtonViewAnother = Selector("#btn-view-another");
const TabListTemplate = Selector("#template-tabs-list");
const BannerPrivacyFilter = Selector("#banner-privacy-filter");
const RenderedCertificate = Selector("#rendered-certificate");

test("Certificate viewer is rendered correctly ", async t => {
  // Uploads certificate via dropzone
  await t.setFilesToUpload("input[type=file]", [
    "./fixtures/DEFAULT_CERTIFICATE.json"
  ]);
  await t.click(ButtonViewCertificateAnyway);

  // Validates rendering of the certificate
  // Header items rendered
  await t
    .expect(CertificateVerifyBlock.textContent)
    .contains("Unknown Institution");
  await t.expect(ButtonPrint.visible).ok();
  await t.expect(ButtonEmail.visible).ok();
  await t.expect(ButtonDownload.visible).ok();
  await t.expect(ButtonViewAnother.visible).ok();

  // Certificate tabs rendered
  await t.expect(TabListTemplate.textContent).contains("Certificate");

  // Privacy filter notice rendered
  await t.expect(BannerPrivacyFilter.visible).ok();
  await t
    .expect(BannerPrivacyFilter.textContent)
    .contains("OpenCerts Privacy Filter Enabled");

  // Certificate rendered
  await t.expect(RenderedCertificate.visible).ok();
  await t
    .expect(RenderedCertificate.textContent)
    .contains("Sample Certificate");
  await t
    .expect(RenderedCertificate.textContent)
    .contains("A_SAMPLE_CERTIFICATE");
  await t.expect(RenderedCertificate.textContent).contains("Issuer Info");
  await t.expect(RenderedCertificate.textContent).contains("Transcript");
});