import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Edit2, Save, MapPin, University, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface LocationManagementProps {
  // These would come from your database in a real app
  states: string[];
  universities: string[];
  pricingRules: Array<{
    id: string;
    from: string;
    to: string;
    basePrice: number;
    pricePerKm?: number;
  }>;
  onAddState: (state: string) => void;
  onRemoveState: (state: string) => void;
  onAddUniversity: (university: string) => void;
  onRemoveUniversity: (university: string) => void;
  onUpdatePricing: (rule: any) => void;
  onAddPricing: (rule: any) => void;
  onRemovePricing: (id: string) => void;
}

const LocationManagement: React.FC<LocationManagementProps> = ({
  states,
  universities,
  pricingRules,
  onAddState,
  onRemoveState,
  onAddUniversity,
  onRemoveUniversity,
  onUpdatePricing,
  onAddPricing,
  onRemovePricing
}) => {
  const [newState, setNewState] = useState("");
  const [newUniversity, setNewUniversity] = useState("");
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [newPricing, setNewPricing] = useState({
    from: "",
    to: "",
    basePrice: 0
  });

  const handleAddState = () => {
    if (newState.trim() && !states.includes(newState.trim())) {
      onAddState(newState.trim());
      setNewState("");
      toast.success(`Added state: ${newState.trim()}`);
    } else {
      toast.error("State already exists or is empty");
    }
  };

  const handleAddUniversity = () => {
    if (newUniversity.trim() && !universities.includes(newUniversity.trim())) {
      onAddUniversity(newUniversity.trim());
      setNewUniversity("");
      toast.success(`Added university: ${newUniversity.trim()}`);
    } else {
      toast.error("University already exists or is empty");
    }
  };

  const handleAddPricing = () => {
    if (newPricing.from && newPricing.to && newPricing.basePrice > 0) {
      onAddPricing({
        id: Date.now().toString(),
        ...newPricing
      });
      setNewPricing({ from: "", to: "", basePrice: 0 });
      toast.success("Added new pricing rule");
    } else {
      toast.error("Please fill all fields with valid values");
    }
  };

  return (
    <div className="space-y-6">
      {/* States Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="mr-2 h-5 w-5" />
            Manage States
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter new state name"
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddState()}
              />
              <Button onClick={handleAddState}>
                <Plus className="h-4 w-4 mr-1" />
                Add State
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {states.map((state) => (
                <Badge key={state} variant="outline" className="flex items-center gap-1">
                  {state}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => {
                      onRemoveState(state);
                      toast.success(`Removed state: ${state}`);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Universities Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <University className="mr-2 h-5 w-5" />
            Manage Universities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter new university name"
                value={newUniversity}
                onChange={(e) => setNewUniversity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddUniversity()}
              />
              <Button onClick={handleAddUniversity}>
                <Plus className="h-4 w-4 mr-1" />
                Add University
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {universities.map((university) => (
                <Badge key={university} variant="outline" className="flex items-center gap-1">
                  {university}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => {
                      onRemoveUniversity(university);
                      toast.success(`Removed university: ${university}`);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Manage Ride Pricing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Add New Pricing Rule */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <div>
                <Label>From</Label>
                <Input
                  placeholder="Departure location"
                  value={newPricing.from}
                  onChange={(e) => setNewPricing({ ...newPricing, from: e.target.value })}
                />
              </div>
              <div>
                <Label>To</Label>
                <Input
                  placeholder="Destination"
                  value={newPricing.to}
                  onChange={(e) => setNewPricing({ ...newPricing, to: e.target.value })}
                />
              </div>
              <div>
                <Label>Base Price (₦)</Label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={newPricing.basePrice || ""}
                  onChange={(e) => setNewPricing({ ...newPricing, basePrice: Number(e.target.value) })}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleAddPricing} className="w-full">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Rule
                </Button>
              </div>
            </div>

            {/* Existing Pricing Rules */}
            <div className="space-y-2">
              <h4 className="font-medium">Existing Pricing Rules</h4>
              {pricingRules.map((rule) => (
                <div key={rule.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex-1">
                    {editingPriceId === rule.id ? (
                      <div className="grid grid-cols-3 gap-2">
                        <Input
                          defaultValue={rule.from}
                          placeholder="From"
                          id={`from-${rule.id}`}
                        />
                        <Input
                          defaultValue={rule.to}
                          placeholder="To"
                          id={`to-${rule.id}`}
                        />
                        <Input
                          type="number"
                          defaultValue={rule.basePrice}
                          placeholder="Price"
                          id={`price-${rule.id}`}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{rule.from} → {rule.to}</span>
                        <Badge variant="secondary">₦{rule.basePrice.toLocaleString()}</Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {editingPriceId === rule.id ? (
                      <Button
                        size="sm"
                        onClick={() => {
                          const fromInput = document.getElementById(`from-${rule.id}`) as HTMLInputElement;
                          const toInput = document.getElementById(`to-${rule.id}`) as HTMLInputElement;
                          const priceInput = document.getElementById(`price-${rule.id}`) as HTMLInputElement;
                          
                          onUpdatePricing({
                            ...rule,
                            from: fromInput.value,
                            to: toInput.value,
                            basePrice: Number(priceInput.value)
                          });
                          setEditingPriceId(null);
                          toast.success("Pricing rule updated");
                        }}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingPriceId(rule.id)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => {
                        onRemovePricing(rule.id);
                        toast.success("Pricing rule removed");
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationManagement;
