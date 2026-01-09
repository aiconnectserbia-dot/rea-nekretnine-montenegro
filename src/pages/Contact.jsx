import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, Loader2, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Phone,
    title: 'Telefon',
    details: ['+382 69 123 456', '+382 32 123 456'],
    href: 'tel:+38269123456'
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['info@montenegro-realestate.me', 'sales@montenegro-realestate.me'],
    href: 'mailto:info@montenegro-realestate.me'
  },
  {
    icon: MapPin,
    title: 'Adresa',
    details: ['Porto Montenegro', 'Tivat, Crna Gora'],
    href: '#'
  },
  {
    icon: Clock,
    title: 'Radno Vrijeme',
    details: ['Pon - Pet: 09:00 - 18:00', 'Sub: 10:00 - 14:00'],
    href: '#'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const inquiryMutation = useMutation({
    mutationFn: (data) => base44.entities.Inquiry.create(data),
    onSuccess: () => {
      setSubmitted(true);
      toast.success('Vaša poruka je uspješno poslana!');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    inquiryMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#d4af37]" />
              <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Kontakt</span>
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#d4af37]" />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 tracking-wide">
              Stupite u
              <span className="gold-text font-serif italic"> Kontakt</span>
            </h1>
            
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Naš tim je tu da odgovori na sva vaša pitanja i pomogne vam u pronalasku 
              savršene nekretnine u Crnoj Gori.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4 sm:p-6 bg-[#0a0a0a] border border-white/5 hover:border-[#d4af37]/30 transition-all group"
              >
                <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#d4af37] mb-3 sm:mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-base sm:text-lg font-light text-white mb-2 sm:mb-3">{item.title}</h3>
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-white/60 text-xs sm:text-sm">{detail}</p>
                ))}
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-[#d4af37]" />
                <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Pošaljite Poruku</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-light text-white tracking-wide mb-8">
                Kako Vam Možemo
                <span className="gold-text font-serif italic"> Pomoći?</span>
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#1a1a1a] p-12 text-center"
                >
                  <div className="w-16 h-16 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-2xl font-light text-white mb-4">Hvala Vam!</h3>
                  <p className="text-white/60 mb-6">
                    Vaša poruka je uspješno poslana. Odgovorićemo vam u najkraćem mogućem roku.
                  </p>
                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="bg-[#d4af37] hover:bg-[#b8960c] text-black"
                  >
                    Pošalji Novu Poruku
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-white/60 text-sm mb-2 block">Ime i Prezime *</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="bg-white/5 border-white/10 text-white h-12"
                      />
                    </div>
                    <div>
                      <label className="text-white/60 text-sm mb-2 block">Email Adresa *</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="bg-white/5 border-white/10 text-white h-12"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Telefon</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-white/5 border-white/10 text-white h-12"
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-sm mb-2 block">Vaša Poruka *</label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      rows={6}
                      className="bg-white/5 border-white/10 text-white resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={inquiryMutation.isPending}
                    className="w-full sm:w-auto px-10 py-6 bg-[#d4af37] hover:bg-[#b8960c] text-black tracking-wider uppercase"
                  >
                    {inquiryMutation.isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Pošalji Poruku
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Map/Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="h-full min-h-[500px] bg-[#1a1a1a] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1974&auto=format&fit=crop"
                  alt="Our Office"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-light text-white mb-2">Posjetite Nas</h3>
                  <p className="text-white/60">
                    Porto Montenegro, Tivat<br />
                    Crna Gora
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}