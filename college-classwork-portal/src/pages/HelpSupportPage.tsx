import React, { useState } from 'react';
import {
  HelpCircle,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileText,
  LifeBuoy,
  Send,
  CheckCircle2,
  Lock,
  Calendar,
  AlertCircle
} from 'lucide-react';

export const HelpSupportPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  const faqs = [
    {
      q: 'How does daily classwork updating work for teachers?',
      a: 'Teachers can navigate to their Teacher Dashboard or the Daily Classwork page and click "Upload Daily Classwork". They can choose the department, semester, and subject, enter the topic, write detailed lecture summaries, assign daily homework, attach PDF slides or Word notes, and paste YouTube educational video links. Posts appear immediately on all enrolled student dashboards.'
    },
    {
      q: 'How do students submit assignments and check marks?',
      a: 'Under the Assignments tab, students can see all pending assignments with live countdown timers. Click "Submit Work" on any assignment to upload ZIP archives, PDFs, DOCX, or code files. Once the teacher reviews the submission, the status transitions to "Checked" with awarded points and written instructor feedback.'
    },
    {
      q: 'What is the mandatory attendance threshold?',
      a: 'College academic regulations require a minimum of 75% attendance in each semester subject to be eligible to sit for final semester examinations. The portal provides students with an interactive attendance ring and instant warning alerts if attendance drops below 75%.'
    },
    {
      q: 'Can students access lecture notes and classwork offline?',
      a: 'Yes! All uploaded study materials and PDF lecture notes have one-click download buttons, as well as a "Download All" feature that packages materials by subject into a ZIP file for offline study.'
    },
    {
      q: 'How can an administrator add new courses, teachers, or students?',
      a: 'Administrators have access to the Admin Dashboard Console. From there, they can click "Add Student" or "Add Teacher" to provision new credentials, manage department curriculums, assign teachers to specific subjects, and monitor website audit activity logs.'
    }
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSent(true);
    setTimeout(() => {
      setTicketSubject('');
      setTicketMessage('');
      setTicketSent(false);
    }, 4000);
  };

  return (
    <div className="space-y-12 pb-16 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Help, Documentation & IT Support
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          User manuals, platform guidelines, frequently asked questions, and portal helpdesk
        </p>
      </div>

      {/* 2 Guides Cards: For Students and For Teachers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="p-3 w-fit rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Student User Guide</h3>
          <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
            <li>Check <strong>Today's Classwork</strong> daily to see homework and notes.</li>
            <li>Submit project files before the deadline timer expires.</li>
            <li>Use the <strong>PDF Previewer</strong> to read notes without leaving the portal.</li>
            <li>Monitor your <strong>Attendance percentage</strong> to stay above 75%.</li>
          </ul>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <div className="p-3 w-fit rounded-2xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Faculty Instructor Guide</h3>
          <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-2 list-disc pl-4 leading-relaxed">
            <li>Post classwork promptly after each lecture with attachments and YouTube links.</li>
            <li>Use <strong>Take Attendance</strong> for quick 1-click roster sync and CSV export.</li>
            <li>Evaluate student assignments with marks and constructive feedback.</li>
            <li>Publish urgent notices directly to the campus circular board.</li>
          </ul>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 transition hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Submit IT Ticket Form */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Submit a Technical Support Ticket
            </h3>
            <p className="text-xs text-slate-500">Experienced portal issues or need permission changes?</p>
          </div>
        </div>

        {ticketSent && (
          <div className="mb-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Support ticket created (Ticket #IT-2026-904). Our systems team will resolve it promptly.</span>
          </div>
        )}

        <form onSubmit={handleTicketSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Issue Category / Subject <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={ticketSubject}
              onChange={e => setTicketSubject(e.target.value)}
              required
              placeholder="e.g. Unable to submit PDF file in CS504 Assignment"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Issue Description & Error Details <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={ticketMessage}
              onChange={e => setTicketMessage(e.target.value)}
              rows={3}
              required
              placeholder="Provide exact details of what occurred..."
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm"
          >
            <Send className="w-4 h-4" />
            Open Support Ticket
          </button>
        </form>
      </div>
    </div>
  );
};
