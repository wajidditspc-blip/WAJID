import React, { useState } from 'react';
import { Modal } from './Modal';
import { FileText, Download, Printer, ZoomIn, ZoomOut, Check, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  fileName: string;
  fileSize: string;
  authorName?: string;
  date?: string;
  pdfUrl?: string;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  title,
  fileName,
  fileSize,
  authorName,
  date,
  pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages] = useState<number>(8);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const handleDownload = () => {
    setDownloaded(true);
    // Create simulated file download
    const element = document.createElement('a');
    const file = new Blob([`Simulated document content for ${title}`], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} subtitle={fileName} maxWidth="4xl">
      <div className="flex flex-col gap-4">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-semibold">{authorName ? `Uploaded by ${authorName}` : 'Document Preview'}</span>
            {date && <span>• {date}</span>}
            <span>• {fileSize}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom controls */}
            <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 px-2 py-1">
              <button
                onClick={() => setZoom(prev => Math.max(70, prev - 15))}
                className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-medium px-2 text-slate-700 dark:text-slate-300">{zoom}%</span>
              <button
                onClick={() => setZoom(prev => Math.min(150, prev + 15))}
                className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Page navigation */}
            <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 px-2 py-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-40"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-medium px-2 text-slate-700 dark:text-slate-300">
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-40"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Action buttons */}
            <button
              onClick={handlePrint}
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 transition"
              title="Print document"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownload}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition ${
                downloaded ? 'bg-emerald-600' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Downloaded
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" /> Download PDF
                </>
              )}
            </button>
          </div>
        </div>

        {/* PDF Reader Canvas Area */}
        <div className="bg-slate-200/70 dark:bg-slate-950 p-6 rounded-2xl flex justify-center min-h-[500px] overflow-auto">
          <div
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="w-full max-w-2xl bg-white text-slate-900 shadow-2xl rounded-lg p-10 min-h-[640px] flex flex-col justify-between transition-transform duration-200"
          >
            <div>
              {/* Document Header */}
              <div className="border-b-2 border-blue-800 pb-4 mb-6 flex items-start justify-between">
                <div>
                  <span className="text-[10px] tracking-wider uppercase font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded">
                    Apex Institute of Technology • Department of CSE
                  </span>
                  <h1 className="text-xl font-bold text-slate-900 mt-2">{title}</h1>
                  <p className="text-xs text-slate-500 mt-0.5">Academic Session 2026-2027 • B.Tech Semester V</p>
                </div>
                <div className="p-2.5 bg-blue-50 text-blue-700 rounded-xl">
                  <FileText className="w-7 h-7" />
                </div>
              </div>

              {/* Sample Content Pages */}
              <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-1">Lecture Overview & Key Concepts</h3>
                  <p>
                    This study material covers foundational concepts, theoretical analysis, architectural diagrams,
                    and practice problem sets. Students should review these notes before attempting assignments
                    and lab experiments.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">1. Theoretical Framework & Definitions</h4>
                  <p>
                    Relational storage engines utilize balanced multi-way trees (B-Trees and B+ Trees) to maintain sorted keys
                    with amortized logarithmic complexity O(log N) for search, sequential access, insertions, and deletions.
                    Unlike regular binary search trees, nodes have variable degree <span className="font-mono bg-slate-100 px-1 py-0.5 rounded">m</span> matching physical disk block sizes to minimize I/O operations.
                  </p>
                </div>

                <div className="p-3 bg-blue-50/50 rounded-lg border-l-4 border-blue-600">
                  <p className="font-semibold text-blue-900 text-[11px]">Core Lemma:</p>
                  <p className="text-slate-700 italic text-[11px]">
                    Every non-root node in a B-Tree of order m contains at least ceil(m/2) - 1 keys and at most m - 1 keys.
                    The height of a B-Tree containing N keys is bounded strictly by h &le; log_ceil(m/2) ((N+1)/2) + 1.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">2. Disk Block Allocation & Cache Management</h4>
                  <p>
                    In secondary storage, disk seek time dominates execution latency (5-10ms for mechanical disks vs 50-100 microseconds
                    for NVMe PCIe SSDs). Aligning index nodes to disk sector boundaries reduces page faults and accelerates
                    range scans significantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Document Footer */}
            <div className="border-t border-slate-200 pt-4 mt-8 flex items-center justify-between text-[11px] text-slate-400">
              <span>Apex Institute Classwork Repository • Confidential & For Internal Educational Use Only</span>
              <span>Page {currentPage} of {totalPages}</span>
            </div>
          </div>
        </div>

        {/* Fallback Direct Link */}
        <div className="text-center text-xs text-slate-500">
          Having trouble viewing?{' '}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1 hover:underline"
          >
            Open in new tab <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </Modal>
  );
};
