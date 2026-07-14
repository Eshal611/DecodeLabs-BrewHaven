import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ShoppingCart, Search, Menu, X, Star, MapPin, Phone, Mail,
  Instagram, Twitter, Facebook, ChevronDown, ArrowRight,
  Coffee, Clock, Truck, Leaf, Heart, Award, Send, Plus
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const navLinks = ["Home", "Menu", "About", "Gallery", "Testimonials", "Contact"];

const coffeeProducts = [
  {
    id: 1,
    name: "Signature Espresso",
    desc: "Single-origin Ethiopian beans, velvety crema, dark chocolate finish.",
    price: "$5.50",
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=600&h=600&fit=crop&auto=format",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Velvet Cappuccino",
    desc: "Perfect microfoam, balanced intensity, with a whisper of cinnamon.",
    price: "$6.00",
    rating: 4.8,
    reviews: 218,
    image: "https://images.unsplash.com/photo-1563311977-d285756282dc?w=600&h=600&fit=crop&auto=format",
    badge: "Fan Favorite",
  },
  {
    id: 3,
    name: "Gold Reserve Latte",
    desc: "House oat milk, double shot, vanilla bean, edible 24k gold dust.",
    price: "$8.50",
    rating: 5.0,
    reviews: 97,
    image: "https://images.unsplash.com/photo-1742549626436-bf3c11dab212?w=600&h=600&fit=crop&auto=format",
    badge: "Premium",
  },
  {
    id: 4,
    name: "Cold Brew Reserve",
    desc: "18-hour steep, nitro-infused, cascading pour, silky mouthfeel.",
    price: "$7.00",
    rating: 4.7,
    reviews: 184,
    image: "https://images.unsplash.com/photo-1602094689189-a7cb72dc1ff9?w=600&h=600&fit=crop&auto=format",
    badge: "Cold",
  },
];

const categories = [
  { name: "Espresso", icon: "☕", color: "#3E2723" },
  { name: "Cappuccino", icon: "🫗", color: "#4E342E" },
  { name: "Latte", icon: "🥛", color: "#5D4037" },
  { name: "Mocha", icon: "🍫", color: "#6D4C41" },
  { name: "Cold Brew", icon: "🧊", color: "#37474F" },
  { name: "Iced Coffee", icon: "🧋", color: "#455A64" },
  { name: "Desserts", icon: "🍮", color: "#4E342E" },
  { name: "Bakery", icon: "🥐", color: "#5D4037" },
];

const features = [
  { icon: <Leaf className="w-6 h-6" />, title: "Organic Ingredients", desc: "Sourced from certified farms across three continents." },
  { icon: <Award className="w-6 h-6" />, title: "Premium Beans", desc: "Award-winning single-origins and masterful blends." },
  { icon: <Coffee className="w-6 h-6" />, title: "Freshly Brewed", desc: "Every cup prepared to order — never sitting, never stale." },
  { icon: <Truck className="w-6 h-6" />, title: "Fast Delivery", desc: "From our kitchen to your door in under 30 minutes." },
  { icon: <Heart className="w-6 h-6" />, title: "Cozy Atmosphere", desc: "A space designed for slow mornings and deep conversations." },
  { icon: <Clock className="w-6 h-6" />, title: "Expert Baristas", desc: "Each barista trains for 200+ hours before their first pour." },
];

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1558416165-5fb04b79b0e7?w=600&h=800&fit=crop&auto=format", alt: "Espresso machine", span: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1503240778100-fd245e17a273?w=600&h=400&fit=crop&auto=format", alt: "Latte art", span: "" },
  { src: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=600&h=400&fit=crop&auto=format", alt: "Coffee with pastries", span: "" },
  { src: "https://images.unsplash.com/photo-1771554753130-9e63a3f63e4d?w=600&h=400&fit=crop&auto=format", alt: "Cozy cafe interior", span: "" },
  { src: "https://images.unsplash.com/photo-1742549626436-bf3c11dab212?w=600&h=800&fit=crop&auto=format", alt: "Latte art closeup", span: "row-span-2" },
  { src: "https://images.unsplash.com/photo-1579265898841-79c7890d69cf?w=600&h=400&fit=crop&auto=format", alt: "Barista brewing", span: "" },
];

const testimonials = [
  {
    name: "Isabelle Fontaine",
    role: "Food Critic, Bon Vivant",
    avatar: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=120&h=120&fit=crop&auto=format",
    text: "BrewHaven is the finest café I have visited this decade. The Gold Reserve Latte is unlike anything in the city — it is art in a cup.",
    rating: 5,
  },
  {
    name: "Marcus Webb",
    role: "Coffee Roaster & Enthusiast",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&h=120&fit=crop&auto=format",
    text: "I can taste the terroir in every single shot. The beans speak for themselves and the baristas know exactly how to let them.",
    rating: 5,
  },
  {
    name: "Senna Okafor",
    role: "Interior Designer",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=120&h=120&fit=crop&auto=format",
    text: "I come here to think, to draw, to breathe. The atmosphere is as carefully curated as any gallery I have ever been in.",
    rating: 5,
  },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function FloatingBean({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={style}
    >
      <div
        className="w-8 h-5 rounded-full"
        style={{
          background: "radial-gradient(ellipse at 40% 35%, #8B6914, #3E2723)",
          boxShadow: "0 2px 8px rgba(212,175,55,0.25), inset 0 1px 2px rgba(255,255,255,0.1)",
          position: "relative",
        }}
      >
        <div
          className="absolute"
          style={{
            top: "50%",
            left: "10%",
            right: "10%",
            height: "1.5px",
            background: "rgba(0,0,0,0.4)",
            borderRadius: "99px",
            transform: "translateY(-50%) rotate(-10deg)",
          }}
        />
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className="w-3.5 h-3.5"
          fill={s <= Math.round(rating) ? "#D4AF37" : "transparent"}
          stroke="#D4AF37"
        />
      ))}
    </div>
  );
}

function GoldButton({
  children,
  variant = "solid",
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm tracking-wide transition-all duration-300 cursor-pointer select-none";
  const solid =
    "bg-[#D4AF37] text-[#1A1412] hover:bg-[#E8C547] hover:shadow-[0_0_24px_rgba(212,175,55,0.5)] active:scale-95";
  const outline =
    "border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] active:scale-95";
  return (
    <button className={`${base} ${variant === "solid" ? solid : outline} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

// ─── Sections ──────────────────────────────────────────────────────────────────

function Navbar({ cartCount }: { cartCount: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(26,20,18,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(212,175,55,0.12)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#1A1412] font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #D4AF37, #8B6914)" }}
          >
            BH
          </div>
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: "#FFF8E1" }}
          >
            BrewHaven
          </span>
        </div>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className="text-sm font-medium tracking-wide transition-colors duration-200"
                style={{ color: "#D7CCC8", fontFamily: "'Outfit', sans-serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#D7CCC8")}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="hidden md:flex text-[#D7CCC8] hover:text-[#D4AF37] transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="relative text-[#D7CCC8] hover:text-[#D4AF37] transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4.5 h-4.5 rounded-full bg-[#D4AF37] text-[#1A1412] text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden text-[#D7CCC8] hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 flex flex-col gap-4"
          style={{ background: "rgba(26,20,18,0.97)", backdropFilter: "blur(20px)" }}
        >
          {navLinks.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-[#D7CCC8] hover:text-[#D4AF37] text-sm font-medium transition-colors"
              style={{ fontFamily: "'Outfit', sans-serif" }}
              onClick={() => setMobileOpen(false)}
            >
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero({ onOrder }: { onOrder: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const beans = [
    { top: "15%", left: "8%", animDelay: "0s", animDur: "6s" },
    { top: "25%", left: "85%", animDelay: "1s", animDur: "7s" },
    { top: "65%", left: "12%", animDelay: "2s", animDur: "5.5s" },
    { top: "70%", left: "80%", animDelay: "0.5s", animDur: "8s" },
    { top: "40%", left: "5%", animDelay: "1.5s", animDur: "6.5s" },
    { top: "50%", left: "90%", animDelay: "3s", animDur: "7.5s" },
    { top: "80%", left: "55%", animDelay: "2.5s", animDur: "6s" },
    { top: "10%", left: "60%", animDelay: "0.8s", animDur: "5s" },
  ];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #1A1412 0%, #231917 50%, #1A1412 100%)" }}
    >
      {/* Radial glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(62,39,35,0.6) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 30% at 50% 55%, rgba(212,175,55,0.07) 0%, transparent 60%)",
        }}
      />

      {/* Floating beans */}
      <style>{`
        @keyframes floatBean {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-18px) rotate(8deg); }
          66% { transform: translateY(8px) rotate(-5deg); }
        }
        @keyframes steamRise {
          0% { opacity: 0; transform: translateX(-50%) scaleX(1) translateY(0); }
          30% { opacity: 0.6; }
          80% { opacity: 0.3; transform: translateX(-50%) scaleX(1.4) translateY(-60px); }
          100% { opacity: 0; transform: translateX(-50%) scaleX(0.8) translateY(-90px); }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 40px rgba(212,175,55,0.15), 0 0 80px rgba(212,175,55,0.05); }
          50% { box-shadow: 0 0 60px rgba(212,175,55,0.25), 0 0 120px rgba(212,175,55,0.1); }
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        .scroll-indicator { animation: scrollBounce 2s ease-in-out infinite; }
      `}</style>

      {beans.map((b, i) => (
        <FloatingBean
          key={i}
          style={{
            top: b.top,
            left: b.left,
            animation: `floatBean ${b.animDur} ease-in-out infinite`,
            animationDelay: b.animDelay,
            opacity: 0.7,
          }}
        />
      ))}

      {/* Hero content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
          style={{
            border: "1px solid rgba(212,175,55,0.3)",
            background: "rgba(212,175,55,0.08)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-xs font-medium tracking-widest uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Est. 2015 · Artisan Coffee House
          </span>
        </motion.div>

        {/* Central coffee cup illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative mx-auto mb-6"
          style={{ width: 220, height: 220 }}
        >
          {/* Glow ring */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              animation: "pulseGlow 3s ease-in-out infinite",
              background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
            }}
          />
          {/* Cup */}
          <img
            src="https://images.unsplash.com/photo-1610889556528-9a770e32642f?w=400&h=400&fit=crop&auto=format"
            alt="Premium espresso"
            className="w-full h-full object-cover rounded-full"
            style={{
              border: "2px solid rgba(212,175,55,0.25)",
              boxShadow: "0 0 60px rgba(212,175,55,0.15), 0 30px 80px rgba(0,0,0,0.6)",
            }}
          />
          {/* Steam */}
          {["-8px", "0px", "8px"].map((offset, i) => (
            <div
              key={i}
              className="absolute bottom-full"
              style={{
                left: `calc(50% + ${offset})`,
                width: "4px",
                height: "30px",
                borderRadius: "99px",
                background: "linear-gradient(to top, rgba(255,248,225,0.4), transparent)",
                animation: `steamRise ${2 + i * 0.4}s ease-out infinite`,
                animationDelay: `${i * 0.6}s`,
              }}
            />
          ))}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="text-6xl md:text-8xl font-bold leading-none mb-4 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: "#FFF8E1" }}
        >
          Welcome to{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #D4AF37, #F0D060, #8B6914)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            BrewHaven
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-[#A89080] mb-10 max-w-xl mx-auto leading-relaxed"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Crafted with Passion. Brewed to Perfection.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <GoldButton onClick={onOrder}>
            Order Now <ArrowRight className="w-4 h-4" />
          </GoldButton>
          <GoldButton variant="outline">
            Explore Menu <Coffee className="w-4 h-4" />
          </GoldButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="scroll-indicator mt-20 flex flex-col items-center gap-2"
        >
          <span className="text-[#A89080] text-xs tracking-widest uppercase" style={{ fontFamily: "'DM Mono', monospace" }}>
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-[#D4AF37]" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FeaturedCoffee({ onAddToCart }: { onAddToCart: () => void }) {
  return (
    <section id="menu" className="py-28 px-6" style={{ background: "#1A1412" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-xs tracking-widest uppercase font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
            Our Craft
          </span>
          <h2
            className="text-5xl md:text-6xl font-bold mt-3 mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: "#FFF8E1" }}
          >
            Featured Selections
          </h2>
          <p className="text-[#A89080] max-w-lg mx-auto" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Each drink is a study in balance — sourced, roasted, and poured with unwavering attention.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coffeeProducts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: "linear-gradient(160deg, #231917, #1E1614)",
                border: "1px solid rgba(212,175,55,0.12)",
                boxShadow: "0 4px 40px rgba(0,0,0,0.4)",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 8px 60px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.1)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 40px rgba(0,0,0,0.4)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.12)";
              }}
            >
              {/* Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide"
                  style={{
                    background: "rgba(212,175,55,0.15)",
                    border: "1px solid rgba(212,175,55,0.3)",
                    color: "#D4AF37",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {p.badge}
                </span>
              </div>

              {/* Image */}
              <div className="h-52 overflow-hidden bg-[#2C1F1A]">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3
                  className="text-lg font-bold text-[#FFF8E1] mb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {p.name}
                </h3>
                <p
                  className="text-[#A89080] text-sm leading-relaxed mb-4 flex-1"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {p.desc}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <StarRating rating={p.rating} />
                  <span className="text-[#D4AF37] text-xs font-semibold" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {p.rating}
                  </span>
                  <span className="text-[#A89080] text-xs">({p.reviews})</span>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      background: "linear-gradient(135deg, #D4AF37, #8B6914)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {p.price}
                  </span>
                  <button
                    onClick={onAddToCart}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300"
                    style={{
                      background: "rgba(212,175,55,0.1)",
                      border: "1px solid rgba(212,175,55,0.25)",
                      color: "#D4AF37",
                      fontFamily: "'Outfit', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#D4AF37";
                      (e.currentTarget as HTMLButtonElement).style.color = "#1A1412";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.1)";
                      (e.currentTarget as HTMLButtonElement).style.color = "#D4AF37";
                    }}
                  >
                    <Plus className="w-3.5 h-3.5" /> Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="py-20 px-6" style={{ background: "#161210" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-[#D4AF37] text-xs tracking-widest uppercase font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
            Browse
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold mt-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "#FFF8E1" }}
          >
            Explore by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.04 }}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl cursor-pointer transition-all duration-300"
              style={{
                background: "rgba(35,25,23,0.8)",
                border: "1px solid rgba(212,175,55,0.1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.35)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(62,39,35,0.6)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.1)";
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(35,25,23,0.8)";
              }}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span
                className="text-xs font-medium text-[#D7CCC8] text-center leading-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {cat.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { value: "10+", label: "Years of Excellence" },
    { value: "50+", label: "Coffee Varieties" },
    { value: "1000+", label: "Happy Customers" },
  ];

  return (
    <section id="about" className="py-28 px-6" style={{ background: "#1A1412" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.12)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1767418238663-d79db1fb7f78?w=800&h=640&fit=crop&auto=format"
              alt="BrewHaven cafe interior"
              className="w-full h-[480px] object-cover"
            />
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(26,20,18,0.4), transparent)" }}
            />
          </div>

          {/* Floating stat card */}
          <div
            className="absolute -bottom-6 -right-6 p-5 rounded-2xl"
            style={{
              background: "rgba(35,25,23,0.9)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(212,175,55,0.2)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <div className="text-[#FFF8E1] font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Award-Winning
                </div>
                <div className="text-[#A89080] text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Best Café · 2023 & 2024
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[#D4AF37] text-xs tracking-widest uppercase font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
            Our Story
          </span>
          <h2
            className="text-5xl md:text-6xl font-bold mt-3 mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: "#FFF8E1" }}
          >
            A Sanctuary for Coffee Lovers
          </h2>
          <p
            className="text-[#A89080] leading-relaxed mb-6"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Founded in 2015 by master barista Elena Marchetti, BrewHaven was born from a singular obsession: to serve the most honest cup of coffee in the city. We source directly from farmers in Ethiopia, Colombia, and Guatemala — relationships built over years of trust, not transactions.
          </p>
          <p
            className="text-[#A89080] leading-relaxed mb-10"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Every bean that enters our roastery is tasted, adjusted, and tasted again. We believe great coffee is not an accident — it is a discipline.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-10">
            {stats.map((s) => (
              <div key={s.value} className="text-center">
                <div
                  className="text-4xl font-bold mb-1"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    background: "linear-gradient(135deg, #D4AF37, #8B6914)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {s.value}
                </div>
                <div className="text-[#A89080] text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <GoldButton>
            Learn More <ArrowRight className="w-4 h-4" />
          </GoldButton>
        </motion.div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="py-28 px-6" style={{ background: "#161210" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-xs tracking-widest uppercase font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
            Why BrewHaven
          </span>
          <h2
            className="text-5xl md:text-6xl font-bold mt-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "#FFF8E1" }}
          >
            The Difference is in the Details
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-7 rounded-2xl transition-all duration-300"
              style={{
                background: "rgba(35,25,23,0.6)",
                border: "1px solid rgba(212,175,55,0.1)",
                backdropFilter: "blur(10px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.3)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(35,25,23,0.9)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.1)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(35,25,23,0.6)";
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-[#D4AF37]"
                style={{ background: "rgba(212,175,55,0.1)" }}
              >
                {f.icon}
              </div>
              <h3
                className="text-xl font-bold text-[#FFF8E1] mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {f.title}
              </h3>
              <p className="text-[#A89080] text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="py-28 px-6" style={{ background: "#1A1412" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-xs tracking-widest uppercase font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
            Visual Diary
          </span>
          <h2
            className="text-5xl md:text-6xl font-bold mt-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "#FFF8E1" }}
          >
            Inside BrewHaven
          </h2>
        </motion.div>

        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "220px",
          }}
        >
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`overflow-hidden rounded-2xl group cursor-pointer ${img.span}`}
              style={{
                border: "1px solid rgba(212,175,55,0.1)",
                boxShadow: "0 4px 30px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-28 px-6" style={{ background: "#161210" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-[#D4AF37] text-xs tracking-widest uppercase font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
            Voices
          </span>
          <h2
            className="text-5xl md:text-6xl font-bold mt-3"
            style={{ fontFamily: "'Playfair Display', serif", color: "#FFF8E1" }}
          >
            What Our Guests Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="p-8 rounded-2xl relative overflow-hidden"
              style={{
                background: "rgba(35,25,23,0.5)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(212,175,55,0.15)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              {/* Glass shine */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }}
              />

              {/* Quote mark */}
              <div
                className="text-7xl leading-none font-bold mb-4 -mt-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  background: "linear-gradient(135deg, rgba(212,175,55,0.3), rgba(212,175,55,0.05))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                "
              </div>

              <p
                className="text-[#D7CCC8] leading-relaxed mb-6 text-sm"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {t.text}
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover"
                  style={{ border: "2px solid rgba(212,175,55,0.3)" }}
                />
                <div>
                  <div
                    className="text-[#FFF8E1] font-semibold text-sm"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {t.name}
                  </div>
                  <div className="text-[#A89080] text-xs" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {t.role}
                  </div>
                </div>
                <div className="ml-auto">
                  <StarRating rating={t.rating} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = {
    background: "rgba(44,31,26,0.6)",
    border: "1px solid rgba(212,175,55,0.15)",
    borderRadius: "12px",
    color: "#FFF8E1",
    fontFamily: "'Outfit', sans-serif",
    padding: "14px 18px",
    width: "100%",
    outline: "none",
    transition: "border-color 0.2s",
  } as React.CSSProperties;

  return (
    <section id="contact" className="py-28 px-6" style={{ background: "#1A1412" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-[#D4AF37] text-xs tracking-widest uppercase font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
            Get in Touch
          </span>
          <h2
            className="text-5xl md:text-6xl font-bold mt-3 mb-8 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: "#FFF8E1" }}
          >
            Visit Us, or Say Hello
          </h2>

          <div className="space-y-5 mb-10">
            {[
              { icon: <MapPin className="w-5 h-5" />, label: "Location", val: "14 Roast Lane, Caffè Quarter, NY 10001" },
              { icon: <Phone className="w-5 h-5" />, label: "Phone", val: "+1 (212) 555-0174" },
              { icon: <Mail className="w-5 h-5" />, label: "Email", val: "hello@brewhaven.co" },
              { icon: <Clock className="w-5 h-5" />, label: "Hours", val: "Mon–Fri 7am–9pm · Sat–Sun 8am–10pm" },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-[#D4AF37]"
                  style={{ background: "rgba(212,175,55,0.1)" }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="text-[#A89080] text-xs mb-0.5" style={{ fontFamily: "'DM Mono', monospace" }}>
                    {item.label}
                  </div>
                  <div className="text-[#D7CCC8] text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {item.val}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(212,175,55,0.12)", height: 200 }}
          >
            <img
              src="https://images.unsplash.com/photo-1691067987594-b1b7f84ba55a?w=800&h=400&fit=crop&auto=format"
              alt="Café location area"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="px-4 py-2 rounded-full text-xs font-medium"
                style={{ background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", color: "#D4AF37" }}
              >
                <MapPin className="w-3 h-3 inline mr-1" />
                14 Roast Lane, New York
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="p-8 rounded-2xl"
            style={{
              background: "rgba(35,25,23,0.5)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(212,175,55,0.12)",
              boxShadow: "0 8px 60px rgba(0,0,0,0.4)",
            }}
          >
            <h3
              className="text-2xl font-bold text-[#FFF8E1] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[#A89080] text-xs mb-2 block" style={{ fontFamily: "'DM Mono', monospace" }}>
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Elena Marchetti"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.15)")}
                />
              </div>
              <div>
                <label className="text-[#A89080] text-xs mb-2 block" style={{ fontFamily: "'DM Mono', monospace" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.15)")}
                />
              </div>
              <div>
                <label className="text-[#A89080] text-xs mb-2 block" style={{ fontFamily: "'DM Mono', monospace" }}>
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="I would love to learn more about your seasonal menu..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.15)")}
                />
              </div>
              <GoldButton className="w-full justify-center">
                {sent ? "Message Sent!" : (
                  <>Send Message <Send className="w-4 h-4" /></>
                )}
              </GoldButton>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section
      className="py-20 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #3E2723, #231917)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)" }}
      />
      <div className="max-w-2xl mx-auto text-center relative z-10">
        <h2
          className="text-4xl md:text-5xl font-bold text-[#FFF8E1] mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Stay in the Loop
        </h2>
        <p className="text-[#A89080] mb-8" style={{ fontFamily: "'Outfit', sans-serif" }}>
          Seasonal menus, limited roasts, and exclusive offers — delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-5 py-3.5 rounded-full text-sm text-[#FFF8E1] placeholder-[#A89080] outline-none"
            style={{
              background: "rgba(26,20,18,0.6)",
              border: "1px solid rgba(212,175,55,0.2)",
              fontFamily: "'Outfit', sans-serif",
            }}
          />
          <GoldButton>Subscribe</GoldButton>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="py-16 px-6"
      style={{ background: "#111009", borderTop: "1px solid rgba(212,175,55,0.1)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#1A1412] font-bold text-sm"
                style={{ background: "linear-gradient(135deg, #D4AF37, #8B6914)" }}
              >
                BH
              </div>
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "'Playfair Display', serif", color: "#FFF8E1" }}
              >
                BrewHaven
              </span>
            </div>
            <p className="text-[#A89080] text-sm leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Where every cup tells a story of craft, origin, and care.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#A89080] hover:text-[#D4AF37] transition-colors"
                  style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.15)" }}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Discover", links: ["Our Story", "Menu", "Reservations", "Gift Cards", "Loyalty Program"] },
            { title: "Support", links: ["FAQs", "Contact Us", "Allergen Info", "Accessibility", "Press"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4
                className="text-[#FFF8E1] font-semibold text-sm mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[#A89080] text-sm hover:text-[#D4AF37] transition-colors"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(212,175,55,0.08)" }}
        >
          <p className="text-[#A89080] text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>
            © 2026 BrewHaven. All rights reserved.
          </p>
          <p className="text-[#A89080] text-xs" style={{ fontFamily: "'DM Mono', monospace" }}>
            Crafted with ♥ for coffee lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => setCartCount((n) => n + 1);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.style.overflowX = "hidden";
    document.body.style.fontFamily = "'Outfit', sans-serif";
    // Hide scrollbar while keeping scrollability
    const style = document.createElement("style");
    style.textContent = `
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #1A1412; }
      ::-webkit-scrollbar-thumb { background: rgba(212,175,55,0.3); border-radius: 99px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(212,175,55,0.5); }
      html { scroll-behavior: smooth; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar cartCount={cartCount} />
      <Hero onOrder={addToCart} />
      <FeaturedCoffee onAddToCart={addToCart} />
      <Categories />
      <About />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <Contact />
      <Newsletter />
      <Footer />
    </div>
  );
}
