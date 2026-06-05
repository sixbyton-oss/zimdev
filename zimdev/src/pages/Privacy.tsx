import { Shield, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Privacy() {
  return (
    <div className="pt-10 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <Link to="/" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-6 inline-block">&larr; Back to Home</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-cyan-950 rounded-xl border border-cyan-500/30">
              <Shield className="h-6 w-6 text-cyan-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
          </div>
          <p className="text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8 text-slate-300 bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="h-6 w-6 text-cyan-400" />
              1. Information We Collect
            </h2>
            <p className="mb-4">
              When you purchase a package from ZimDev or contact us, we may collect the following information:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Your Name and Business Name</li>
              <li>Contact information (Email address, WhatsApp/Phone number)</li>
              <li>EcoCash Sender Name and Approval Codes (for payment verification)</li>
              <li>Business details necessary for building your website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use your information exclusively to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
              <li>Process and verify your payments</li>
              <li>Communicate with you regarding your website development</li>
              <li>Register your domain name (if applicable)</li>
              <li>Provide customer support</li>
              <li>Notify you of hosting renewals</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
            <p className="mb-4">
              We take the security of your personal information seriously. Payment verifications are handled securely, and we do not store full payment details on our servers. Your contact information is kept strictly confidential and is only accessible by ZimDev staff who need it to fulfill your order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Sharing of Information</h2>
            <p className="mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share necessary details only with trusted service providers (such as domain registrars) solely for the purpose of setting up your online presence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              <strong className="text-cyan-400">Email:</strong> help@zimdev.online
              <br />
              <strong className="text-cyan-400">WhatsApp:</strong> +263 78 644 3311
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
