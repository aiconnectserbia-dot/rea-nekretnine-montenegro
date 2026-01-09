import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function PropertyFilters({ filters, onFilterChange, onClearFilters }) {
  const updateFilter = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some(v => v && v !== '');

  const FilterControls = ({ mobile = false }) => (
    <div className={`space-y-6 ${mobile ? '' : 'flex flex-wrap gap-4 items-end'}`}>
      {/* Search */}
      <div className={mobile ? '' : 'flex-1 min-w-[200px]'}>
        {mobile && <label className="text-white/60 text-sm mb-2 block">Pretraga</label>}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
          <Input
            placeholder="Pretraži nekretnine..."
            value={filters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 h-12"
          />
        </div>
      </div>

      {/* Listing Type */}
      <div className={mobile ? '' : 'w-[150px]'}>
        {mobile && <label className="text-white/60 text-sm mb-2 block">Tip Oglasa</label>}
        <Select value={filters.listing_type || ''} onValueChange={(v) => updateFilter('listing_type', v)}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
            <SelectValue placeholder="Tip Oglasa" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#d4af37]/20">
            <SelectItem value="prodaja">Prodaja</SelectItem>
            <SelectItem value="iznajmljivanje">Iznajmljivanje</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Property Type */}
      <div className={mobile ? '' : 'w-[180px]'}>
        {mobile && <label className="text-white/60 text-sm mb-2 block">Tip Nekretnine</label>}
        <Select value={filters.type || ''} onValueChange={(v) => updateFilter('type', v)}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
            <SelectValue placeholder="Tip Nekretnine" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#d4af37]/20">
            <SelectItem value="apartman">Apartman</SelectItem>
            <SelectItem value="vila">Vila</SelectItem>
            <SelectItem value="kuca">Kuća</SelectItem>
            <SelectItem value="zemljiste">Zemljište</SelectItem>
            <SelectItem value="hotel">Hotel</SelectItem>
            <SelectItem value="poslovni_prostor">Poslovni Prostor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className={mobile ? '' : 'w-[200px]'}>
        {mobile && <label className="text-white/60 text-sm mb-2 block">Cijena</label>}
        <Select value={filters.price || ''} onValueChange={(v) => updateFilter('price', v)}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
            <SelectValue placeholder="Cijena" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#d4af37]/20">
            <SelectItem value="100000-500000">100.000€ - 500.000€</SelectItem>
            <SelectItem value="500000-1000000">500.000€ - 1.000.000€</SelectItem>
            <SelectItem value="1000000-2000000">1.000.000€ - 2.000.000€</SelectItem>
            <SelectItem value="2000000-5000000">2.000.000€ - 5.000.000€</SelectItem>
            <SelectItem value="5000000+">5.000.000€+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bedrooms */}
      <div className={mobile ? '' : 'w-[150px]'}>
        {mobile && <label className="text-white/60 text-sm mb-2 block">Broj Soba</label>}
        <Select value={filters.bedrooms || ''} onValueChange={(v) => updateFilter('bedrooms', v)}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
            <SelectValue placeholder="Br. Soba" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#d4af37]/20">
            <SelectItem value="1">1 Soba</SelectItem>
            <SelectItem value="2">2 Sobe</SelectItem>
            <SelectItem value="3">3 Sobe</SelectItem>
            <SelectItem value="4">4 Sobe</SelectItem>
            <SelectItem value="5+">5+ Soba</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category */}
      <div className={mobile ? '' : 'w-[180px]'}>
        {mobile && <label className="text-white/60 text-sm mb-2 block">Kategorija</label>}
        <Select value={filters.category || ''} onValueChange={(v) => updateFilter('category', v)}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
            <SelectValue placeholder="Kategorija" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#d4af37]/20">
            <SelectItem value="porto_montenegro">Porto Montenegro</SelectItem>
            <SelectItem value="lustica_bay">Luštica Bay</SelectItem>
            <SelectItem value="portonovi">Portonovi</SelectItem>
            <SelectItem value="boka_kotorska">Boka Kotorska</SelectItem>
            <SelectItem value="budva">Budva</SelectItem>
            <SelectItem value="waterfront">Waterfront</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          onClick={onClearFilters}
          className="text-[#d4af37] hover:text-[#e6c65c] hover:bg-transparent"
        >
          <X className="w-4 h-4 mr-2" />
          Obriši Filtere
        </Button>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block bg-[#1a1a1a] p-6 mb-8">
        <FilterControls />
      </div>

      {/* Mobile Filters */}
      <div className="lg:hidden mb-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filteri
              {hasActiveFilters && (
                <span className="ml-2 px-2 py-0.5 bg-[#d4af37] text-black text-xs rounded-full">
                  Aktivno
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="bg-[#0a0a0a] border-t border-[#d4af37]/20 h-[80vh]">
            <SheetHeader>
              <SheetTitle className="text-white">Filteri</SheetTitle>
            </SheetHeader>
            <div className="mt-6 overflow-y-auto">
              <FilterControls mobile />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}