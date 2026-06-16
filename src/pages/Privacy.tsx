import LegalLayout, { Bullet } from "@/components/LegalLayout";

const Privacy = () => (
  <LegalLayout
    documentTitle="Privacy Policy — ADMSOC · Abu Dhabi Majlis Society"
    eyebrow="Privacy Policy"
    title={
      <>
        Privacy is not a feature.
        <br />
        <span className="italic text-gold">It is the foundation.</span>
      </>
    }
    updated="12 June 2026"
    intro={
      <p>
        The Abu Dhabi Majlis Society (&ldquo;ADMSOC&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is built on
        discretion. This Privacy Policy explains what personal data we collect through this website, why we
        collect it, and the rights you hold over it. We process personal data in accordance with UAE Federal
        Decree-Law No. 45 of 2021 on the Protection of Personal Data (the &ldquo;PDPL&rdquo;).
      </p>
    }
    sections={[
      {
        title: "Who We Are",
        body: (
          <>
            <p>
              The Abu Dhabi Majlis Society is a private, invite-only society of automotive owners, collectors
              and decision-makers based in Abu Dhabi, United Arab Emirates. For the purposes of the PDPL, ADMSOC
              acts as the controller of the personal data described in this Policy.
            </p>
            <p>
              For any matter relating to this Policy or your personal data, you may reach us directly through
              the contact details listed in the <a href="/#contact">Contact</a> section of this website.
            </p>
          </>
        ),
      },
      {
        title: "Data We Collect",
        body: (
          <>
            <p>We collect personal data only when you choose to provide it:</p>
            <ul>
              <Bullet>
                <strong>Membership enquiries</strong> — full name, email address, phone number, details of your
                vehicle or collection, and the name of the member who referred you (if any), submitted through
                the membership form.
              </Bullet>
              <Bullet>
                <strong>Vehicle ownership certificate</strong> — an image of the vehicle registration
                certificate you upload with your membership enquiry, which we retain to verify the ownership of
                the vehicle or collection you submit.
              </Bullet>
              <Bullet>
                <strong>Direct correspondence</strong> — information you share when contacting us by phone or
                WhatsApp using the details published on this site.
              </Bullet>
            </ul>
            <p>
              We do not collect personal data from visitors who simply browse this website, and we do not use
              analytics, advertising trackers or profiling of any kind.
            </p>
          </>
        ),
      },
      {
        title: "Why We Process It",
        body: (
          <>
            <p>Your personal data is processed for one purpose only:</p>
            <ul>
              <Bullet>
                To consider your membership enquiry and, where there is alignment, to contact you privately for
                an introduction.
              </Bullet>
            </ul>
            <p>
              The legal basis for this processing is your <strong>consent</strong>, given when you submit the
              membership form. We do not use your data for marketing, we do not sell it, and we do not share it
              with third parties for their own purposes.
            </p>
          </>
        ),
      },
      {
        title: "Cookies & Embedded Content",
        body: (
          <>
            <p>
              <strong>This website sets no cookies of its own</strong> and runs no analytics or advertising
              scripts. That is why you will not see a cookie banner here — there is nothing to consent to while
              you browse.
            </p>
            <p>
              The films featured on this site are hosted on YouTube. They are embedded in{" "}
              <strong>privacy-enhanced mode</strong> (youtube-nocookie.com) and{" "}
              <strong>nothing is loaded from YouTube until you choose to press play</strong>. From that moment,
              playback is governed by{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                Google&rsquo;s Privacy Policy
              </a>
              .
            </p>
            <p>
              Links to Instagram and WhatsApp lead to external platforms governed by their own privacy terms.
            </p>
          </>
        ),
      },
      {
        title: "Storage & Security",
        body: (
          <p>
            Membership enquiries are stored on secure, access-controlled infrastructure. Access is restricted to
            the principals of the society and is granted strictly on a need-to-know basis. We apply appropriate
            technical and organisational measures to protect your data against unauthorised access, alteration
            or loss.
          </p>
        ),
      },
      {
        title: "Retention",
        body: (
          <p>
            We retain membership enquiries only for as long as necessary to consider them. If your enquiry does
            not proceed, your data is deleted within twelve (12) months of submission, unless you ask us to
            remove it sooner or a longer period is required by applicable law.
          </p>
        ),
      },
      {
        title: "Your Rights",
        body: (
          <>
            <p>Under the PDPL, you have the right to:</p>
            <ul>
              <Bullet>Request access to the personal data we hold about you;</Bullet>
              <Bullet>Request correction of inaccurate or incomplete data;</Bullet>
              <Bullet>Request deletion of your data;</Bullet>
              <Bullet>Withdraw your consent at any time, without affecting prior processing;</Bullet>
              <Bullet>Object to, or request restriction of, the processing of your data;</Bullet>
              <Bullet>Lodge a complaint with the UAE Data Office.</Bullet>
            </ul>
            <p>
              To exercise any of these rights, contact us through the details in the{" "}
              <a href="/#contact">Contact</a> section. We will respond within the timeframes prescribed by the
              PDPL.
            </p>
          </>
        ),
      },
      {
        title: "Changes to This Policy",
        body: (
          <p>
            We may update this Policy from time to time. The date of the latest revision is shown at the top of
            this page. Material changes affecting how your data is processed will be communicated to you where
            required by law.
          </p>
        ),
      },
    ]}
  />
);

export default Privacy;
