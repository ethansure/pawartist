"use client";

import { petTypes, backgroundOptions } from "@/lib/styles";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PetSelectorProps {
  selectedPetType: string;
  onSelectPetType: (type: string) => void;
  selectedBackground: string;
  onSelectBackground: (bg: string) => void;
}

export function PetSelector({
  selectedPetType,
  onSelectPetType,
  selectedBackground,
  onSelectBackground,
}: PetSelectorProps) {
  return (
    <div className="space-y-6">
      {/* Pet Type Selection */}
      <div>
        <Label className="text-base font-semibold mb-3 block">
          What kind of pet is this?
        </Label>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {petTypes.map((pet) => (
            <button
              key={pet.id}
              onClick={() => onSelectPetType(pet.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all",
                selectedPetType === pet.id
                  ? "border-primary bg-primary/5"
                  : "border-transparent bg-muted hover:border-primary/50"
              )}
            >
              <span className="text-2xl">{pet.emoji}</span>
              <span className="text-xs font-medium">{pet.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Background Selection */}
      <div>
        <Label className="text-base font-semibold mb-3 block">
          Background preference
        </Label>
        <Select value={selectedBackground} onValueChange={onSelectBackground}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select background" />
          </SelectTrigger>
          <SelectContent>
            {backgroundOptions.map((bg) => (
              <SelectItem key={bg.id} value={bg.id}>
                <div className="flex flex-col">
                  <span className="font-medium">{bg.name}</span>
                  <span className="text-xs text-muted-foreground">{bg.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
