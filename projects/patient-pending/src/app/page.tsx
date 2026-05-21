import Link from 'next/link'
import {
  ClipboardList,
  Users,
  ArrowRight,
  CheckCircle2,
  Inbox,
  Kanban,
  Search,
  Bell,
  Shield,
  Clock,
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">PatientPending</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">Features</a>
            <a href="#how-it-works" className="text-sm text-gray-600 hover:text-gray-900">How it Works</a>
            <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-2">
              Sign in
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8 border border-blue-100">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Built for independent healthcare providers
        </div>
        <h1 className="max-w-3xl text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Modern patient intake for{' '}
          <span className="text-blue-600">independent practices</span>
        </h1>
        <p className="max-w-2xl text-xl text-gray-500 mb-10 leading-relaxed">
          Turn referrals and patient requests into organized workflows. Stop losing patients in your inbox — manage everything in one clean dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg shadow-blue-200"
          >
            Start for free <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-700 font-semibold px-8 py-4 rounded-xl text-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          >
            See a demo
          </Link>
        </div>
        <p className="mt-6 text-sm text-gray-400">No credit card required · Setup in 5 minutes</p>

        {/* Dashboard preview */}
        <div className="mt-16 w-full max-w-5xl mx-auto bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="ml-3 text-xs text-gray-400 font-mono">PatientPending Dashboard</span>
          </div>
          <div className="bg-white p-6 grid grid-cols-4 gap-4">
            {[
              { label: 'New Requests', value: '12', color: 'blue' },
              { label: 'Contacted', value: '8', color: 'yellow' },
              { label: 'Scheduled', value: '15', color: 'green' },
              { label: 'This Month', value: '47', color: 'purple' },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-4 border-t border-gray-100">
            <div className="flex gap-2">
              {['New', 'Contacted', 'Awaiting', 'Scheduled'].map((col) => (
                <div key={col} className="flex-1 bg-white rounded-lg p-3 border border-gray-200 min-h-32">
                  <p className="text-xs font-semibold text-gray-500 mb-2">{col}</p>
                  {col === 'New' && (
                    <div className="space-y-2">
                      {['Sarah M.', 'James K.'].map((name) => (
                        <div key={name} className="bg-blue-50 rounded-md p-2 text-xs text-blue-800 border border-blue-100">
                          {name}
                        </div>
                      ))}
                    </div>
                  )}
                  {col === 'Contacted' && (
                    <div className="space-y-2">
                      <div className="bg-yellow-50 rounded-md p-2 text-xs text-yellow-800 border border-yellow-100">
                        Maria R.
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-12 border-y border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-8">Built for practices like yours</p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 font-medium">
            {[
              'Physical Therapists',
              'Speech Pathologists',
              'Occupational Therapists',
              'Orthotics & Prosthetics',
              'Mobile Clinicians',
              'Independent Practices',
            ].map((type) => (
              <span key={type} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" /> {type}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to stay organized</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Purpose-built for small practices — not an EMR, not insurance software. Just clean patient workflow management.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Inbox,
                title: 'Intake Forms',
                description:
                  'Each provider gets a unique shareable intake link. Patients submit requests directly — no phone tag, no paper forms.',
                color: 'blue',
              },
              {
                icon: Users,
                title: 'Referral Management',
                description:
                  'Clinics and doctors submit referrals directly to your dashboard. Track urgency, status, and referring provider details.',
                color: 'indigo',
              },
              {
                icon: Kanban,
                title: 'Pipeline Board',
                description:
                  'Drag-and-drop Kanban view: New → Contacted → Awaiting → Scheduled → Completed. Always know where every patient stands.',
                color: 'violet',
              },
              {
                icon: Search,
                title: 'Search & Filter',
                description:
                  'Find any patient instantly. Filter by status, urgency, referral source, or service type.',
                color: 'cyan',
              },
              {
                icon: Bell,
                title: 'Instant Notifications',
                description:
                  'Get email notifications the moment a new intake request or referral comes in. Never miss a patient.',
                color: 'teal',
              },
              {
                icon: Shield,
                title: 'Secure & Private',
                description:
                  'Built with security from the ground up. Row-level isolation ensures each practice only sees their own patients.',
                color: 'green',
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md"
              >
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-5`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get running in minutes</h2>
            <p className="text-xl text-gray-500">No training required, no complex setup.</p>
          </div>
          <div className="space-y-12">
            {[
              {
                step: '01',
                title: 'Create your provider account',
                description:
                  'Sign up and set up your practice profile. You get a unique intake link instantly — share it on your website, in emails, or anywhere patients can find you.',
              },
              {
                step: '02',
                title: 'Receive requests and referrals',
                description:
                  "Patients fill out your intake form. Referring providers submit referrals directly. Every submission lands in your dashboard immediately — you'll get an email notification too.",
              },
              {
                step: '03',
                title: 'Work your queue',
                description:
                  'Use the Kanban pipeline to move patients through stages: contact them, schedule an appointment, mark them complete. Add internal notes at any stage.',
              },
              {
                step: '04',
                title: 'Track your performance',
                description:
                  'See monthly referral volume, conversion rates, and average response times. Spot bottlenecks and improve your intake process.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-8">
                <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg shadow-blue-200">
                  {item.step}
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-500 mb-12">Start free. Upgrade when you&apos;re ready.</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 text-left">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Starter</p>
              <p className="text-4xl font-bold text-gray-900 mb-1">Free</p>
              <p className="text-gray-500 text-sm mb-8">Forever. No credit card.</p>
              <ul className="space-y-3 mb-8">
                {['Up to 50 patients/month', 'Intake form link', 'Pipeline board', 'Email notifications', 'Notes'].map(
                  (feat) => (
                    <li key={feat} className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feat}
                    </li>
                  )
                )}
              </ul>
              <Link
                href="/signup"
                className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 rounded-xl"
              >
                Get started
              </Link>
            </div>
            <div className="bg-blue-600 rounded-2xl p-8 border border-blue-500 text-left relative">
              <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Popular
              </div>
              <p className="text-sm font-semibold text-blue-200 uppercase tracking-wide mb-2">Professional</p>
              <p className="text-4xl font-bold text-white mb-1">$49<span className="text-xl font-normal text-blue-200">/mo</span></p>
              <p className="text-blue-200 text-sm mb-8">Everything you need to grow.</p>
              <ul className="space-y-3 mb-8">
                {[
                  'Unlimited patients',
                  'Referral portal',
                  'Analytics dashboard',
                  'Priority support',
                  'Custom branding (soon)',
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-3 text-sm text-blue-100">
                    <CheckCircle2 className="w-4 h-4 text-blue-300 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block text-center bg-white hover:bg-blue-50 text-blue-600 font-semibold py-3 rounded-xl"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-blue-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to stop losing patients in your inbox?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join independent practices who manage their patient intake with PatientPending.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-blue-600 font-semibold px-10 py-4 rounded-xl text-lg shadow-lg"
          >
            Get started free <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-4 text-blue-200 text-sm">No credit card required</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
                  <ClipboardList className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold">PatientPending</span>
              </div>
              <p className="text-gray-400 text-sm max-w-xs">
                Lightweight intake and referral management for independent healthcare practices.
              </p>
            </div>
            <div className="flex gap-12 text-sm">
              <div>
                <p className="text-gray-300 font-medium mb-3">Product</p>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#features" className="hover:text-white">Features</a></li>
                  <li><a href="#how-it-works" className="hover:text-white">How it works</a></li>
                  <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                </ul>
              </div>
              <div>
                <p className="text-gray-300 font-medium mb-3">Account</p>
                <ul className="space-y-2 text-gray-400">
                  <li><Link href="/login" className="hover:text-white">Sign in</Link></li>
                  <li><Link href="/signup" className="hover:text-white">Sign up</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
            <p className="flex items-center justify-center gap-1">
              <Clock className="w-3 h-3" /> Built for the independent provider. Not for big hospital systems.
            </p>
            <p className="mt-2">&copy; {new Date().getFullYear()} PatientPending. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
