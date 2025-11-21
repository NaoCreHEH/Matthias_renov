import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";
import { Menu, X, Settings, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Vérifier si l'utilisateur est connecté
  const { data: authData } = trpc.auth.me.useQuery(undefined, {
    retry: false,
  });

  useEffect(() => {
    if (authData) {
      setIsLoggedIn(true);
      setUserRole(authData.role);
    } else {
      setIsLoggedIn(false);
      setUserRole(null);
    }
  }, [authData]);

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      setIsLoggedIn(false);
      setUserRole(null);
      window.location.href = "/";
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navItems = [
    { label: "Accueil", href: "/" },
    { label: "Services", href: "/services" },
    { label: "À propos", href: "/about" },
    { label: "Réalisations", href: "/projects" },
    { label: "Témoignages", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ];

  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="flex items-center gap-2">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-10" />}
            <span className="font-bold text-xl text-primary hidden sm:inline">{APP_TITLE}</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-0 flex-wrap justify-center">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" className="text-foreground hover:text-primary text-sm">
                {item.label}
              </Button>
            </Link>
          ))}
        
          {/* Séparateur */}
          <div className="w-px h-6 bg-border mx-2" />
          
          {/* Admin/Login Buttons 
          {isLoggedIn && userRole === "admin" ? (
            <>
              <Link href="/admin">
                <Button
                  variant="default"
                  className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
                >
                  <Settings size={18} />
                  Admin
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex items-center gap-2 text-foreground hover:text-red-600"
              >
                <LogOut size={18} />
                Déconnexion
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button
                variant="default"
                className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
              >
                <Settings size={18} />
                Admin
              </Button>
            </Link>
          )}*/}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <div className="container py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Button>
              </Link>
            ))}

            {/* Séparateur Mobile */}
            <div className="w-full h-px bg-border my-2" />

            {/* Admin/Login Mobile 
            {isLoggedIn && userRole === "admin" ? (
              <>
                <Link href="/admin">
                  <Button
                    variant="default"
                    className="w-full justify-start bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings size={18} />
                    Admin
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full justify-start text-foreground hover:text-red-600 flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Déconnexion
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button
                  variant="default"
                  className="w-full justify-start bg-primary text-white hover:bg-primary/90 flex items-center gap-2"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings size={18} />
                  Admin
                </Button>
              </Link>
            )}*/}
          </div>
        </div>
      )}
    </nav>
  );
}
