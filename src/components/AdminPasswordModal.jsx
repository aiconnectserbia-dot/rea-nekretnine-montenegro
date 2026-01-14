import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, X, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function AdminPasswordModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (password === 'reanekretnine2026.') {
        localStorage.setItem('admin_password_verified', 'true');
        onSuccess();
        setPassword('');
        toast.success('Pristup odobren!');
      } else {
        toast.error('Lozinka je pogrešna!');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1a1a1a] border border-[#d4af37]/30 rounded-lg p-8 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#d4af37]/20 border border-[#d4af37]/50 rounded-lg flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-xl font-light text-white tracking-wider">Admin Panel</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-white/60 text-sm mb-6">Molimo unesite lozinku za pristup admin panelu:</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Lozinka"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border-white/10 text-white h-10 pr-10"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-white/20 text-white hover:bg-white/5"
            >
              Otkaži
            </Button>
            <Button
              type="submit"
              disabled={!password || isLoading}
              className="flex-1 bg-[#d4af37] hover:bg-[#b8960c] text-black"
            >
              {isLoading ? 'Proverava...' : 'Uđi'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}