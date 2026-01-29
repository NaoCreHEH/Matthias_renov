import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "./button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void;
  disabled?: boolean;
  className?: string;
}

export function ImageUploader({ onUploadComplete, disabled = false, className = "" }: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const uploadMutation = trpc.upload?.uploadImage?.useMutation?.();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image valide");
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Lire le fichier en base64
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = event.target?.result as string;
        setPreview(base64Data);

        try {
          if (!uploadMutation) {
            // Fallback: utiliser directement le base64
            onUploadComplete(base64Data);
            toast.success("Image chargée avec succès");
            setIsUploading(false);
            return;
          }

          // Upload vers le stockage
          const result = await uploadMutation.mutateAsync({
            base64Data,
            fileName: file.name,
            contentType: file.type,
          });

          if (result.success && result.url) {
            onUploadComplete(result.url);
            toast.success("Image uploadée avec succès");
          } else {
            throw new Error("Échec de l'upload");
          }
        } catch (error) {
          console.error("Erreur lors de l'upload:", error);
          // Fallback: utiliser le base64
          onUploadComplete(base64Data);
          toast.warning("Image chargée localement (non uploadée sur le serveur)");
        } finally {
          setIsUploading(false);
        }
      };

      reader.onerror = () => {
        toast.error("Erreur lors de la lecture du fichier");
        setIsUploading(false);
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors du traitement de l'image");
      setIsUploading(false);
    }
  };

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Prévisualisation"
            className="w-full h-48 object-cover rounded-lg border border-border"
          />
          <button
            onClick={clearPreview}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
            disabled={isUploading}
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition ${
            disabled || isUploading
              ? "border-gray-300 bg-gray-50 cursor-not-allowed"
              : "border-primary/30 hover:border-primary bg-white hover:bg-primary/5"
          }`}
        >
          <div className="flex flex-col items-center gap-2">
            {isUploading ? (
              <>
                <Loader2 size={32} className="text-primary animate-spin" />
                <span className="text-sm text-foreground/60">Upload en cours...</span>
              </>
            ) : (
              <>
                <Upload size={32} className="text-primary" />
                <span className="text-sm font-medium text-foreground">
                  Cliquez pour sélectionner une image
                </span>
                <span className="text-xs text-foreground/60">
                  PNG, JPG, WEBP (max 5MB)
                </span>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={disabled || isUploading}
          />
        </label>
      )}
    </div>
  );
}
