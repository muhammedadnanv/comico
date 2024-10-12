import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Package, DollarSign } from 'lucide-react';

const services = [
  { value: 'follower1', label: '1 Follower', price: 4, maxQuantity: 7 },
  { value: 'likes40', label: '40 Likes', price: 99, maxQuantity: 10 },
  { value: 'followers50', label: '50 Followers', price: 90, maxQuantity: 5 },
  { value: 'followers65', label: '65 Followers', price: 50, maxQuantity: 3 },
];

const ServiceSelection = ({ service, setService, setAmount, setQuantity }) => {
  const handleServiceChange = (value) => {
    setService(value);
    const selectedService = services.find(s => s.value === value);
    if (selectedService) {
      setAmount(selectedService.price);
      setQuantity(1);
    } else {
      setAmount(0);
      setQuantity(1);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    const selectedService = services.find(s => s.value === service);
    if (selectedService && newQuantity >= 1 && newQuantity <= selectedService.maxQuantity) {
      setQuantity(newQuantity);
      setAmount(selectedService.price * newQuantity);
    }
  };

  return (
    <>
      <Select onValueChange={handleServiceChange} required>
        <SelectTrigger>
          <SelectValue placeholder="Select Service" />
        </SelectTrigger>
        <SelectContent>
          {services.map((service) => (
            <SelectItem key={service.value} value={service.value}>
              {service.label} - ₹{service.price}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {service && (
        <div className="relative">
          <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="number"
            min="1"
            max={services.find(s => s.value === service).maxQuantity}
            onChange={handleQuantityChange}
            placeholder={`Quantity (1-${services.find(s => s.value === service).maxQuantity})`}
            className="pl-10"
          />
        </div>
      )}
      {service && (
        <div className="text-center flex items-center justify-center">
          <DollarSign className="mr-2 text-[#DD2A7B]" />
          <p className="text-lg font-semibold">Price: ₹{services.find(s => s.value === service).price}</p>
        </div>
      )}
    </>
  );
};

export default ServiceSelection;