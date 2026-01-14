import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Plus, Upload, X, Loader2, Check, Image as ImageIcon, Trash2,
  Home, DollarSign, Edit, Eye, CheckCircle, ShoppingBag, AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminPanel() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState('table'); // 'table' or 'form'
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    region: '',
    price: '',
    price_on_request: false,
    property_type: '',
    listing_type: 'prodaja',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    category: '',
    featured: false,
    features: []
  });
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [featureInput, setFeatureInput] = useState('');
  const [deleteDialog, setDeleteDialog] = useState({ open: false, propertyId: null });

  const queryClient = useQueryClient();

  // Check if user is admin or has password verified
  useEffect(() => {
    const checkAdmin = async () => {
      const passwordVerified = localStorage.getItem('admin_password_verified') === 'true';
      
      if (passwordVerified) {
        setUser({ role: 'admin' });
        setIsLoading(false);
        return;
      }
      
      try {
        const currentUser = await base44.auth.me();
        setUser(currentUser);
      } catch (error) {
        // User not logged in, will rely on password verification
      } finally {
        setIsLoading(false);
      }
    };
    checkAdmin();
  }, []);

  // Fetch all properties (excluding deleted ones)
  const { data: properties = [], isLoading: propertiesLoading } = useQuery({
    queryKey: ['admin-properties'],
    queryFn: () => base44.entities.Property.filter({ is_deleted: false }, '-created_date'),
    enabled: !!user && (user.role === 'admin' || localStorage.getItem('admin_password_verified') === 'true')
  });

  const createPropertyMutation = useMutation({
    mutationFn: async (data) => {
      let imageUrl = editingProperty?.image_url || '';
      let galleryUrls = editingProperty?.gallery || [];

      if (mainImage) {
        setUploadingImages(true);
        const mainUpload = await base44.integrations.Core.UploadFile({ file: mainImage });
        imageUrl = mainUpload.file_url;
      }

      if (galleryImages.length > 0) {
        const galleryUploads = await Promise.all(
          galleryImages.map(img => base44.integrations.Core.UploadFile({ file: img }))
        );
        galleryUrls = [...galleryUrls, ...galleryUploads.map(upload => upload.file_url)];
      }

      setUploadingImages(false);

      const propertyData = {
        ...data,
        image_url: imageUrl,
        gallery: galleryUrls,
        price: data.price ? parseFloat(data.price) : null,
        bedrooms: data.bedrooms ? parseInt(data.bedrooms) : null,
        bathrooms: data.bathrooms ? parseInt(data.bathrooms) : null,
        area: data.area ? parseFloat(data.area) : null,
      };

      if (editingProperty) {
        return base44.entities.Property.update(editingProperty.id, propertyData);
      } else {
        return base44.entities.Property.create(propertyData);
      }
    },
    onSuccess: () => {
      toast.success(editingProperty ? 'Nekretnina uspješno ažurirana!' : 'Nekretnina uspješno dodana!');
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      resetForm();
      setView('table');
    },
    onError: (error) => {
      toast.error('Greška pri čuvanju nekretnine');
      console.error(error);
    }
  });

  const updatePropertyMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Property.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
    onError: () => {
      toast.error('Greška pri ažuriranju nekretnine');
    }
  });

  const deletePropertyMutation = useMutation({
    mutationFn: (id) => base44.entities.Property.update(id, { is_deleted: true }),
    onSuccess: () => {
      toast.success('Nekretnina uspješno obrisana!');
      queryClient.invalidateQueries({ queryKey: ['admin-properties'] });
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      setDeleteDialog({ open: false, propertyId: null });
    },
    onError: () => {
      toast.error('Greška pri brisanju nekretnine');
    }
  });

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setGalleryImages([...galleryImages, ...files]);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryPreviews(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeGalleryImage = (index) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
    setGalleryPreviews(galleryPreviews.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index)
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      region: '',
      price: '',
      price_on_request: false,
      property_type: '',
      listing_type: 'prodaja',
      bedrooms: '',
      bathrooms: '',
      area: '',
      description: '',
      category: '',
      featured: false,
      features: []
    });
    setMainImage(null);
    setMainImagePreview('');
    setGalleryImages([]);
    setGalleryPreviews([]);
    setFeatureInput('');
    setEditingProperty(null);
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title || '',
      location: property.location || '',
      region: property.region || '',
      price: property.price || '',
      price_on_request: property.price_on_request || false,
      property_type: property.property_type || '',
      listing_type: property.listing_type || 'prodaja',
      bedrooms: property.bedrooms || '',
      bathrooms: property.bathrooms || '',
      area: property.area || '',
      description: property.description || '',
      category: property.category || '',
      featured: property.featured || false,
      features: property.features || []
    });
    setMainImagePreview(property.image_url || '');
    setGalleryPreviews(property.gallery || []);
    setView('form');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!mainImagePreview && !editingProperty) {
      toast.error('Morate dodati glavnu sliku');
      return;
    }

    createPropertyMutation.mutate(formData);
  };

  const toggleSold = (property) => {
    updatePropertyMutation.mutate({
      id: property.id,
      data: { is_sold: !property.is_sold }
    });
    toast.success(property.is_sold ? 'Nekretnina označena kao dostupna' : 'Nekretnina označena kao prodata');
  };

  const formatPrice = (price) => {
    if (!price) return 'Cijena na upit';
    return new Intl.NumberFormat('sr-RS', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(price);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
      </div>
    );
  }

  if (!user || (user.role !== 'admin' && !localStorage.getItem('admin_password_verified'))) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-light text-white mb-4">Nemate Pristup</h1>
          <p className="text-white/60">Ova stranica je dostupna samo administratorima.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-[#d4af37]" />
                <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase">Admin Panel</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-light text-white tracking-wide">
                {view === 'table' ? 'Upravljanje' : (editingProperty ? 'Uredi' : 'Dodaj')}
                <span className="gold-text font-serif italic"> {view === 'table' ? 'Nekretninama' : 'Nekretninu'}</span>
              </h1>
            </div>
            
            {view === 'table' ? (
              <Button
                onClick={() => {
                  resetForm();
                  setView('form');
                }}
                className="bg-[#d4af37] hover:bg-[#b8960c] text-black"
              >
                <Plus className="w-4 h-4 mr-2" />
                Dodaj Novu
              </Button>
            ) : (
              <Button
                onClick={() => {
                  resetForm();
                  setView('table');
                }}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <X className="w-4 h-4 mr-2" />
                Otkaži
              </Button>
            )}
          </div>
        </motion.div>

        {/* Table View */}
        {view === 'table' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1a1a1a] border border-white/10 overflow-hidden"
          >
            {propertiesLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-[#d4af37] animate-spin" />
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-20">
                <Home className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">Nemate dodatih nekretnina</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10 hover:bg-transparent">
                      <TableHead className="text-[#d4af37] font-medium">Slika</TableHead>
                      <TableHead className="text-[#d4af37] font-medium">Naslov</TableHead>
                      <TableHead className="text-[#d4af37] font-medium">Lokacija</TableHead>
                      <TableHead className="text-[#d4af37] font-medium">Tip</TableHead>
                      <TableHead className="text-[#d4af37] font-medium">Cijena</TableHead>
                      <TableHead className="text-[#d4af37] font-medium">Status</TableHead>
                      <TableHead className="text-[#d4af37] font-medium text-right">Akcije</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id} className="border-white/5 hover:bg-white/5">
                        <TableCell>
                          <div className="w-16 h-16 bg-black overflow-hidden">
                            {property.image_url && (
                              <img src={property.image_url} alt={property.title} className="w-full h-full object-cover" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-white font-medium max-w-xs">
                          <div className="truncate">{property.title}</div>
                          {property.featured && (
                            <span className="text-[#d4af37] text-xs">Istaknuto</span>
                          )}
                        </TableCell>
                        <TableCell className="text-white/70">{property.location}</TableCell>
                        <TableCell className="text-white/70 capitalize">
                          {property.property_type?.replace('_', ' ')}
                        </TableCell>
                        <TableCell className="text-white/70">
                          {property.price_on_request ? 'Na upit' : formatPrice(property.price)}
                        </TableCell>
                        <TableCell>
                          {property.is_sold ? (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs">
                              <CheckCircle className="w-3 h-3" />
                              Prodato
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 text-xs">
                              <ShoppingBag className="w-3 h-3" />
                              Dostupno
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(property)}
                              className="text-white/70 hover:text-white hover:bg-white/10"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleSold(property)}
                              className="text-white/70 hover:text-white hover:bg-white/10"
                              title={property.is_sold ? 'Označi kao dostupno' : 'Označi kao prodato'}
                            >
                              {property.is_sold ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <CheckCircle className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setDeleteDialog({ open: true, propertyId: property.id })}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </motion.div>
        )}

        {/* Form View */}
        {view === 'form' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={handleSubmit} className="bg-[#1a1a1a] border border-white/10 rounded-lg p-6 md:p-8 space-y-8">
              {/* Basic Info */}
              <div className="space-y-6 p-6 bg-white/5 rounded-lg border border-white/10">
                <h2 className="text-xl font-light text-white flex items-center gap-3 pb-3 border-b border-[#d4af37]/30">
                  <Home className="w-5 h-5 text-[#d4af37]" />
                  Osnovne Informacije
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white/80 mb-2 block">Naslov *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                      placeholder="Npr. Luksuzna Vila sa Bazenom"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-white/80 mb-2 block">Lokacija *</Label>
                    <Input
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                      placeholder="Npr. Tivat"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-white/80 mb-2 block">Region</Label>
                    <Input
                      value={formData.region}
                      onChange={(e) => setFormData({...formData, region: e.target.value})}
                      placeholder="Npr. Porto Montenegro"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-white/80 mb-2 block">Tip Nekretnine *</Label>
                    <Select value={formData.property_type} onValueChange={(v) => setFormData({...formData, property_type: v})}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Izaberite tip" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#d4af37]/30 text-white">
                        <SelectItem value="apartman" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Apartman</SelectItem>
                        <SelectItem value="vila" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Vila</SelectItem>
                        <SelectItem value="kuca" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Kuća</SelectItem>
                        <SelectItem value="zemljiste" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Zemljište</SelectItem>
                        <SelectItem value="hotel" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Hotel</SelectItem>
                        <SelectItem value="poslovni_prostor" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Poslovni Prostor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white/80 mb-2 block">Tip Oglasa *</Label>
                    <Select value={formData.listing_type} onValueChange={(v) => setFormData({...formData, listing_type: v})}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#d4af37]/30 text-white">
                        <SelectItem value="prodaja" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Prodaja</SelectItem>
                        <SelectItem value="iznajmljivanje" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Iznajmljivanje</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white/80 mb-2 block">Kategorija / Grad</Label>
                    <Select value={formData.category} onValueChange={(v) => setFormData({...formData, category: v})}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white">
                        <SelectValue placeholder="Izaberite kategoriju" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1a1a1a] border-[#d4af37]/30 text-white max-h-[300px]">
                        <SelectItem value="porto_montenegro" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Porto Montenegro</SelectItem>
                        <SelectItem value="lustica_bay" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Luštica Bay</SelectItem>
                        <SelectItem value="portonovi" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Portonovi</SelectItem>
                        <SelectItem value="waterfront" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Waterfront</SelectItem>
                        <SelectItem value="tivat" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Tivat</SelectItem>
                        <SelectItem value="kotor" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Kotor</SelectItem>
                        <SelectItem value="budva" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Budva</SelectItem>
                        <SelectItem value="herceg_novi" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Herceg Novi</SelectItem>
                        <SelectItem value="bar" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Bar</SelectItem>
                        <SelectItem value="ulcinj" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Ulcinj</SelectItem>
                        <SelectItem value="podgorica" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Podgorica</SelectItem>
                        <SelectItem value="cetinje" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Cetinje</SelectItem>
                        <SelectItem value="niksic" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Nikšić</SelectItem>
                        <SelectItem value="bijelo_polje" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Bijelo Polje</SelectItem>
                        <SelectItem value="pljevlja" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Pljevlja</SelectItem>
                        <SelectItem value="berane" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Berane</SelectItem>
                        <SelectItem value="rozaje" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Rožaje</SelectItem>
                        <SelectItem value="plav" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Plav</SelectItem>
                        <SelectItem value="zabljak" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Žabljak</SelectItem>
                        <SelectItem value="mojkovac" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Mojkovac</SelectItem>
                        <SelectItem value="kolasin" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Kolašin</SelectItem>
                        <SelectItem value="andrijevica" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Andrijevica</SelectItem>
                        <SelectItem value="pluzine" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Plužine</SelectItem>
                        <SelectItem value="savnik" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Šavnik</SelectItem>
                        <SelectItem value="gusinje" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Gusinje</SelectItem>
                        <SelectItem value="petnjica" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Petnjica</SelectItem>
                        <SelectItem value="danilovgrad" className="text-white hover:bg-[#d4af37]/20 cursor-pointer">Danilovgrad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Price & Details */}
              <div className="space-y-6 p-6 bg-white/5 rounded-lg border border-white/10">
                <h2 className="text-xl font-light text-white flex items-center gap-3 pb-3 border-b border-[#d4af37]/30">
                  <DollarSign className="w-5 h-5 text-[#d4af37]" />
                  Cijena i Detalji
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white/80 mb-2 block">Cijena (€)</Label>
                    <Input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="Npr. 250000"
                      disabled={formData.price_on_request}
                      className="bg-white/5 border-white/10 text-white"
                    />
                    <div className="flex items-center gap-2 mt-2">
                      <Checkbox
                        id="price_on_request"
                        checked={formData.price_on_request}
                        onCheckedChange={(checked) => setFormData({...formData, price_on_request: checked})}
                        className="border-white/20"
                      />
                      <label htmlFor="price_on_request" className="text-white/60 text-sm cursor-pointer">
                        Cijena na upit
                      </label>
                    </div>
                  </div>

                  <div>
                    <Label className="text-white/80 mb-2 block">Površina (m²)</Label>
                    <Input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      placeholder="Npr. 150"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-white/80 mb-2 block">Broj Spavaćih Soba</Label>
                    <Input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                      placeholder="Npr. 3"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <Label className="text-white/80 mb-2 block">Broj Kupatila</Label>
                    <Input
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                      placeholder="Npr. 2"
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4 p-6 bg-white/5 rounded-lg border border-white/10">
                <Label className="text-white text-base font-medium">Opis Nekretnine</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Unesite detaljan opis nekretnine..."
                  rows={6}
                  className="bg-white/5 border-white/10 text-white resize-none"
                />
              </div>

              {/* Features */}
              <div className="space-y-4 p-6 bg-white/5 rounded-lg border border-white/10">
                <Label className="text-white text-base font-medium">Karakteristike</Label>
                <div className="flex gap-2">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    placeholder="Npr. Bazen, Pogled na more..."
                    className="bg-white/5 border-white/10 text-white"
                  />
                  <Button
                    type="button"
                    onClick={addFeature}
                    className="bg-[#d4af37] hover:bg-[#b8960c] text-black"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 px-3 py-1 bg-[#d4af37]/20 border border-[#d4af37]/30 text-white text-sm">
                        <Check className="w-3 h-3 text-[#d4af37]" />
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="ml-1 text-white/60 hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Images */}
              <div className="space-y-6 p-6 bg-white/5 rounded-lg border border-white/10">
                <h2 className="text-xl font-light text-white flex items-center gap-3 pb-3 border-b border-[#d4af37]/30">
                  <ImageIcon className="w-5 h-5 text-[#d4af37]" />
                  Slike
                </h2>

                {/* Main Image */}
                <div>
                  <Label className="text-white/80 mb-3 block">Glavna Slika *</Label>
                  {mainImagePreview ? (
                    <div className="relative">
                      <img src={mainImagePreview} alt="Preview" className="w-full h-64 object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setMainImage(null);
                          setMainImagePreview('');
                        }}
                        className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="block w-full h-64 border-2 border-dashed border-white/20 hover:border-[#d4af37]/50 cursor-pointer transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleMainImageChange}
                        className="hidden"
                      />
                      <div className="h-full flex flex-col items-center justify-center gap-3 text-white/60">
                        <Upload className="w-12 h-12" />
                        <p>Kliknite ili prevucite sliku</p>
                        <p className="text-sm">PNG, JPG, JPEG, WEBP do 10MB</p>
                      </div>
                    </label>
                  )}
                </div>

                {/* Gallery */}
                <div>
                  <Label className="text-white/80 mb-3 block">Galerija Slika (Opcionalno)</Label>
                  <label className="block w-full p-6 border-2 border-dashed border-white/20 hover:border-[#d4af37]/50 cursor-pointer transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryImagesChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-2 text-white/60">
                      <Plus className="w-8 h-8" />
                      <p className="text-sm">Dodaj više slika</p>
                    </div>
                  </label>

                  {galleryPreviews.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                      {galleryPreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img src={preview} alt={`Gallery ${index + 1}`} className="w-full h-32 object-cover" />
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(index)}
                            className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center gap-3 p-4 bg-[#d4af37]/10 border border-[#d4af37]/30">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({...formData, featured: checked})}
                  className="border-[#d4af37]"
                />
                <label htmlFor="featured" className="text-white cursor-pointer">
                  <span className="font-medium">Istaknuta Nekretnina</span>
                  <p className="text-white/60 text-sm">Ova nekretnina će biti prikazana na početnoj stranici</p>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={createPropertyMutation.isPending || uploadingImages}
                  className="flex-1 bg-[#d4af37] hover:bg-[#b8960c] text-black py-6 text-lg tracking-wider uppercase"
                >
                  {createPropertyMutation.isPending || uploadingImages ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {uploadingImages ? 'Upload Slika...' : (editingProperty ? 'Ažuriranje...' : 'Dodavanje...')}
                    </>
                  ) : (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      {editingProperty ? 'Ažuriraj Oglas' : 'Postavi Oglas'}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open, propertyId: null })}>
          <DialogContent className="bg-[#1a1a1a] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl">Potvrda Brisanja</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-white/70">Da li ste sigurni da želite obrisati ovu nekretninu?</p>
              <p className="text-white/50 text-sm mt-2">Ova akcija se može poništiti kasnije.</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setDeleteDialog({ open: false, propertyId: null })}
                className="flex-1 border-white/20 text-white hover:bg-white/10"
              >
                Otkaži
              </Button>
              <Button
                onClick={() => deletePropertyMutation.mutate(deleteDialog.propertyId)}
                disabled={deletePropertyMutation.isPending}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {deletePropertyMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Obriši'
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}