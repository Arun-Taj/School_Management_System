import React from "react";

const TermsAndConditions = () => {
  return (
    <>
      <div className="p-6">
        <h1 className="font-bold text-3xl text-center pb-16">Terms of Service</h1>
        <label className="font-bold text-2xl pt-6">Welcome to Deskrocket</label>
        <p  className="pt-2 pb-6">
          Welcome to Deskrocket, a software-as-a-service (SaaS) platform
          designed to help schools manage their operations efficiently. By
          accessing or using our web application, you agree to comply with these
          terms and conditions. If you do not agree to these Terms, please do
          not use our services.
          <br /><br />
          The following terminology applies to these Terms and Conditions,
          Privacy Statement and Disclaimer Notice and any or all Agreements:
          “Client”, “You” and “Your” refers to you, the person accessing this
          website and accepting the Company’s terms and conditions. “The
          Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company.
          “Party”, “Parties”, or “Us”, refers to both the Client and ourselves,
          or either the Client or ourselves.
          
        </p>
        <label className="font-bold text-2xl">Eligibility</label>
        <p className="pb-6 pt-2">
          You must be authorized to represent your educational institution and
          have the legal capacity to enter into this agreement. The use of our
          platform is restricted to authorized representatives, school
          administrators, and staff, and it must be in compliance with
          applicable laws and regulations.
        </p>
        <label className="font-bold text-2xl">Account Registration</label>
        <p className=" pt-2 pb-6">
        Schools and their representatives must register for an account to access the platform. When
creating an account, you agree to provide accurate, complete, and up-to-date information. You
are responsible for maintaining the confidentiality of your login credentials and for all activities
that occur under your account.
        </p>
        <label className="font-bold text-2xl ">Use of the Service</label>
        <p className="pt-2 pb-6">
        The platform is intended to assist schools in managing administrative, academic, and
communication tasks. You agree to use the service for lawful purposes only and not to engage
in any activity that could harm the integrity or security of the platform, including but not limited
to:
        </p>
        <ul class="list-disc list-inside space-y-1 pl-8">
      <li>
        Uploading or sharing malicious software, viruses, or harmful content
      </li>
      <li>
        Engaging in activities that infringe on the intellectual property or privacy rights of others
      </li>
      <li>
        Misusing data, including personal information of students, staff, or other users
      </li>
      <li>
        Bypassing or attempting to bypass security features of the platform
      </li>
    </ul>

    <p class=" mt-6 pb-6">
      We reserve the right to suspend or terminate your access to the service if we detect any misuse.
    </p>

    <label className="font-bold text-2xl">User-Generated Content</label>
    <p className="pt-2 pb-6">You retain ownership of any data or content that you upload to the platform, such as student
records, reports, or documents ("User Content"). However, by uploading content, you grant
Deskrocket an exclusive, royalty-free license to use, store, and process this content for the
purpose of providing our services and improving our services in the future.
<br />
<br />
You are responsible for ensuring that any User Content complies with applicable laws, including
those related to student privacy.</p>

<label className="font-bold text-2xl">Data Security and Privacy</label>
    <p className="pt-2 pb-6">We prioritize the security of your data. However, you acknowledge that no system is entirely
secure, and we cannot guarantee absolute protection against unauthorized access. It is your
responsibility to protect login credentials and promptly report any security breaches.
</p>

<label className="font-bold text-2xl">Fees and Payment</label>
    <p className="pt-2 pb-6">You agree to pay all applicable fees according to our pricing plans. All fees are non-refundable
unless otherwise stated. We reserve the right to modify the pricing at any time, with reasonable
notice provided to you.
<br /><br />
Failure to pay any due fees may result in suspension or termination of your account.
</p>
<label className="font-bold text-2xl ">Suspension and Termination</label>
        <p className="pt-2 pb-6">
        We may suspend or terminate your account if:
        </p>
        <ul class="list-disc list-inside space-y-1 pl-8">
      <li>
      You violate any provisions of these Terms
      </li>
      <li>
      You engage in activities that could damage our platform or its users
      </li>
      <li>
      Non-payment of fees or misuse of services
      </li>
     
    </ul>

    <p class=" mt-6 pb-6">
    Upon termination, all rights to use the platform will cease, and any data associated with your
account may be deleted, subject to our data retention policy.
    </p>

    <label className="font-bold text-2xl">Intellectual Property</label>
    <p className="pt-2 pb-6">All intellectual property rights in the platform, including but not limited to software, logos,
trademarks, designs, and content (excluding User Content), are owned by Deskrocket or its
licensors. You agree not to reproduce, modify, or distribute any part of our platform without
explicit permission from us.
</p>

<label className="font-bold text-2xl">Limitation of Liability</label>
    <p className="pt-2 pb-6">To the maximum extent permitted by law, Deskrocket will not be liable for any indirect,
incidental, or consequential damages, including loss of profits, data, or business opportunities,
resulting from your use of or inability to use the platform. Our total liability under these Terms will
not exceed the amount you have paid to us for the use of the service in the last 3 months.
</p>

<label className="font-bold text-2xl">Indemnification</label>
    <p className="pt-2 pb-6">You agree to indemnify and hold Deskrocket harmless from any claims, damages, losses,
liabilities, and expenses arising from your use of the platform or violation of these Terms.
</p>
<label className="font-bold text-2xl">Amendments to Terms</label>
    <p className="pt-2 pb-6">We reserve the right to update or modify these Terms at any time. Any changes will be posted
on this page, and you will be notified via email or through the platform. Continued use of the
platform after any changes have been made constitutes acceptance of the revised Terms.
</p>


      </div>
    </>
  );
};

export default TermsAndConditions;
