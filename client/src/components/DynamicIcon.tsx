// client/src/components/DynamicIcon.tsx

import { createElement } from "react";
import * as LucideIcons from "lucide-react";

interface DynamicIconProps extends LucideIcons.LucideProps {
  name: string; // Changé de keyof typeof LucideIcons à string pour plus de flexibilité
}

/**
 * Charge dynamiquement une icône de Lucide React par son nom.
 * Retourne null si l'icône n'est pas trouvée.
 */
export const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
  // On vérifie si le nom existe dans la liste des icônes Lucide
  const IconComponent = LucideIcons[name as keyof typeof LucideIcons];

  if (!IconComponent || typeof IconComponent !== 'function') {
    // Retourne null si ce n'est pas une icône Lucide (ce sera un emoji ou une autre chaîne)
    return null; 
  }

  return createElement(IconComponent as React.ComponentType<LucideIcons.LucideProps>, { ...props });
};
