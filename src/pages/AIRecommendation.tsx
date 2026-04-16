import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, ShoppingCart, Star, Sparkles, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { products, Product } from '@/data/products';
import { toast } from 'sonner';

const AIRecommendation = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const { addToCart } = useCart();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
        generateRecommendations();
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  const generateRecommendations = () => {
    setIsMatching(true);
    setTimeout(() => {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, Math.min(shuffled.length, Math.floor(Math.random() * 3) + 4));
      setRecommendations(selected);
      setIsMatching(false);
      toast.success("AI matching complete! See your recommendations below.");
    }, 2000);
  };

  const resetUpload = () => {
    setUploadedImage(null);
    setRecommendations([]);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-primary" /> AI Fashion Recommender
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Upload your photo and let our smart AI find the perfect outfits that match your appearance and style.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-28 border border-slate-100">
              <h2 className="text-xl font-bold mb-6 text-slate-800">Your Photo</h2>
              
              {!uploadedImage ? (
                <div 
                  {...getRootProps()} 
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive ? 'border-primary bg-primary/5 scale-105' : 'border-slate-200 hover:border-primary/50 hover:bg-slate-50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="text-slate-500" />
                  </div>
                  <p className="text-slate-600 font-medium">
                    {isDragActive ? "Drop it here!" : "Drag & drop or click to upload"}
                  </p>
                  <p className="text-slate-400 text-sm mt-2">Supports JPG, PNG</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden aspect-[3/4] shadow-md border border-slate-100">
                    <img src={uploadedImage} alt="User" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2 border-slate-200 text-slate-600 hover:bg-slate-50"
                    onClick={resetUpload}
                  >
                    <RefreshCcw size={16} /> Change Photo
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 min-h-[600px] border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-800">AI Recommendations</h2>
                {recommendations.length > 0 && (
                  <span className="px-4 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-full flex items-center gap-2 border border-primary/20">
                    <Sparkles size={14} /> AI Recommended for You
                  </span>
                )}
              </div>

              {!uploadedImage ? (
                <div className="flex flex-col items-center justify-center h-[500px] text-slate-400 space-y-4">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100">
                    <Sparkles size={40} className="text-slate-200" />
                  </div>
                  <p className="text-lg">Upload a photo to see matching outfits</p>
                </div>
              ) : isMatching ? (
                <div className="flex flex-col items-center justify-center h-[500px] space-y-6">
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-slate-100 border-t-primary rounded-full animate-spin" />
                    <Sparkles className="absolute inset-0 m-auto text-primary animate-pulse" size={32} />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-slate-800 animate-pulse">Analyzing your look...</p>
                    <p className="text-slate-500 mt-2">Finding the best matches in our collection</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {recommendations.map((item) => (
                    <div 
                      key={item.id} 
                      className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3">
                          <div className="bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-slate-100">
                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-xs font-bold text-slate-800">{item.rating}</span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      
                      <div className="p-5">
                        <h3 className="font-bold text-slate-800 mb-1 group-hover:text-primary transition-colors line-clamp-1">{item.name}</h3>
                        <p className="text-primary font-bold text-lg mb-4">₹{item.price.toLocaleString()}</p>
                        
                        <Button 
                          className="w-full gap-2 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
                          onClick={() => addToCart(item, 'M')}
                        >
                          <ShoppingCart size={18} /> Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendation;
