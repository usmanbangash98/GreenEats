import Link from "next/link";
import { ChefHat } from "lucide-react";

export default function TermsOfService() {
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
          Terms of Service
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By accessing or using the GreenEats recipe app, you agree to be
            bound by these Terms of Service. If you do not agree to all the
            terms and conditions, you must not use the app.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            2. User Responsibilities
          </h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to accept responsibility for all
            activities that occur under your account.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            3. Content
          </h2>
          <p className="mb-4">
            Users may submit recipes and other content to the app. By submitting
            content, you grant GreenEats a non-exclusive, royalty-free license
            to use, reproduce, and distribute that content.
          </p>
          <p className="mb-4">
            You agree not to submit any content that is illegal, offensive, or
            infringes on the rights of others.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            4. Intellectual Property
          </h2>
          <p className="mb-4">
            The GreenEats app and its original content, features, and
            functionality are owned by GreenEats and are protected by
            international copyright, trademark, patent, trade secret, and other
            intellectual property laws.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            5. Limitation of Liability
          </h2>
          <p className="mb-4">
            GreenEats shall not be liable for any indirect, incidental, special,
            consequential or punitive damages, including without limitation,
            loss of profits, data, use, goodwill, or other intangible losses,
            resulting from your access to or use of or inability to access or
            use the app.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            6. Changes to Terms
          </h2>
          <p className="mb-4">
            We reserve the right to modify or replace these Terms at any time.
            We will provide notice of any significant changes. Your continued
            use of the app after such modifications will constitute your
            acknowledgment of the modified Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            7. Contact Us
          </h2>
          <p className="mb-4">
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:support@greeneats.com"
              className="text-green-600 hover:underline">
              support@greeneats.com
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
