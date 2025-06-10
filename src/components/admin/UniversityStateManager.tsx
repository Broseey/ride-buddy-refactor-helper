
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, School, MapPin } from "lucide-react";
import { toast } from "sonner";

const UniversityStateManager = () => {
  const [universities, setUniversities] = useState([
    "University of Lagos",
    "University of Ibadan", 
    "Ahmadu Bello University",
    "University of Nigeria, Nsukka",
    "Obafemi Awolowo University",
    "University of Benin",
    "University of Ilorin",
    "Federal University of Technology, Akure",
    "Covenant University",
    "Babcock University"
  ]);

  const [states, setStates] = useState([
    "Lagos", "Ogun", "Oyo", "Osun", "Ondo", "Ekiti",
    "Kaduna", "Kano", "Katsina", "Sokoto", "Kebbi",
    "Enugu", "Anambra", "Imo", "Abia", "Ebonyi",
    "Rivers", "Bayelsa", "Delta", "Cross River", "Akwa Ibom",
    "Benue", "Plateau", "Nasarawa", "Taraba", "Adamawa",
    "Borno", "Yobe", "Gombe", "Bauchi", "Jigawa",
    "Zamfara", "Niger", "Kwara", "Kogi", "FCT"
  ]);

  const [newUniversity, setNewUniversity] = useState("");
  const [newState, setNewState] = useState("");

  const addUniversity = () => {
    if (newUniversity.trim() && !universities.includes(newUniversity.trim())) {
      setUniversities([...universities, newUniversity.trim()]);
      setNewUniversity("");
      toast.success("University added successfully!");
    } else {
      toast.error("University already exists or invalid name");
    }
  };

  const removeUniversity = (university: string) => {
    setUniversities(universities.filter(u => u !== university));
    toast.success("University removed successfully!");
  };

  const addState = () => {
    if (newState.trim() && !states.includes(newState.trim())) {
      setStates([...states, newState.trim()]);
      setNewState("");
      toast.success("State added successfully!");
    } else {
      toast.error("State already exists or invalid name");
    }
  };

  const removeState = (state: string) => {
    setStates(states.filter(s => s !== state));
    toast.success("State removed successfully!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Universities Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <School className="h-5 w-5" />
            Universities ({universities.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="newUniversity">Add New University</Label>
              <Input
                id="newUniversity"
                placeholder="Enter university name"
                value={newUniversity}
                onChange={(e) => setNewUniversity(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addUniversity()}
              />
            </div>
            <Button onClick={addUniversity} className="self-end">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {universities.map((university, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                <span className="text-sm">{university}</span>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeUniversity(university)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* States Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            States ({states.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="newState">Add New State</Label>
              <Input
                id="newState"
                placeholder="Enter state name"
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addState()}
              />
            </div>
            <Button onClick={addState} className="self-end">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <div className="flex flex-wrap gap-2">
              {states.map((state, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {state}
                  <button
                    onClick={() => removeState(state)}
                    className="ml-1 hover:bg-red-500 hover:text-white rounded-full p-0.5"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UniversityStateManager;
