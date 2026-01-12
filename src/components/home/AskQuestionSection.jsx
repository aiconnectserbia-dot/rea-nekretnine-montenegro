import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AskQuestionSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuliraj slanje - kasnije povezati sa mejlom
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', question: '' });
      
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]">
      {/* Dekorativni elementi */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
      
      {/* Geometrijski oblici u pozadini */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-[#d4af37]/10 rotate-45 hidden lg:block" />
      <div className="absolute bottom-20 right-10 w-40 h-40 border border-[#d4af37]/10 rotate-12 hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Leva strana - Tekst */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-[#d4af37]" />
              <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Kontakt</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-light text-white tracking-wide leading-tight">
              Imate Pitanje?
              <span className="block gold-text font-serif italic mt-2">Postavite Ga Ovde</span>
            </h2>

            <p className="text-white/70 text-lg leading-relaxed" style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
              Naš tim stručnjaka je tu da vam pomogne. Bilo da tražite informacije o specifičnoj nekretnini, 
              želite savjet o kupovini, ili jednostavno imate opšta pitanja - javite nam se.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 p-4 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-lg">
                <MessageCircle className="w-6 h-6 text-[#d4af37] flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Brzi Odgovor</p>
                  <p className="text-white/60 text-sm">Odgovaramo u roku od 24h</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-[#d4af37]/5 border border-[#d4af37]/20 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-[#d4af37] flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Besplatna Konsultacija</p>
                  <p className="text-white/60 text-sm">Bez obaveze, bez naknade</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Desna strana - Forma */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Dekorativni okvir */}
            <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#d4af37]/20 rounded-lg hidden md:block" />
            
            <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#d4af37]/30 rounded-lg p-8 md:p-10 shadow-2xl">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 bg-[#d4af37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#d4af37]" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-2">Hvala Vam!</h3>
                  <p className="text-white/60">Vaše pitanje je primljeno. Odgovorićemo uskoro.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-white/80 text-sm mb-2 block tracking-wide">
                      Vaše Ime *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Unesite vaše ime"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 focus:border-[#d4af37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-2 block tracking-wide">
                      Email Adresa *
                    </label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="vasa@email.com"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 h-12 focus:border-[#d4af37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-2 block tracking-wide">
                      Vaše Pitanje *
                    </label>
                    <Textarea
                      required
                      value={formData.question}
                      onChange={(e) => setFormData({...formData, question: e.target.value})}
                      placeholder="Postavite nam bilo koje pitanje u vezi nekretnina, tržišta ili procesa kupovine..."
                      rows={5}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#d4af37] transition-colors resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#d4af37] hover:bg-[#b8960c] text-black py-6 text-base tracking-wider uppercase font-medium transition-all duration-300 hover:shadow-lg hover:shadow-[#d4af37]/20"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Šalje se...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Pošalji Pitanje
                      </>
                    )}
                  </Button>

                  <p className="text-white/40 text-xs text-center">
                    Vaši podaci su zaštićeni i neće biti prosleđeni trećim licima
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}