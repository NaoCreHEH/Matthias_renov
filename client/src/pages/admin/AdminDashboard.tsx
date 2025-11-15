import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Settings,
  Users,
  FileText,
  MessageSquare,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);

  // Vérifier l'authentification
  const { data: authData, isLoading: authLoading } = trpc.auth.me.useQuery(
    undefined,
    {
      retry: false,
    }
  );

  // Récupérer les statistiques
  const { data: stats } = trpc.admin.getStats.useQuery(undefined, {
    enabled: isAdmin,
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      window.location.href = "/";
    },
  });

  useEffect(() => {
    if (!authLoading) {
      if (!authData || authData.role !== "admin") {
        setLocation("/login");
      } else {
        setIsAdmin(true);
      }
    }
  }, [authData, authLoading, setLocation]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Données pour les graphiques
  const chartData = stats
    ? [
        { name: "Services", value: stats.servicesCount },
        { name: "Projets", value: stats.projectsCount },
        { name: "Témoignages", value: stats.testimonialsCount },
        { name: "Utilisateurs", value: stats.usersCount },
      ]
    : [];

  const COLORS = ["#1e3a8a", "#dc2626", "#ea580c", "#7c3aed"];

  const adminMenuItems = [
    {
      label: "Services",
      href: "/admin/services",
      icon: FileText,
      color: "bg-blue-100 text-blue-600",
      count: stats?.servicesCount || 0,
    },
    {
      label: "Projets",
      href: "/admin/projects",
      icon: FileText,
      color: "bg-red-100 text-red-600",
      count: stats?.projectsCount || 0,
    },
    {
      label: "Témoignages",
      href: "/admin/testimonials",
      icon: MessageSquare,
      color: "bg-orange-100 text-orange-600",
      count: stats?.testimonialsCount || 0,
    },
    {
      label: "Utilisateurs",
      href: "/admin/users",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
      count: stats?.usersCount || 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Tableau de Bord Admin
            </h1>
            <p className="text-gray-600 mt-1">
              Bienvenue, {authData?.name || "Admin"}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut size={18} />
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.href}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setLocation(item.href)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      {item.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {item.count}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${item.color}`}>
                    <Icon size={24} />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-primary text-sm font-medium">
                  Gérer <ChevronRight size={16} className="ml-1" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        {stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Bar Chart */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Résumé des Contenus
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1e3a8a" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Pie Chart */}
            <Card className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Distribution des Contenus
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Actions Rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {adminMenuItems.map((item) => (
              <Button
                key={item.href}
                onClick={() => setLocation(item.href)}
                variant="outline"
                className="justify-start h-auto py-3"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium">{item.label}</span>
                  <span className="text-xs text-gray-600">
                    {item.count} élément(s)
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {/* Info Box */}
        <Card className="p-6 mt-8 bg-blue-50 border-blue-200">
          <h3 className="font-bold text-blue-900 mb-2">💡 Conseil</h3>
          <p className="text-blue-800 text-sm">
            Utilisez les cartes ci-dessus pour gérer vos services, projets,
            témoignages et utilisateurs. Vous pouvez ajouter, modifier ou
            supprimer des éléments directement depuis les pages de gestion.
          </p>
        </Card>
      </div>
    </div>
  );
}
