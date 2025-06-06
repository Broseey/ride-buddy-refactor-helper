
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { MapPin, ArrowRight, ArrowLeft, University, Flag, X } from "lucide-react";
import { nigerianCities } from "@/utils/coordinateUtils";

// Extended location suggestions that include schools, landmarks, streets
const locationSuggestions: Record<string, string[]> = {
  "Lagos": [
    "University of Lagos (UNILAG)",
    "Lagos State University (LASU)",
    "Yaba College of Technology",
    "Victoria Island",
    "Ikoyi",
    "Surulere",
    "Ikeja",
    "Lekki",
    "Ajah",
    "Gbagada",
    "Maryland",
    "Apapa",
    "Mushin",
    "Agege",
    "Alaba Market",
    "Computer Village",
    "National Theatre",
    "Tafawa Balewa Square",
    "Lagos Island",
    "Marina",
    "CMS",
    "Oshodi",
    "Mile 2",
    "Festac Town",
    "Satellite Town"
  ],
  "Ogun": [
    "Covenant University, Ota",
    "Federal University of Agriculture, Abeokuta",
    "Moshood Abiola Polytechnic",
    "Abeokuta",
    "Sagamu",
    "Ijebu-Ode",
    "Ota",
    "Sango Ota",
    "Ifo",
    "Ilaro",
    "Ayetoro",
    "Egbado",
    "Ipokia",
    "Remo",
    "Ewekoro",
    "Obafemi Owode"
  ],
  "Oyo": [
    "University of Ibadan (UI)",
    "Lead City University, Ibadan",
    "Polytechnic Ibadan",
    "Ibadan",
    "Ogbomoso",
    "Iseyin",
    "Oyo Town",
    "Saki",
    "Igboho",
    "Eruwa",
    "Lalupon",
    "Moniya",
    "Bodija",
    "Ring Road",
    "Challenge",
    "Dugbe",
    "UI Post Office",
    "Ojoo",
    "New Garage",
    "Gate"
  ],
  "FCT - Abuja": [
    "University of Abuja",
    "Federal University of Technology, Minna",
    "Gwagwalada",
    "Kuje",
    "Kubwa",
    "Nyanya",
    "Mararaba",
    "Suleja",
    "Lugbe",
    "Gwarinpa",
    "Life Camp",
    "Wuse",
    "Garki",
    "Asokoro",
    "Maitama",
    "Central Business District",
    "Jahi",
    "Utako",
    "Berger",
    "Karu"
  ],
  "Rivers": [
    "University of Port Harcourt (UNIPORT)",
    "Rivers State University",
    "Port Harcourt",
    "Choba",
    "Alakahia",
    "Mile 3",
    "Mile 4",
    "Rumukrushi",
    "Rumokoro",
    "Eliozu",
    "Oyigbo",
    "Obio/Akpor",
    "Ikwerre",
    "Trans Amadi",
    "GRA Phase 1",
    "GRA Phase 2",
    "Diobu",
    "Creek Road",
    "Aba Road"
  ],
  "Kaduna": [
    "Ahmadu Bello University, Zaria",
    "Kaduna State University",
    "Kaduna Polytechnic",
    "Kaduna",
    "Zaria",
    "Kafanchan",
    "Kachia",
    "Sabon Gari",
    "Tudun Wada",
    "Barnawa",
    "Ungwan Rimi",
    "Malali",
    "Narayi",
    "Junction",
    "Television"
  ]
};

interface LocationSearchNewProps {
  type: "from" | "to";
  value: string;
  onChange: (value: string) => void;
  otherLocationType?: "university" | "state" | null;
}

const LocationSearchNew = ({ type, value, onChange, otherLocationType }: LocationSearchNewProps) => {
  const [locationType, setLocationType] = useState<"university" | "state">(
    otherLocationType ? (otherLocationType === "university" ? "state" : "university") : "university"
  );
  const [selectedState, setSelectedState] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const states = [
    "Lagos", "Ogun", "Oyo", "FCT - Abuja", "Rivers", "Kaduna", "Kano", "Plateau",
    "Delta", "Edo", "Cross River", "Akwa Ibom", "Enugu", "Anambra", "Imo", "Abia"
  ];

  // Effect to ensure the location types are complementary
  useEffect(() => {
    if (otherLocationType) {
      setLocationType(otherLocationType === "university" ? "state" : "university");
    }
  }, [otherLocationType]);

  // Update suggestions based on search query and selected state
  useEffect(() => {
    if (locationType === "state" && searchQuery.length > 1) {
      if (selectedState && locationSuggestions[selectedState]) {
        const filtered = locationSuggestions[selectedState].filter(location =>
          location.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 8));
      } else {
        // Search across all locations if no state selected
        const allSuggestions: string[] = [];
        Object.values(locationSuggestions).forEach(stateSuggestions => {
          const filtered = stateSuggestions.filter(location =>
            location.toLowerCase().includes(searchQuery.toLowerCase())
          );
          allSuggestions.push(...filtered);
        });
        setSuggestions(allSuggestions.slice(0, 8));
      }
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, selectedState, locationType]);

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    onChange(suggestion);
    setShowSuggestions(false);
  };

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    if (locationType === "state") {
      setSearchQuery("");
      onChange("");
    } else {
      onChange(state);
    }
  };

  const clearSelection = () => {
    setSearchQuery("");
    setSelectedState("");
    onChange("");
    setShowSuggestions(false);
  };
  
  return (
    <div className="relative space-y-3">
      <div className="flex items-center space-x-2">
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${type === "from" ? "bg-black" : "bg-gray-800"}`}>
          {type === "from" ? (
            <ArrowRight className="h-4 w-4 text-white" />
          ) : (
            <ArrowLeft className="h-4 w-4 text-gray-300" />
          )}
        </div>
        
        <div className="flex-1">
          <label htmlFor={`location-${type}`} className="block text-sm font-medium text-gray-900 mb-1">
            {type === "from" ? "Departing From" : "Going To"}
          </label>
          
          <div className="flex items-center gap-2 mb-2">
            <Button 
              variant={locationType === "university" ? undefined : "outline"} 
              size="sm"
              onClick={() => {
                if (otherLocationType !== "university") {
                  setLocationType("university");
                  clearSelection();
                }
              }}
              disabled={otherLocationType === "university"}
              className={`${locationType === "university" ? "bg-black text-white border-black" : "bg-white text-black border-black"} h-8 px-3 py-1 border rounded-full hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <University className={`h-4 w-4 mr-1 ${locationType === "university" ? "text-white" : "text-black"}`} />
              University
            </Button>
            <Button 
              variant={locationType === "state" ? undefined : "outline"} 
              size="sm"
              onClick={() => {
                if (otherLocationType !== "state") {
                  setLocationType("state");
                  clearSelection();
                }
              }}
              disabled={otherLocationType === "state"}
              className={`${locationType === "state" ? "bg-black text-white border-black" : "bg-white text-black border-black"} h-8 px-3 py-1 border rounded-full hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <Flag className={`h-4 w-4 mr-1 ${locationType === "state" ? "text-white" : "text-black"}`} />
              State
            </Button>
          </div>
          
          {locationType === "university" ? (
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger id={`location-${type}`} className="w-full">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-600" />
                  <SelectValue placeholder="Select university" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="University of Lagos">University of Lagos</SelectItem>
                <SelectItem value="University of Ibadan">University of Ibadan</SelectItem>
                <SelectItem value="Ahmadu Bello University">Ahmadu Bello University</SelectItem>
                <SelectItem value="University of Nigeria, Nsukka">University of Nigeria, Nsukka</SelectItem>
                <SelectItem value="Obafemi Awolowo University">Obafemi Awolowo University</SelectItem>
                <SelectItem value="University of Benin">University of Benin</SelectItem>
                <SelectItem value="University of Port Harcourt">University of Port Harcourt</SelectItem>
                <SelectItem value="University of Ilorin">University of Ilorin</SelectItem>
                <SelectItem value="Covenant University, Ota">Covenant University, Ota</SelectItem>
                <SelectItem value="Babcock University, Ilishan-Remo">Babcock University, Ilishan-Remo</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <div className="space-y-2">
              <Select value={selectedState} onValueChange={handleStateSelect}>
                <SelectTrigger className="w-full">
                  <div className="flex items-center">
                    <Flag className="h-4 w-4 mr-2 text-gray-600" />
                    <SelectValue placeholder="Select state first" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {selectedState && (
                <div className="relative">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder={`Search locations in ${selectedState}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full pl-10"
                  />
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center"
                        >
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {(value || searchQuery) && (
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 text-xs flex items-center"
            onClick={clearSelection}
          >
            <X className="h-3 w-3 mr-1" />
            Clear
          </Button>
        </div>
      )}
    </div>
  );
};

export default LocationSearchNew;
