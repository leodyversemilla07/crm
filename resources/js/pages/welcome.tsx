import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Users,
    TrendingUp,
    MessageSquare,
    CheckSquare,
    Shield,
    BarChart3,
    Search,
    Bell
} from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="CustomerFlow - Transform Your Customer Relationships">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900">
                {/* Navigation Header */}
                <header className="w-full bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-700 to-emerald-700 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">CRM</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">CustomerFlow</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="px-6 py-2 bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-lg hover:from-green-800 hover:to-emerald-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 text-gray-700 hover:text-green-700 font-medium transition-colors duration-200 dark:text-gray-300 dark:hover:text-green-400"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-6 py-2 bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-lg hover:from-green-800 hover:to-emerald-800 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 py-20">
                        <div className="text-center">
                            <div className="inline-flex items-center px-4 py-2 bg-green-50 border border-green-200 rounded-full text-green-700 text-sm font-medium mb-8 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                Trusted by 10,000+ businesses worldwide
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                                Transform Your
                                <span className="bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent block">
                                    Customer Relationships
                                </span>
                            </h1>

                            <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                                The all-in-one CRM platform that helps you manage customers, track leads, close deals, and grow your business faster than ever before.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                                <Link
                                    href={route('register')}
                                    className="px-8 py-4 bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-lg hover:from-green-800 hover:to-emerald-800 transition-all duration-200 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 min-w-[200px]"
                                >
                                    Start Free Trial
                                </Link>
                                <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-green-600 hover:text-green-700 transition-all duration-200 font-semibold text-lg dark:border-gray-600 dark:text-gray-300 dark:hover:border-green-500 dark:hover:text-green-400 min-w-[200px]">
                                    Watch Demo
                                </button>
                            </div>

                            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                                <span>✓ No credit card required</span>
                                <span className="mx-4">•</span>
                                <span>✓ 14-day free trial</span>
                                <span className="mx-4">•</span>
                                <span>✓ Cancel anytime</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 bg-white/50 dark:bg-gray-800/50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Everything you need to grow your business
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                                Powerful features designed to streamline your sales process and boost customer relationships
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: Users,
                                    title: "Customer Management",
                                    description: "Store and manage comprehensive customer profiles, segment customers, and track lifecycle stages."
                                },
                                {
                                    icon: TrendingUp,
                                    title: "Lead & Deal Tracking",
                                    description: "Monitor sales opportunities, visualize deals in a pipeline, and forecast revenue with precision."
                                },
                                {
                                    icon: MessageSquare,
                                    title: "Interaction Logging",
                                    description: "Record calls, emails, meetings, and support tickets with detailed notes and outcomes."
                                },
                                {
                                    icon: CheckSquare,
                                    title: "Task Management",
                                    description: "Assign tasks, set reminders, and track completion status across your entire team."
                                },
                                {
                                    icon: Shield,
                                    title: "User Permissions",
                                    description: "Define roles, restrict access, and audit user actions for security and compliance."
                                },
                                {
                                    icon: BarChart3,
                                    title: "Reports & Analytics",
                                    description: "View real-time summaries, generate custom reports, and visualize data with powerful charts."
                                },
                                {
                                    icon: Search,
                                    title: "Smart Search",
                                    description: "Quickly locate records, apply advanced filters, and save searches for instant access."
                                },
                                {
                                    icon: Bell,
                                    title: "Notifications",
                                    description: "Get notified of upcoming tasks, deadlines, and important events across all channels."
                                }
                            ].map((feature, index) => {
                                const IconComponent = feature.icon;
                                return (
                                    <div key={index} className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                                        <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent className="w-10 h-10 text-green-700 dark:text-green-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 bg-gradient-to-r from-green-700 to-emerald-700">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-4 gap-8 text-center text-white">
                            {[
                                { number: "10,000+", label: "Active Users" },
                                { number: "1M+", label: "Deals Closed" },
                                { number: "99.9%", label: "Uptime" },
                                { number: "24/7", label: "Support" }
                            ].map((stat, index) => (
                                <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                                    <div className="text-4xl font-bold mb-2">{stat.number}</div>
                                    <div className="text-green-100">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-gray-50 dark:bg-gray-900">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Ready to transform your business?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Join thousands of businesses already using CustomerFlow to grow their revenue
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={route('register')}
                                className="px-8 py-4 bg-gradient-to-r from-green-700 to-emerald-700 text-white rounded-lg hover:from-green-800 hover:to-emerald-800 transition-all duration-200 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                            >
                                Start Your Free Trial
                            </Link>
                            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-green-600 hover:text-green-700 transition-all duration-200 font-semibold text-lg dark:border-gray-600 dark:text-gray-300 dark:hover:border-green-500 dark:hover:text-green-400">
                                Schedule Demo
                            </button>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center space-x-2 mb-4 md:mb-0">
                                <div className="w-8 h-8 bg-gradient-to-r from-green-700 to-emerald-700 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">CRM</span>
                                </div>
                                <span className="text-xl font-bold">CustomerFlow</span>
                            </div>
                            <div className="text-gray-400 text-sm">
                                © 2025 CustomerFlow. All rights reserved.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
