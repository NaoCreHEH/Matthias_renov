import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Trash2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function AdminContact() {
  const [, setLocation] = useLocation();
  const { data: messages, refetch } = trpc.contact.getMessages.useQuery();
  const markAsReadMutation = trpc.contact.markAsRead.useMutation();
  const deleteMutation = trpc.contact.deleteMessage.useMutation();
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsReadMutation.mutateAsync(id);
      toast.success("Message marqué comme lu");
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Message supprimé");
      setSelectedMessage(null);
      refetch();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
    }
  };

  const unreadCount = messages?.filter((m) => m.isRead === 0).length || 0;

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
                Messages de Contact
              </h1>
              <p className="text-gray-600 mt-1">
                {messages?.length || 0} message(s) - {unreadCount} non lu(s)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {messages && messages.length > 0 ? (
                messages.map((message) => (
                  <Card
                    key={message.id}
                    onClick={() => setSelectedMessage(message)}
                    className={`p-4 cursor-pointer transition-all ${
                      selectedMessage?.id === message.id
                        ? "ring-2 ring-primary bg-primary/5"
                        : "hover:shadow-md"
                    } ${message.isRead === 0 ? "border-l-4 border-l-primary" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {message.name}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {message.subject}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(message.createdAt).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      {message.isRead === 0 && (
                        <div className="w-2 h-2 bg-primary rounded-full ml-2 mt-1" />
                      )}
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center text-gray-600">
                  <p>Aucun message pour le moment</p>
                </Card>
              )}
            </div>
          </div>

          {/* Message Details */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedMessage.subject}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      De : <span className="font-semibold">{selectedMessage.name}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleMarkAsRead(selectedMessage.id)
                      }
                      className="flex items-center gap-1"
                    >
                      {selectedMessage.isRead === 0 ? (
                        <>
                          <Eye size={16} />
                          Marquer comme lu
                        </>
                      ) : (
                        <>
                          <EyeOff size={16} />
                          Marquer comme non lu
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(selectedMessage.id)}
                      className="text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <Trash2 size={16} />
                      Supprimer
                    </Button>
                  </div>
                </div>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="text-gray-900 mt-1">{selectedMessage.email}</p>
                  </div>

                  {selectedMessage.phone && (
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Téléphone
                      </label>
                      <p className="text-gray-900 mt-1">{selectedMessage.phone}</p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <p className="text-gray-900 mt-1">
                      {new Date(selectedMessage.createdAt).toLocaleString("fr-FR")}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Message
                  </label>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-900 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center">
                <p className="text-gray-600 text-lg">
                  Sélectionnez un message pour voir les détails
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
