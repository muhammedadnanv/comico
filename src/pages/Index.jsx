import React, { useState } from 'react';
import { Instagram } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Index = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [instagramId, setInstagramId] = useState('');
  const [service, setService] = useState('');
  const [amount, setAmount] = useState(0);

  const handleServiceChange = (value) => {
    setService(value);
    setAmount(value === 'followers' ? 100 : 50);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const upiLink = `upi://pay?pa=adnanmuhammad4393@okicici&pn=Adnan%20Muhammad&am=${amount}.00&cu=INR&tn=Instagram${service}for${instagramId}`;
    window.location.href = upiLink;
    toast.success("Payment initiated. Please complete the transaction in your UPI app.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Instagram className="w-12 h-12 text-[#DD2A7B]" />
          <h1 className="text-3xl font-bold ml-2 text-black">Insta Boost Kerala</h1>
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
              <SelectItem value="followers">Followers Increase</SelectItem>
              <SelectItem value="likes">Post Likes</SelectItem>
            </SelectContent>
          </Select>
          {service && (
            <div className="text-center">
              <p className="text-lg font-semibold">Price: ₹{amount}</p>
            </div>
          )}
          <Button type="submit" className="w-full bg-[#DD2A7B] hover:bg-[#F58529]">
            Pay with UPI
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Index;