import React, { useState } from 'react';
import { Instagram, CreditCard, Building } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Index = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [instagramId, setInstagramId] = useState('');
  const [service, setService] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [cardNumber, setCardNumber] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [quantity, setQuantity] = useState(1);

  const services = [
    { value: 'follower1', label: '1 Follower', price: 4, maxQuantity: 7 },
    { value: 'likes40', label: '40 Likes', price: 99, maxQuantity: 10 },
    { value: 'followers50', label: '50 Followers', price: 90, maxQuantity: 5 },
    { value: 'followers65', label: '65 Followers', price: 50, maxQuantity: 3 },
  ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let paymentDetails = '';

    switch (paymentMethod) {
      case 'upi':
        const upiLink = `upi://pay?pa=adnanmuhammad4393@okicici&pn=Adnan%20Muhammad&am=${amount}.00&cu=INR&tn=Comico${service}for${instagramId}`;
        window.location.href = upiLink;
        break;
      case 'debit':
        paymentDetails = `Debit Card: ${cardNumber}`;
        break;
      case 'bank':
        paymentDetails = `Bank Transfer: Account ${bankAccount}, IFSC ${ifsc}`;
        break;
    }

    toast.success(`Payment of ₹${amount} initiated for ${quantity} ${service}. ${paymentDetails}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Instagram className="w-12 h-12 text-[#DD2A7B]" />
          <h1 className="text-3xl font-bold ml-2 text-black">Comico</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <Input
            type="text"
            placeholder="Instagram ID"
            value={instagramId}
            onChange={(e) => setInstagramId(e.target.value)}
            required
          />
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
            <Input
              type="number"
              min="1"
              max={services.find(s => s.value === service).maxQuantity}
              value={quantity}
              onChange={handleQuantityChange}
              placeholder={`Quantity (1-${services.find(s => s.value === service).maxQuantity})`}
            />
          )}
          {service && (
            <div className="text-center">
              <p className="text-lg font-semibold">Price: ₹{amount}</p>
            </div>
          )}
          <RadioGroup defaultValue="upi" onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi">UPI</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="debit" id="debit" />
              <Label htmlFor="debit">Debit Card</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank">Bank Transfer</Label>
            </div>
          </RadioGroup>
          {paymentMethod === 'debit' && (
            <Input
              type="text"
              placeholder="Debit Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          )}
          {paymentMethod === 'bank' && (
            <>
              <Input
                type="text"
                placeholder="Bank Account Number"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="IFSC Code"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                required
              />
            </>
          )}
          <Button type="submit" className="w-full bg-[#DD2A7B] hover:bg-[#F58529]">
            {paymentMethod === 'upi' ? 'Pay with UPI' : 'Proceed to Payment'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;