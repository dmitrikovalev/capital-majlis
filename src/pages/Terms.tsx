import { Link } from "react-router-dom";
import LegalLayout, { Bullet } from "@/components/LegalLayout";

const Terms = () => (
  <LegalLayout
    documentTitle="Terms & Conditions — ADMSOC · Abu Dhabi Majlis Society"
    eyebrow="Terms & Conditions"
    title={
      <>
        The terms of the house.
        <br />
        <span className="italic text-gold">Read before entering.</span>
      </>
    }
    updated="12 June 2026"
    intro={
      <p>
        These Terms &amp; Conditions (the &ldquo;Terms&rdquo;) govern your use of this website, operated by the
        Abu Dhabi Majlis Society (&ldquo;ADMSOC&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By accessing this
        website or submitting a membership enquiry, you accept these Terms. If you do not agree with them,
        please do not use this website.
      </p>
    }
    sections={[
      {
        title: "The Society",
        body: (
          <p>
            ADMSOC is a private, invite-only society of automotive owners, collectors and decision-makers based
            in Abu Dhabi, United Arab Emirates. This website serves as a presentation of the society and a means
            of receiving membership and partnership enquiries. Nothing on this website constitutes an offer of
            membership, a commercial offer, or financial, legal or investment advice.
          </p>
        ),
      },
      {
        title: "Membership",
        body: (
          <>
            <p>
              Membership of the society is <strong>not applied for — it is considered</strong>. Accordingly:
            </p>
            <ul>
              <Bullet>
                Submitting an enquiry through this website does not create any entitlement to membership, nor
                any obligation on our part to respond or to state reasons for a decision;
              </Bullet>
              <Bullet>
                Admission is at the sole and absolute discretion of the society&rsquo;s principals;
              </Bullet>
              <Bullet>
                You warrant that all information you submit is accurate, complete and relates to you personally.
              </Bullet>
            </ul>
            <p>
              Personal data submitted with an enquiry is handled in accordance with our{" "}
              <Link to="/privacy">Privacy Policy</Link>.
            </p>
          </>
        ),
      },
      {
        title: "Intellectual Property",
        body: (
          <p>
            All content on this website — including text, photography, films, graphics, layout and the ADMSOC
            name and marks — is the property of ADMSOC or its licensors and is protected by applicable
            intellectual property laws. You may not reproduce, distribute or otherwise use any content from this
            website without our prior written consent, except for personal, non-commercial viewing.
          </p>
        ),
      },
      {
        title: "Third-Party Marks",
        body: (
          <p>
            References to automotive marques and other brands on this website — including, without limitation,
            Porsche, Ferrari, Lamborghini, Aston Martin, Mercedes-Benz and Brabus — together with their logos
            and trade marks, are the property of their respective owners. They appear solely to describe the
            vehicles and interests of the society&rsquo;s members.{" "}
            <strong>
              ADMSOC is not affiliated with, sponsored by, or endorsed by any of these brands
            </strong>
            , unless expressly stated otherwise.
          </p>
        ),
      },
      {
        title: "Media & Figures",
        body: (
          <p>
            Audience metrics, engagement rates, production volumes and similar figures presented on this website
            are indicative, may vary over time and are provided for general information only. They do not
            constitute a representation, warranty or commitment of any kind.
          </p>
        ),
      },
      {
        title: "Acceptable Use",
        body: (
          <>
            <p>When using this website, you agree not to:</p>
            <ul>
              <Bullet>Submit false, misleading or third-party information through our forms;</Bullet>
              <Bullet>
                Use automated means to scrape, harvest or extract data or content from this website;
              </Bullet>
              <Bullet>
                Interfere with the operation or security of this website, or use it in breach of UAE law,
                including Federal Decree-Law No. 34 of 2021 on Combatting Rumours and Cybercrimes.
              </Bullet>
            </ul>
          </>
        ),
      },
      {
        title: "External Links & Embedded Content",
        body: (
          <p>
            This website contains links to, and embedded content from, external platforms such as YouTube,
            Instagram and WhatsApp. These platforms are operated by third parties under their own terms and
            privacy policies, and we accept no responsibility for their content or practices.
          </p>
        ),
      },
      {
        title: "Limitation of Liability",
        body: (
          <p>
            This website is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the
            fullest extent permitted by applicable law, ADMSOC and its principals shall not be liable for any
            indirect, incidental or consequential loss arising out of or in connection with your use of, or
            inability to use, this website or any content on it. Nothing in these Terms excludes liability that
            cannot be excluded under UAE law.
          </p>
        ),
      },
      {
        title: "Changes to These Terms",
        body: (
          <p>
            We may revise these Terms at any time. The date of the latest revision is shown at the top of this
            page. Your continued use of this website after changes are published constitutes acceptance of the
            revised Terms.
          </p>
        ),
      },
      {
        title: "Governing Law & Jurisdiction",
        body: (
          <p>
            These Terms are governed by the federal laws of the United Arab Emirates and the laws of the Emirate
            of Abu Dhabi. Any dispute arising out of or in connection with these Terms or this website shall be
            subject to the exclusive jurisdiction of the courts of Abu Dhabi.
          </p>
        ),
      },
    ]}
  />
);

export default Terms;
