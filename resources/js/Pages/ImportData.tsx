import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from 'react';

export default function ImportData() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [notice, setNotice] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const isValidFile = (file: File): boolean => {
        return /\.(csv|xls|xlsx)$/i.test(file.name);
    };

    const setFile = (file: File | null): void => {
        setNotice(null);

        if (!file) {
            setSelectedFile(null);
            return;
        }

        if (!isValidFile(file)) {
            setSelectedFile(null);
            setError('Only CSV, XLS, and XLSX files are allowed.');
            return;
        }

        setError(null);
        setSelectedFile(file);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setFile(event.target.files?.[0] ?? null);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        setDragActive(false);
        setFile(event.dataTransfer.files?.[0] ?? null);
    };

    const handleImport = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!selectedFile) {
            setError('Please choose a file before importing.');
            return;
        }

        setError(null);
        setNotice('Import UI is ready. Backend import processing can be wired next.');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-slate-900">
                    Import Data
                </h2>
            }
        >
            <Head title="Import Data" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                        <form
                            onSubmit={handleImport}
                            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                        >
                            <div className="border-b border-slate-100 px-6 py-5">
                                <h3 className="text-base font-semibold text-slate-900">
                                    Upload Spreadsheet
                                </h3>
                                <p className="mt-1 text-sm text-slate-500">
                                    Import one file at a time. Supported format:
                                    CSV, XLS, XLSX.
                                </p>
                            </div>

                            <div className="p-6">
                                <div
                                    onDragEnter={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        setDragActive(true);
                                    }}
                                    onDragOver={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        setDragActive(true);
                                    }}
                                    onDragLeave={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        setDragActive(false);
                                    }}
                                    onDrop={handleDrop}
                                    className={`rounded-lg border border-dashed px-6 py-10 text-center transition ${
                                        dragActive
                                            ? 'border-brand-500 bg-brand-50/40'
                                            : 'border-slate-300 bg-slate-50'
                                    }`}
                                >
                                    <p className="text-sm font-medium text-slate-700">
                                        Drag and drop your file here
                                    </p>
                                    <p className="mt-1 text-xs text-slate-500">
                                        or
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => inputRef.current?.click()}
                                        className="mt-3 inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-slate-700 transition hover:border-brand-200 hover:text-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
                                    >
                                        Browse File
                                    </button>
                                    <input
                                        ref={inputRef}
                                        type="file"
                                        accept=".csv,.xls,.xlsx"
                                        className="hidden"
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                                        Selected File
                                    </p>
                                    <p className="mt-1 text-sm text-slate-700">
                                        {selectedFile
                                            ? selectedFile.name
                                            : 'No file selected.'}
                                    </p>
                                </div>

                                {error && (
                                    <p className="mt-3 text-sm text-slate-700">
                                        {error}
                                    </p>
                                )}

                                {notice && (
                                    <p className="mt-3 text-sm text-brand-700">
                                        {notice}
                                    </p>
                                )}

                                <div className="mt-6 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={!selectedFile}
                                        className="inline-flex items-center rounded-md bg-brand-600 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Import File
                                    </button>
                                </div>
                            </div>
                        </form>

                        <aside className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                            <div className="border-b border-slate-100 px-6 py-5">
                                <h3 className="text-base font-semibold text-slate-900">
                                    Import Notes
                                </h3>
                            </div>
                            <div className="space-y-4 px-6 py-5 text-sm text-slate-600">
                                <p>
                                    Keep column headers consistent with your
                                    template before importing.
                                </p>
                                <p>
                                    For large imports, start with a small sample
                                    file to verify formatting.
                                </p>
                                <p>
                                    Backend processing and history tracking can
                                    be connected in the next step.
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

