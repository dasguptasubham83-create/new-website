
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { PROJECTS, STATS, EXPERIENCE, SKILLS } from './constants';
import { Crosshair, EditorialMark, DecorativeCircle } from './components/Decoration';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Linkedin, MessageCircle, ArrowUp, Send, X, ExternalLink, Settings, Sun, Moon, Type, Plus, Minus } from 'lucide-react';

const CustomizationPanel = ({ 
  isDark, 
  setIsDark, 
  fontSize, 
  setFontSize 
}: { 
  isDark: boolean; 
  setIsDark: (v: boolean) => void; 
  fontSize: number; 
  setFontSize: (v: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-[#F4B63A] transition-colors flex items-center gap-2"
      >
        <Settings size={14} />
        Settings
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 top-full mt-4 w-72 bg-white dark:bg-[#1A1A1A] p-8 rounded-[32px] shadow-2xl border border-black/5 dark:border-white/5 z-[100] origin-top-right"
          >
            <div className="space-y-8">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-4">Appearance</p>
                <button 
                  onClick={() => setIsDark(!isDark)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F5F3EE] dark:bg-white/5 transition-colors"
                >
                  <span className="text-xs font-bold text-black dark:text-white">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
                  {isDark ? <Moon size={16} className="text-white" /> : <Sun size={16} className="text-black" />}
                </button>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mb-4 text-black dark:text-white">Font Size</p>
                <div className="flex items-center justify-between p-2 rounded-xl bg-[#F5F3EE] dark:bg-white/5">
                  <button 
                    onClick={() => setFontSize(Math.max(0.5, fontSize - 0.1))}
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors text-black dark:text-white"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-xs font-bold text-black dark:text-white">{Math.round(fontSize * 100)}%</span>
                  <button 
                    onClick={() => setFontSize(Math.min(2.0, fontSize + 0.1))}
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors text-black dark:text-white"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/5">
                <p className="text-[8px] uppercase tracking-widest font-bold opacity-30 text-center text-black dark:text-white">Customized for SDG</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-[#F4B63A] rounded-full pointer-events-none z-[9999] hidden md:flex items-center justify-center"
      animate={{
        x: position.x - 16,
        y: position.y - 16,
        scale: isPointer ? 1.5 : 1,
        backgroundColor: isPointer ? 'rgba(244, 182, 58, 0.1)' : 'transparent',
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
    >
      <div className="w-1 h-1 bg-[#F4B63A] rounded-full" />
    </motion.div>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-32 right-8 w-12 h-12 bg-[#0E0E0E] text-[#F4B63A] rounded-full flex items-center justify-center shadow-2xl z-50 hover:bg-[#F4B63A] hover:text-[#0E0E0E] transition-all"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const WhatsAppPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="fixed bottom-8 left-8 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20, x: -20 }}
            className="absolute bottom-20 left-0 w-72 bg-white rounded-2xl shadow-2xl overflow-hidden border border-black/5"
          >
            <div className="bg-[#25D366] p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white overflow-hidden flex items-center justify-center">
                  <img src="https://i.ibb.co/jZ5nBXgM/download.jpg" alt="WhatsApp" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className="font-bold text-sm">WhatsApp Chat</p>
                  <p className="text-[10px] opacity-80">Typically replies in minutes</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>
            <div className="p-4 bg-[#F5F3EE]/50">
              <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm text-xs leading-relaxed mb-4">
                Hi there! 👋 How can I help you with your design or finance project today?
              </div>
              <a 
                href="https://wa.me/qr/RJNIQN7O53PDE1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
              >
                Start Chat
                <Send size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-2xl relative overflow-hidden border-2 border-[#25D366]"
      >
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <img 
          src="https://i.ibb.co/jZ5nBXgM/download.jpg" 
          alt="WhatsApp" 
          className="w-full h-full object-cover scale-110" 
          referrerPolicy="no-referrer" 
        />
      </motion.button>
    </div>
  );
};

const FloatingSocials = () => (
  <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6">
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
      className="flex flex-col gap-4 items-center"
    >
      <div className="w-px h-20 bg-black/10" />
      <a href="https://in.linkedin.com/in/subhamdasgupta1" target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-[#0077B5] transition-all hover:-translate-y-1">
        <Linkedin size={20} />
      </a>
      <a href="https://wa.me/qr/RJNIQN7O53PDE1" target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-[#25D366] transition-all hover:-translate-y-1">
        <MessageCircle size={20} />
      </a>
      <div className="w-px h-20 bg-black/10" />
    </motion.div>
  </div>
);

// Fixed RevealOnScroll component typing to resolve children and key property errors
const RevealOnScroll = ({ children, delay = 0, className = "" }: { children?: React.ReactNode; delay?: number; className?: string; key?: React.Key }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: delay / 1000, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ExpIcon = ({ title }: { title: string }) => {
  const baseClass = "w-10 h-10 md:w-14 md:h-14 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6";
  if (title.includes('User Interface')) {
    return (
      <svg className={`${baseClass} text-[#F4B63A]`} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
        <line x1="8" y1="21" x2="16" y2="21"></line>
        <line x1="12" y1="17" x2="12" y2="21"></line>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    );
  }
  if (title.includes('Freelance')) {
    return (
      <svg className={`${baseClass} text-[#F4B63A]`} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
    );
  }
  return <Crosshair className={baseClass} />;
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    budget: '',
    deadline: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, email, message, budget, deadline } = formData;
    const whatsappMessage = `*New Inquiry from Portfolio*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Budget:* ${budget}%0A*Deadline:* ${deadline}%0A*Message:* ${message}`;
    
    const whatsappUrl = `https://wa.me/918402960696?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '', budget: '', deadline: '' });
    }, 5000);
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/5 p-12 md:p-16 rounded-[40px] border border-[#F4B63A]/20 backdrop-blur-sm shadow-2xl flex flex-col items-center justify-center text-center space-y-6"
      >
        <div className="w-20 h-20 rounded-full bg-[#F4B63A] flex items-center justify-center text-[#0E0E0E]">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h3 className="text-3xl font-display font-bold text-[#F4B63A]">Thank you!</h3>
        <p className="text-xl opacity-70">We will contact you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10 bg-white/5 p-10 md:p-14 rounded-[40px] border border-white/5 backdrop-blur-sm shadow-2xl relative group">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 group-focus-within:opacity-100 group-focus-within:text-[#F4B63A] transition-all">Name</label>
          <input 
            required
            type="text" 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#F4B63A] transition-all font-medium text-lg placeholder:opacity-10" 
            placeholder="Your Name" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 group-focus-within:opacity-100 group-focus-within:text-[#F4B63A] transition-all">Email</label>
          <input 
            required
            type="email" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#F4B63A] transition-all font-medium text-lg placeholder:opacity-10" 
            placeholder="your@email.com" 
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 group-focus-within:opacity-100 group-focus-within:text-[#F4B63A] transition-all">Budget</label>
          <input 
            required
            type="text" 
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: e.target.value})}
            className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#F4B63A] transition-all font-medium text-lg placeholder:opacity-10" 
            placeholder="e.g. $5000 / ₹50,000" 
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 group-focus-within:opacity-100 group-focus-within:text-[#F4B63A] transition-all">Deadline</label>
          <input 
            required
            type="text" 
            value={formData.deadline}
            onChange={(e) => setFormData({...formData, deadline: e.target.value})}
            className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#F4B63A] transition-all font-medium text-lg placeholder:opacity-10" 
            placeholder="e.g. 2 Weeks / Next Month" 
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40 group-focus-within:opacity-100 group-focus-within:text-[#F4B63A] transition-all">Project Goals</label>
        <textarea 
          required
          rows={3} 
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          className="w-full bg-transparent border-b border-white/10 py-3 focus:outline-none focus:border-[#F4B63A] transition-all font-medium text-lg resize-none placeholder:opacity-10" 
          placeholder="Briefly describe your vision..."
        ></textarea>
      </div>

      <button type="submit" className="group/btn w-full bg-[#F4B63A] text-[#0E0E0E] py-7 rounded-[20px] font-extrabold uppercase tracking-widest text-[10px] hover:bg-white hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-4">
        Send Inquiry via WhatsApp
        <span className="group-hover/btn:translate-x-2 transition-transform duration-300">→</span>
      </button>
    </form>
  );
};

const LegalModal = ({ isOpen, onClose, type }: { isOpen: boolean; onClose: () => void; type: 'privacy' | 'legal' }) => {
  if (!isOpen) return null;
  
  const content = {
    privacy: {
      title: "Privacy Policy",
      sections: [
        {
          title: "Data Collection",
          text: "We collect personal information such as your name, email address, and project details when you voluntarily provide them through our contact forms or direct communication channels."
        },
        {
          title: "Use of Information",
          text: "The information collected is used exclusively to respond to your inquiries, provide requested services, and maintain professional communication regarding your projects."
        },
        {
          title: "Data Protection",
          text: "Your data is transmitted securely. We do not store your personal information on our website's database; instead, it is routed directly to our secure communication platforms (Email/WhatsApp)."
        },
        {
          title: "Third-Party Disclosure",
          text: "We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, so long as those parties agree to keep this information confidential."
        }
      ]
    },
    legal: {
      title: "Legal Notice",
      sections: [
        {
          title: "Intellectual Property",
          text: "All content, designs, graphics, and code on this website are the intellectual property of Subham Das Gupta unless otherwise stated. Unauthorized use or reproduction is strictly prohibited."
        },
        {
          title: "Disclaimer",
          text: "The information on this website is provided for general informational purposes only. While we strive for accuracy, we make no warranties about the completeness or reliability of the content."
        },
        {
          title: "Limitation of Liability",
          text: "Subham Das Gupta shall not be liable for any direct, indirect, or consequential damages arising out of the use or inability to use this website or its contents."
        },
        {
          title: "Governing Law",
          text: "These terms are governed by and construed in accordance with the laws of India. Any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in Assam, India."
        }
      ]
    }
  };

  const active = content[type];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[#0E0E0E]/90 backdrop-blur-xl"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-[#F5F3EE] text-[#0E0E0E] w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-[40px] p-10 md:p-16 relative shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-12 h-12 rounded-full bg-[#0E0E0E] text-[#F4B63A] flex items-center justify-center hover:scale-110 transition-transform"
        >
          <X size={24} />
        </button>
        
        <EditorialMark text="Documentation" className="mb-8" />
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-12 tracking-tighter">{active.title}</h2>
        
        <div className="space-y-10">
          {active.sections.map((s, i) => (
            <div key={i} className="space-y-3">
              <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">{s.title}</h4>
              <p className="text-lg leading-relaxed opacity-70">{s.text}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-black/5 flex justify-between items-center">
          <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">Last Updated: March 2025</p>
          <button onClick={onClose} className="font-display font-bold text-[#F4B63A] hover:underline">Close Document</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string; needsEmail?: boolean }[]>([
    { role: 'bot', text: "Hi! I'm Subham's virtual assistant. I can tell you about his UI/UX work, financial expertise, or even his chess strategies. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      // Use the API key from process.env.API_KEY as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })), { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: `You are an AI assistant for Subham Das Gupta. 
          Subham's Profile:
          - Role: UI/UX Designer & Finance Strategist based in Tinsukia, Assam.
          - Education: B.Com Honours in Finance (Dibrugarh University).
          - Skills: Web Development, Editing, Graphic Design, User Experience Design (UED), WordPress Design, Web Design, Logo Design, Data Entry, Search Engine Optimization (SEO).
          - Achievements: High-tier analytical reasoning, Chess.com Rating ~1600.
          - Experience: Upwork (UI Designer), Fiverr (Freelance Designer), Freelancer.com (Developer & UI/UX).
          - Email: dasguptasubham83@gmail.com.
          - Phone: +91 8402960696.
          
          Behavior:
          - Be professional, artistic, and concise.
          - Introduce Subham and provide suggestions on how he can help (e.g., creating modern UIs or financial consulting).
          - If a user asks something personal you don't know, or wants to hire Subham for a complex project, or if you can't address the query properly, say something like: "That's a great question. For a more detailed discussion on this, I suggest reaching out to Subham directly." 
          - ALWAYS provide helpful suggestions about his work.
          - If the user seems frustrated or asks for direct contact, include the phrase "ESC_EMAIL" in your response so the UI can provide a direct link to Gmail.`,
        }
      });

      // Directly access .text property from response as per guidelines
      const botText = response.text || "I'm having a bit of trouble connecting right now. Feel free to email Subham at dasguptasubham83@gmail.com!";
      const needsEmail = botText.includes("ESC_EMAIL") || botText.toLowerCase().includes("reach out to subham directly");
      
      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: botText.replace("ESC_EMAIL", ""), 
        needsEmail 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: "Something went wrong. Please try again or email Subham directly.", needsEmail: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEmailRedirect = () => {
    const lastUserMsg = messages.filter(m => m.role === 'user').pop()?.text || "Inquiry from Portfolio";
    const subject = encodeURIComponent("Inquiry via Portfolio");
    const body = encodeURIComponent(`Hello Subham,\n\nI was browsing your portfolio and had the following inquiry:\n\n"${lastUserMsg}"\n\nLooking forward to hearing from you!`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=dasguptasubham83@gmail.com&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60] font-sans">
      <div className={`absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col transition-all duration-500 transform ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-90 pointer-events-none'}`}>
        <div className="bg-[#0E0E0E] p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#F4B63A] flex items-center justify-center font-bold text-[#0E0E0E]">SDG</div>
            <div>
              <p className="text-[#F5F3EE] font-bold text-sm">SDG Assistant</p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">Always Active</p>
              </div>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#F5F3EE]/50">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${m.role === 'user' ? 'bg-[#0E0E0E] text-white rounded-tr-none' : 'bg-white text-black rounded-tl-none border border-black/5'}`}>
                {m.text}
                {m.needsEmail && (
                  <button 
                    onClick={handleEmailRedirect}
                    className="mt-3 w-full bg-[#F4B63A] text-black font-bold py-2 rounded-lg text-xs hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
                  >
                    Send to Subham's Gmail
                    <span className="text-lg">✉</span>
                  </button>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-black/5 flex gap-1">
                <div className="w-1.5 h-1.5 bg-[#F4B63A] rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-[#F4B63A] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-[#F4B63A] rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-black/5">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Subham's work..."
              className="flex-1 bg-[#F5F3EE] rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#F4B63A] transition-all"
            />
            <button 
              onClick={handleSend}
              className="w-11 h-11 bg-[#0E0E0E] text-[#F4B63A] rounded-full flex items-center justify-center hover:bg-[#F4B63A] hover:text-[#0E0E0E] transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            </button>
          </div>
        </div>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full bg-[#0E0E0E] text-[#F4B63A] shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 group relative ${isOpen ? 'rotate-90' : ''}`}
      >
        <div className="absolute inset-0 rounded-full bg-[#F4B63A] opacity-20 animate-ping group-hover:animate-none"></div>
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
        )}
      </button>
    </div>
  );
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [legalType, setLegalType] = useState<'privacy' | 'legal' | null>(null);
  const [isDark, setIsDark] = useState(false);
  const [fontSize, setFontSize] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize * 16}px`;
  }, [fontSize]);

  const navItems = ['Home', 'About', 'Portfolio', 'Experience', 'Contact'];

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#0E0E0E] z-[100] flex flex-col items-center justify-center text-[#F5F3EE]">
        <div className="relative">
          <Crosshair className="w-24 h-24 animate-spin-slow text-[#F4B63A]" />
          <div className="absolute inset-0 flex items-center justify-center font-display font-extrabold text-xs text-[#F4B63A]">SDG.</div>
        </div>
        <div className="mt-8 overflow-hidden h-px w-32 bg-white/10 relative">
          <div className="absolute inset-0 bg-[#F4B63A] animate-loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`min-h-screen selection:bg-[#F4B63A] selection:text-[#0E0E0E] transition-all duration-700 ${isDark ? 'dark bg-[#0E0E0E] text-[#F5F3EE]' : 'bg-[#F5F3EE] text-[#0E0E0E]'} cursor-none`}
    >
      <CustomCursor />
      <FloatingSocials />
      <BackToTop />
      <WhatsAppPopup />
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100]">
        <div className="h-full bg-[#F4B63A] transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }}></div>
      </div>

      <nav className={`fixed top-0 w-full z-50 transition-all duration-700 py-6 px-6 md:px-12 flex justify-between items-center ${scrolled ? (isDark ? 'bg-[#0E0E0E]/95 border-white/5' : 'bg-[#F5F3EE]/95 border-black/5') + ' backdrop-blur-lg py-4 border-b' : 'bg-transparent'}`}>
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="flex items-center gap-2">
            <Crosshair className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
            <span className="font-display font-extrabold text-xl tracking-tighter">SDG.</span>
          </div>
        </div>

        <ul className="hidden md:flex gap-10 items-center">
          {navItems.map((item) => (
            <li key={item}>
              <a 
                href={`#${item.toLowerCase()}`} 
                className="text-[11px] uppercase tracking-[0.25em] font-black hover:text-[#F4B63A] transition-all duration-300 relative group font-display"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#F4B63A] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          ))}
          <li>
            <CustomizationPanel 
              isDark={isDark} 
              setIsDark={setIsDark} 
              fontSize={fontSize} 
              setFontSize={setFontSize} 
            />
          </li>
        </ul>

        <button 
          className="md:hidden flex flex-col gap-1.5 z-50 p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`w-6 h-0.5 bg-black transition-all duration-500 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-4 h-0.5 bg-black ml-auto transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-black transition-all duration-500 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>

        <div className={`fixed inset-0 bg-[#0E0E0E] text-[#F5F3EE] flex flex-col items-center justify-center gap-8 transition-all duration-700 ease-in-out md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          {navItems.map((item, idx) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-5xl font-display font-bold hover:text-[#F4B63A] transition-all duration-500 hover:scale-110"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {item}
            </a>
          ))}
          <div className="mt-8 pt-8 border-t border-white/10 w-64 flex justify-center">
            <CustomizationPanel 
              isDark={isDark} 
              setIsDark={setIsDark} 
              fontSize={fontSize} 
              setFontSize={setFontSize} 
            />
          </div>
        </div>
      </nav>

      <section id="home" className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden">
        <DecorativeCircle className="absolute -top-20 -right-20 w-96 h-96 opacity-5 animate-pulse" />
        <Crosshair className="absolute top-1/4 left-10 w-12 h-12 opacity-10 animate-bounce-slow" />
        
        <div className="z-10 max-w-7xl mx-auto w-full grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <RevealOnScroll>
              <EditorialMark text="UI Designer & Finance Strategist" className="mb-6" />
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-6xl md:text-[8rem] lg:text-[10rem] font-display font-extrabold leading-[0.85] tracking-tighter mb-8 uppercase"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-block text-black drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)]"
                >
                  {"SUBHAM".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1, delay: i * 0.1 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
                <br />
                <span 
                  className="relative inline-block text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.15)]"
                  style={{ WebkitTextStroke: '2px black' }}
                >
                  {"DAS GUPTA".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1, delay: (i + 6) * 0.1 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  <motion.span 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 2 }}
                    className="absolute -bottom-4 left-0 h-2 bg-[#F4B63A] rounded-full opacity-50"
                  />
                </span>
              </motion.h1>
              <p className="text-xl md:text-2xl max-w-lg mb-12 font-light leading-relaxed opacity-70">
                Crafting <span className="font-serif italic font-normal text-black">digital excellence</span> through strategic design and financial intelligence.
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                <a href="#portfolio" className="group bg-[#0E0E0E] text-[#F5F3EE] px-10 py-5 rounded-full font-bold hover:bg-[#F4B63A] hover:text-[#0E0E0E] transition-all duration-500 uppercase text-[10px] tracking-[0.2em] flex items-center gap-3">
                  View Showcase
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </a>
              </div>
            </RevealOnScroll>
          </div>
          
          <div className="md:col-span-5 relative">
            <RevealOnScroll delay={300}>
              <div className="aspect-[3/4] overflow-hidden rounded-2xl relative shadow-2xl group cursor-none">
                <img 
                  src="https://i.postimg.cc/t4K2VNd2/f13d80c2-8ef6-49f1-8036-6266772f3853.jpg" 
                  alt="Subham Das Gupta" 
                  className="w-full h-full object-cover transition-transform duration-[4s] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-8 left-8 text-[#F5F3EE]">
                  <p className="text-[10px] uppercase tracking-[0.3em] mb-2 font-bold opacity-70">Current Location</p>
                  <p className="text-xl font-display font-bold">Tinsukia, Assam</p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section id="about" className="py-32 px-6 md:px-12 bg-[#0E0E0E] text-[#F5F3EE] relative overflow-hidden">
        <DecorativeCircle className="absolute bottom-0 right-0 w-[500px] h-[500px] translate-x-1/2 translate-y-1/2 opacity-5" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-16 items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <RevealOnScroll>
              <div className="relative group overflow-hidden rounded-2xl">
                <img 
                  src="https://i.postimg.cc/3WVNwRv2/Whats-App-Image-2026-02-05-at-9-48-56-PM.jpg" 
                  alt="Artist Portrait" 
                  className="rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-2xl scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 border border-[#F4B63A]/20 m-4 rounded-xl pointer-events-none transition-all duration-700 group-hover:m-2"></div>
                <Crosshair className="absolute -bottom-4 -left-4 w-12 h-12 text-[#F4B63A]" />
              </div>
            </RevealOnScroll>
          </div>
          
          <div className="md:col-span-7 order-1 md:order-2">
            <RevealOnScroll delay={200}>
              <EditorialMark text="The Profile Summary" className="mb-8 text-[#F4B63A]" />
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-display font-bold mb-10 leading-tight"
              >
                Design backed by <span className="font-serif italic font-normal text-[#F4B63A]">data</span> and driven by emotion.
              </motion.h2>
              <div className="space-y-6 text-lg md:text-xl font-light opacity-70 leading-relaxed max-w-2xl">
                <p>
                  I am a dedicated professional with a strong background in UI design and finance. Currently pursuing a Bachelor of Commerce with Honours, I bridge the gap between business logic and user-centric aesthetics.
                </p>
                <p>
                  My expertise spans from <span className="text-[#F4B63A] font-medium">Web Development</span> to <span className="text-[#F4B63A] font-medium">SEO optimization</span>, allowing me to not only visualize but also ensure the performance and visibility of modern digital products.
                </p>
              </div>
              
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                {SKILLS.map((skill, idx) => (
                  <div key={idx} className="border border-white/10 p-4 rounded-lg hover:border-[#F4B63A]/50 transition-all group cursor-default hover:bg-white/5">
                    <div className="text-[10px] uppercase tracking-widest font-bold opacity-40 group-hover:opacity-100 group-hover:text-[#F4B63A] transition-all">
                      {skill}
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      <section id="experience" className="py-32 px-6 md:px-12 bg-white dark:bg-[#0E0E0E] text-[#0E0E0E] dark:text-[#F5F3EE] transition-colors duration-700 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center md:text-left">
            <RevealOnScroll>
              <EditorialMark text="Professional Path" className="mb-6 inline-flex" />
              <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter">Experience</h2>
            </RevealOnScroll>
          </div>

          <div className="divide-y divide-black/5 dark:divide-white/5">
            {EXPERIENCE.map((exp: any, idx) => (
              <RevealOnScroll key={exp.id} delay={idx * 150}>
                <div className="grid grid-cols-1 md:grid-cols-12 py-16 group hover:bg-[#F5F3EE]/50 dark:hover:bg-white/5 transition-all duration-700 px-8 -mx-8 rounded-[40px] cursor-default relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1 h-0 bg-[#F4B63A] transition-all duration-700 group-hover:h-full"></div>
                  
                  <div className="md:col-span-4 flex flex-col gap-6">
                    <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30 group-hover:opacity-100 transition-opacity">
                      {exp.date}
                    </div>
                    {exp.imageUrl && (
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg border border-black/5 dark:border-white/5"
                      >
                        <img src={exp.imageUrl} alt={exp.title} className="w-full h-full object-cover" />
                      </motion.div>
                    )}
                  </div>

                  <div className="md:col-span-5 md:pl-12">
                    <div className="flex items-center gap-6 mb-4 group-hover:translate-x-4 transition-transform duration-700">
                      <ExpIcon title={exp.title} />
                      <h3 className="text-3xl md:text-5xl font-display font-bold leading-none">{exp.title}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-bold opacity-60 mb-6 pl-16 md:pl-20">
                      <span className="text-[#F4B63A]">{exp.company}</span>
                      <span className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20"></span>
                      <span>{exp.location}</span>
                    </div>
                    <p className="text-lg opacity-60 leading-relaxed max-w-lg pl-16 md:pl-20">{exp.description}</p>
                  </div>

                  <div className="md:col-span-3 flex md:justify-end items-start pt-2">
                    <div className="w-12 h-12 border border-black/10 dark:border-white/10 rounded-full flex items-center justify-center group-hover:bg-[#F4B63A] group-hover:text-[#0E0E0E] group-hover:scale-110 transition-all duration-500">
                      <span className="text-xl">→</span>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-32 px-6 md:px-12 bg-[#F5F3EE] dark:bg-[#1A1A1A] text-[#0E0E0E] dark:text-[#F5F3EE] transition-colors duration-700">
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
              <div className="max-w-2xl">
                <EditorialMark text="Digital Case Studies" className="mb-6" />
                <h2 className="text-5xl md:text-8xl font-display font-bold tracking-tighter">The Gallery</h2>
              </div>
              <div className="text-sm font-medium opacity-50 max-w-xs leading-relaxed">
                A high-precision curation of projects where business logic meets artistic expression. Each pixel serves a purpose.
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {PROJECTS.map((project, idx) => {
              const spanClass = idx % 3 === 0 ? 'md:col-span-7' : 'md:col-span-5';
              return (
                <div key={project.id} className={`${spanClass}`}>
                  <RevealOnScroll delay={idx * 100}>
                    <div className="group cursor-pointer">
                      <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] bg-[#EBE9E4] dark:bg-white/5 shadow-xl transition-all duration-700">
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-[2.5s] cubic-bezier(0.23, 1, 0.32, 1) group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-12 backdrop-blur-[4px]">
                          <span className="text-[10px] text-[#F4B63A] uppercase tracking-[0.5em] font-bold block mb-4 translate-y-10 group-hover:translate-y-0 transition-all duration-700 delay-100">{project.category}</span>
                          <h3 className="text-white text-5xl font-display font-bold translate-y-10 group-hover:translate-y-0 transition-all duration-700 delay-200">{project.title}</h3>
                          <div className="w-12 h-1 bg-[#F4B63A] mt-6 translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-1000 delay-300"></div>
                        </div>
                      </div>
                      <div className="mt-8 flex justify-between items-end px-4">
                        <div>
                          <h4 className="text-3xl font-display font-bold group-hover:text-[#F4B63A] transition-colors">{project.title}</h4>
                          <p className="text-[10px] uppercase tracking-widest font-bold opacity-40 mt-2">{project.category}</p>
                        </div>
                        <span className="font-serif italic opacity-30 text-2xl">{project.year}</span>
                      </div>
                    </div>
                  </RevealOnScroll>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 md:px-12 bg-[#0E0E0E] text-[#F5F3EE] relative overflow-hidden">
        <DecorativeCircle className="absolute top-0 left-0 w-96 h-96 -translate-x-1/2 -translate-y-1/2 text-[#F4B63A] opacity-10" />
        <div className="max-w-7xl mx-auto">
          <RevealOnScroll>
            <div className="grid md:grid-cols-2 gap-24 items-start">
              <div>
                <EditorialMark text="Ready for Collaboration" className="mb-8 text-[#F4B63A]" />
                <h2 className="text-6xl md:text-9xl font-display font-bold mb-12 leading-[0.8] tracking-tighter">
                  Let's create<br />
                  <span className="font-serif italic font-normal text-[#F4B63A]">value</span>.
                </h2>
                <div className="space-y-8">
                  <p className="text-xl font-light opacity-60 max-w-md leading-relaxed">Whether you're a startup or an established brand, I'm here to build the next generation of visual experiences.</p>
                  
                  <div className="pt-8 space-y-6">
                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-40">Direct Line</p>
                    <a href="mailto:dasguptasubham83@gmail.com" className="block text-2xl md:text-4xl font-display font-bold hover:text-[#F4B63A] transition-all hover:translate-x-2">
                      dasguptasubham83@gmail.com
                    </a>
                    <a href="tel:+918402960696" className="block text-xl font-display opacity-80 hover:text-[#F4B63A] transition-all hover:translate-x-2">
                      +91 8402960696
                    </a>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <footer className="py-24 px-6 md:px-12 bg-[#0E0E0E] text-[#F5F3EE]/20 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Crosshair className="w-5 h-5 text-[#F4B63A] group-hover:rotate-180 transition-transform duration-1000" />
            <span className="font-display font-bold text-lg tracking-tighter text-[#F5F3EE]/40 group-hover:text-[#F4B63A] transition-colors">SDG.</span>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-10">
              <a href="https://wa.me/qr/RJNIQN7O53PDE1" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#25D366] transition-all duration-500 scale-100 group-hover:scale-110 shadow-lg overflow-hidden">
                  <img src="https://i.ibb.co/jZ5nBXgM/download.jpg" alt="WhatsApp" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#25D366] opacity-0 group-hover:opacity-100 transition-all duration-500">WhatsApp</span>
              </a>
              <a href="https://in.linkedin.com/in/subhamdasgupta1" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#0077B5] transition-all duration-500 scale-100 group-hover:scale-110 shadow-lg">
                  <svg className="w-7 h-7 text-[#F5F3EE]" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </div>
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#0077B5] opacity-0 group-hover:opacity-100 transition-all duration-500">LinkedIn</span>
              </a>
            </div>
            <div className="text-[10px] tracking-[0.3em] uppercase font-bold text-center opacity-30">
              Designed for Impact © 2025 Subham Das Gupta. Built with Passion.
            </div>
          </div>

          <div className="flex gap-8">
             <button onClick={() => setLegalType('privacy')} className="hover:text-[#F4B63A] transition-colors text-[10px] uppercase tracking-widest font-bold">Privacy</button>
             <button onClick={() => setLegalType('legal')} className="hover:text-[#F4B63A] transition-colors text-[10px] uppercase tracking-widest font-bold">Legal</button>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {legalType && (
          <LegalModal 
            isOpen={!!legalType} 
            type={legalType} 
            onClose={() => setLegalType(null)} 
          />
        )}
      </AnimatePresence>

      <Chatbot />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
