import { useState } from 'react';

export default function Contact({ about }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const emailTo = about?.email || 'agalyar717@gmail.com';
      const subject = encodeURIComponent(form.subject);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
      
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailTo}&su=${subject}&body=${body}`;
      
      window.open(gmailUrl, '_blank');
      
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Failed to open Gmail.');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 mb-24" id="contact">
      <div className="bg-gradient-to-br from-primary-container to-surface-container-lowest p-12 text-center neon-border-pink relative overflow-hidden group">
        {/* Carbon texture overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
        
        <h2 className="text-4xl md:text-6xl font-black font-headline mb-6 relative z-10 text-white">
          ESTABLISH<br />
          <span className="text-white neon-text-pink">CONNECTION?</span>
        </h2>
        
        <p className="text-lg mb-8 max-w-xl mx-auto relative z-10 text-on-primary-container font-body">
          Currently accepting new transmissions for collaborations.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
          <button 
            className="bg-white text-primary font-bold px-10 py-4 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 uppercase tracking-widest active:scale-95 text-sm font-label"
            onClick={() => setModalOpen(true)}
          >
            Send Signal
          </button>
          <div className="flex items-center justify-center gap-6 px-6">
            <a 
              className="material-symbols-outlined text-white hover:text-secondary transition-colors duration-300 text-3xl" 
              href={`mailto:${about?.email || 'agalyar717@gmail.com'}`}
            >
              alternate_email
            </a>
            <a 
              className="material-symbols-outlined text-white hover:text-secondary transition-colors duration-300 text-3xl" 
              href={about?.linkedin || 'https://www.linkedin.com/in/agalya-r-48600029a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app'}
              target="_blank"
              rel="noreferrer"
            >
              forum
            </a>
          </div>
        </div>
      </div>

      {/* Modal Contact Form */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-surface-container-low p-8 neon-border-pink shadow-[0_0_50px_rgba(255,45,120,0.3)] rounded">
            
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors duration-300 font-label text-xl"
              onClick={() => {
                setModalOpen(false);
                setStatus('idle');
              }}
            >
              ✕
            </button>

            {status === 'success' ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-primary text-6xl mb-4 animate-bounce">
                  check_circle
                </span>
                <h3 className="text-2xl font-bold font-headline mb-4 text-white">Transmission Successful</h3>
                <p className="text-on-surface-variant mb-6 font-body">
                  Gmail has been opened in a new tab with your pre-filled message. Please review and click "Send" to establish connection!
                </p>
                <button 
                  className="bg-primary text-on-primary font-bold px-8 py-3 hover:shadow-[0_0_16px_rgba(255,45,120,0.4)] transition-all duration-300 uppercase tracking-widest font-label text-xs"
                  onClick={() => {
                    setModalOpen(false);
                    setStatus('idle');
                  }}
                >
                  Close Terminal
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-label text-xs text-primary tracking-widest uppercase mb-2">
                    {`> INIT_CONTACT --secure`}
                  </h3>
                  <div className="h-0.5 w-full bg-gradient-to-r from-primary to-transparent mb-4"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-label text-on-surface-variant uppercase tracking-wider mb-2">
                      Name
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your alias"
                      className="w-full bg-background/50 border-b border-white/20 focus:border-primary text-white px-4 py-3 outline-none transition-all duration-300 font-body text-sm focus:shadow-[0_4px_12px_-4px_rgba(255,45,120,0.3)]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-label text-on-surface-variant uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@net.com"
                      className="w-full bg-background/50 border-b border-white/20 focus:border-primary text-white px-4 py-3 outline-none transition-all duration-300 font-body text-sm focus:shadow-[0_4px_12px_-4px_rgba(255,45,120,0.3)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-label text-on-surface-variant uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    name="subject" 
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project Inquiry / Hello"
                    className="w-full bg-background/50 border-b border-white/20 focus:border-primary text-white px-4 py-3 outline-none transition-all duration-300 font-body text-sm focus:shadow-[0_4px_12px_-4px_rgba(255,45,120,0.3)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-label text-on-surface-variant uppercase tracking-wider mb-2">
                    Message
                  </label>
                  <textarea 
                    name="message" 
                    value={form.message}
                    onChange={handleChange}
                    required
                    placeholder="Input transmission stream..."
                    rows={4}
                    className="w-full bg-background/50 border-b border-white/20 focus:border-primary text-white px-4 py-3 outline-none transition-all duration-300 font-body text-sm resize-none focus:shadow-[0_4px_12px_-4px_rgba(255,45,120,0.3)]"
                  />
                </div>

                {status === 'error' && (
                  <div className="text-xs font-label text-primary bg-primary/10 border border-primary/20 p-3 rounded">
                    ⚠ {errorMsg}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full bg-primary text-on-primary font-bold py-4 hover:shadow-[0_0_20px_rgba(255,45,120,0.6)] transition-all duration-300 uppercase tracking-widest font-label text-xs disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="animate-spin inline-block mr-2">⚙</span>
                      TRANSMITTING...
                    </>
                  ) : (
                    '📡 SEND TRANSMISSION'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
