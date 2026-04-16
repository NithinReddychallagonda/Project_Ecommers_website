import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import AuthModal from "@/components/AuthModal";
import Index from "./pages/Index.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import OrderSuccessPage from "./pages/OrderSuccessPage.tsx";
import AdminLoginPage from "./pages/AdminLoginPage.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import UserDashboard from "./pages/UserDashboard.tsx";
import AIRecommendation from "./pages/AIRecommendation.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Admin routes without navbar */}
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminDashboard />} />

              {/* Main routes with navbar */}
              <Route
                path="*"
                element={
                  <>
                    <Navbar />
                    <CartDrawer />
                    <AuthModal />
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/shop" element={<CategoryPage />} />
                      <Route path="/co-ords" element={<CategoryPage />} />
                      <Route path="/streetwear" element={<CategoryPage />} />
                      <Route path="/essentials" element={<CategoryPage />} />
                      <Route path="/product/:id" element={<ProductPage />} />
                      <Route path="/checkout" element={<CheckoutPage />} />
                      <Route
                        path="/order-success"
                        element={<OrderSuccessPage />}
                      />
                      <Route
                        path="/user-dashboard"
                        element={<UserDashboard />}
                      />
                      <Route
                        path="/ai-recommender"
                        element={<AIRecommendation />}
                      />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </>
                }
              />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
