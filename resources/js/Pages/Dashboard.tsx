import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard() {
    const stats = {
        patients: 1248,
        totalOutstanding: 284320,
        paidRate: 78,
        unpaidRate: 22,
    };

    const monthlyCollections = [42000, 46000, 51000, 54500, 58200, 61800];
    const sentHistory = [
        {
            id: 'MSG-1048',
            patient: 'Maria Santos',
            channel: 'SMS',
            category: 'Balance Reminder',
            sentAt: 'Today, 9:12 AM',
            status: 'Delivered',
        },
        {
            id: 'MSG-1047',
            patient: 'James Cole',
            channel: 'Email',
            category: 'Payment Confirmation',
            sentAt: 'Today, 8:41 AM',
            status: 'Sent',
        },
        {
            id: 'MSG-1046',
            patient: 'Ava Walker',
            channel: 'SMS',
            category: 'Follow-up Notice',
            sentAt: 'Yesterday, 6:25 PM',
            status: 'Delivered',
        },
        {
            id: 'MSG-1045',
            patient: 'Noah Brooks',
            channel: 'Email',
            category: 'Claim Update',
            sentAt: 'Yesterday, 4:08 PM',
            status: 'Queued',
        },
    ];

    const currency = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });

    const maxCollection = Math.max(...monthlyCollections);
    const minCollection = Math.min(...monthlyCollections);
    const collectionRange = maxCollection - minCollection || 1;
    const sparklinePoints = monthlyCollections
        .map((value, index) => {
            const x = (index / (monthlyCollections.length - 1)) * 100;
            const y = 46 - ((value - minCollection) / collectionRange) * 34;

            return `${x},${y}`;
        })
        .join(' ');

    const donutStyle = {
        background: `conic-gradient(#059669 0 ${stats.paidRate}%, #CBD5E1 ${stats.paidRate}% 100%)`,
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold leading-tight text-slate-900">
                        Dashboard
                    </h2>
                    <Link
                        href={route('import-data')}
                        className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700 transition hover:border-brand-200 hover:text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                    >
                        Go to Import Data
                    </Link>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                                Patients
                            </p>
                            <p className="mt-3 text-2xl font-semibold text-slate-900">
                                {stats.patients.toLocaleString()}
                            </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                                Total Outstanding
                            </p>
                            <p className="mt-3 text-2xl font-semibold text-slate-900">
                                {currency.format(stats.totalOutstanding)}
                            </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                                Paid
                            </p>
                            <p className="mt-3 text-2xl font-semibold text-brand-700">
                                {stats.paidRate}%
                            </p>
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                                Unpaid
                            </p>
                            <p className="mt-3 text-2xl font-semibold text-slate-700">
                                {stats.unpaidRate}%
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-100 px-6 py-5">
                                <h3 className="text-base font-semibold text-slate-900">
                                    Collections Trend
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Last 6 months performance snapshot.
                                </p>
                            </div>

                            <div className="px-6 py-6">
                                <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-4">
                                    <svg
                                        viewBox="0 0 100 50"
                                        className="h-36 w-full"
                                        preserveAspectRatio="none"
                                    >
                                        <polyline
                                            points={sparklinePoints}
                                            fill="none"
                                            stroke="#059669"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <polyline
                                            points={sparklinePoints}
                                            fill="none"
                                            stroke="#059669"
                                            strokeOpacity="0.15"
                                            strokeWidth="7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>

                                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                    {monthlyCollections.map((amount, index) => (
                                        <div
                                            key={index}
                                            className="rounded-md border border-slate-200 bg-white px-3 py-2"
                                        >
                                            <p className="text-xs uppercase tracking-widest text-slate-500">
                                                M{index + 1}
                                            </p>
                                            <p className="mt-1 text-sm font-semibold text-slate-900">
                                                {currency.format(amount)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-100 px-6 py-5">
                                <h3 className="text-base font-semibold text-slate-900">
                                    Payment Split
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Paid vs unpaid balances.
                                </p>
                            </div>

                            <div className="px-6 py-6">
                                <div className="flex items-center justify-center">
                                    <div
                                        className="relative h-36 w-36 rounded-full"
                                        style={donutStyle}
                                    >
                                        <div className="absolute inset-4 grid place-items-center rounded-full bg-white text-center">
                                            <p className="text-xs uppercase tracking-widest text-slate-500">
                                                Paid
                                            </p>
                                            <p className="text-xl font-semibold text-slate-900">
                                                {stats.paidRate}%
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 space-y-3">
                                    <p className="text-sm text-slate-600">
                                        Unpaid balance:{' '}
                                        <span className="font-semibold text-slate-900">
                                            {currency.format(
                                                stats.totalOutstanding *
                                                    (stats.unpaidRate / 100),
                                            )}
                                        </span>
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        Paid amount:{' '}
                                        <span className="font-semibold text-slate-900">
                                            {currency.format(
                                                stats.totalOutstanding *
                                                    (stats.paidRate / 100),
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm">
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                            <h3 className="text-base font-semibold text-slate-900">
                                Sent History
                            </h3>
                            <span className="text-xs uppercase tracking-widest text-slate-400">
                                Last 24 Hours
                            </span>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {sentHistory.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid gap-3 px-6 py-4 md:grid-cols-[1.4fr_1fr_1fr_0.8fr] md:items-center"
                                >
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">
                                            {item.patient}
                                        </p>
                                        <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                                            {item.id} - {item.channel}
                                        </p>
                                    </div>
                                    <p className="text-sm text-slate-600">
                                        {item.category}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {item.sentAt}
                                    </p>
                                    <div className="md:text-right">
                                        <span
                                            className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${
                                                item.status === 'Delivered'
                                                    ? 'bg-brand-50 text-brand-700'
                                                    : item.status === 'Sent'
                                                      ? 'bg-slate-100 text-slate-700'
                                                      : 'bg-slate-200 text-slate-700'
                                            }`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
