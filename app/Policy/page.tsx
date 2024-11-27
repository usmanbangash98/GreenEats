import Link from "next/link";
import { ChefHat } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col">
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <ChefHat size={32} />
            GreenEats
          </Link>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-green-800">
          Privacy Policy
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            1. Information We Collect
          </h2>
          <p className="mb-4">
            We collect information you provide directly to us, such as when you
            create an account, submit a recipe, or contact us. This may include
            your name, email address, and any other information you choose to
            provide.
          </p>
          <p className="mb-4">
            We also automatically collect certain information about your device
            and how you interact with our app, including your IP address,
            browser type, and usage data.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            2. How We Use Your Information
          </h2>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-8 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>
              Send you technical notices, updates, security alerts, and support
              messages
            </li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Personalize and improve your experience</li>
            <li>
              Monitor and analyze trends, usage, and activities in connection
              with our services
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            3. Sharing of Information
          </h2>
          <p className="mb-4">
            We do not share your personal information with third parties except
            as described in this policy. We may share your information with:
          </p>
          <ul className="list-disc pl-8 mb-4">
            <li>Service providers who perform services on our behalf</li>
            <li>
              In response to a request for information if we believe disclosure
              is in accordance with, or required by, any applicable law or legal
              process
            </li>
            <li>
              If we believe your actions are inconsistent with our user
              agreements or policies, or to protect the rights, property, and
              safety of GreenEats or others
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            4. Data Security
          </h2>
          <p className="mb-4">
            We take reasonable measures to help protect information about you
            from loss, theft, misuse, unauthorized access, disclosure,
            alteration, and destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            5. Your Choices
          </h2>
          <p className="mb-4">
            You may update, correct, or delete your account information at any
            time by logging into your account or contacting us. You may also opt
            out of receiving promotional communications from us by following the
            instructions in those messages.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            6. Changes to this Policy
          </h2>
          <p className="mb-4">
            We may change this privacy policy from time to time. If we make
            changes, we will notify you by revising the date at the top of the
            policy and, in some cases, we may provide you with additional
            notice.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            7. Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions about this privacy policy, please contact
            us at{" "}
            <a
              href="mailto:privacy@greeneats.com"
              className="text-green-600 hover:underline">
              privacy@greeneats.com
            </a>
            .
          </p>
        </section>
      </main>

      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 GreenEats Recipe App. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-4">
            <Link href="/Policy" className="hover:text-green-200">
              Privacy Policy
            </Link>
            <Link href="/About" className="hover:text-green-200">
              About Us
            </Link>
            <Link href="/Terms" className="hover:text-green-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
