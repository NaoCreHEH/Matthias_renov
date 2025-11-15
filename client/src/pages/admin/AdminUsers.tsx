import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { ArrowLeft, Plus, Edit2, Trash2, Shield, User } from "lucide-react";

export default function AdminUsers() {
  const [, setLocation] = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "user" as "user" | "admin",
  });
  const [users, setUsers] = useState<any[]>([]);

  // Vérifier l'authentification
  const { data: authData, isLoading: authLoading } = trpc.auth.me.useQuery(
    undefined,
    {
      retry: false,
    }
  );

  useEffect(() => {
    if (!authLoading) {
      if (!authData || authData.role !== "admin") {
        setLocation("/login");
      } else {
        setIsAdmin(true);
      }
    }
  }, [authData, authLoading, setLocation]);

  const handleAddUser = async () => {
    if (!formData.email || !formData.password || !formData.name) {
      toast.error("L'email, le mot de passe et le nom sont requis");
      return;
    }
    try {
      // Placeholder - à connecter avec l'API réelle
      const newUser = {
        id: Date.now(),
        email: formData.email,
        name: formData.name,
        role: formData.role,
        createdAt: new Date(),
      };
      setUsers([...users, newUser]);
      toast.success("Utilisateur ajouté avec succès");
      setFormData({
        email: "",
        password: "",
        name: "",
        role: "user",
      });
      setShowForm(false);
    } catch (error) {
      toast.error("Erreur lors de l'ajout de l'utilisateur");
    }
  };

  const handleDeleteUser = (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) return;
    try {
      setUsers(users.filter((u) => u.id !== id));
      toast.success("Utilisateur supprimé avec succès");
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'utilisateur");
    }
  };

  if (authLoading || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="container py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/admin")}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={18} />
              Retour
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestion des Utilisateurs
              </h1>
              <p className="text-gray-600 mt-1">
                Gérez les utilisateurs et leurs rôles
              </p>
            </div>
          </div>

          {!showForm && (
            <Button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
            >
              <Plus size={18} />
              Nouvel Utilisateur
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* Add Form */}
        {showForm && (
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-bold mb-4">Ajouter un Utilisateur</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nom</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Nom complet"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Rôle</label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      role: e.target.value as "user" | "admin",
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleAddUser}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Ajouter
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      email: "",
                      password: "",
                      name: "",
                      role: "user",
                    });
                  }}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Users List */}
        <div className="space-y-4">
          {users.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Nom
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Rôle
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role === "admin" ? (
                            <Shield size={14} />
                          ) : (
                            <User size={14} />
                          )}
                          {user.role === "admin"
                            ? "Administrateur"
                            : "Utilisateur"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-foreground/60 text-center py-8">
              Aucun utilisateur pour le moment
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
