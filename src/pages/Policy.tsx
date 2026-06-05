import { FileText, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Policy() {
  return (
    <div className="pt-10 pb-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <Link to="/" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium mb-6 inline-block">&larr; Back to Home</Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-cyan-950 rounded-xl border border-cyan-500/30">
              <FileText className="h-6 w-6 text-cyan-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">Terms & Refund Policy</h1>
          </div>
          <p className="text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-8 text-slate-300 bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-800">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-orange-400" />
              1. No Refund Policy
            </h2>
            <p className="mb-4">
              At ZimDev, we invest significant time and resources into setting up your hosting, registering domains, and beginning the design process immediately after payment is confirmed. Therefore, <strong>all purchases are final and non-refundable</strong>.
            </p>
            <p className="mb-4">
              Please review your selected package and business requirements carefully before proceeding with your payment. By making a payment, you acknowledge and agree to this strict no-refund policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Service Delivery</h2>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Development begins only after full payment is received and confirmed via EcoCash.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>You must provide all necessary business information, logos, and initial text content within 14 days of purchase.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0 mt-0.5" />
                <span>Estimated delivery times apply from the date we receive your complete content, not the date of purchase.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Hosting and Maintenance</h2>
            <p className="mb-4">
              All plans include 1 year of free hosting. After the first year, standard renewal rates will apply. We will notify you 30 days before your hosting expires. Failure to renew may result in your website being temporarily suspended or permanently deleted.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Revisions</h2>
            <p className="mb-4">
              We offer up to 2 rounds of minor revisions within the scope of the purchased plan before final launch. Any major structural changes or additional features outside the chosen plan's scope will be billed separately.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
