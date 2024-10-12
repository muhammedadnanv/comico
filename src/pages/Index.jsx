import React, { useState } from 'react';
import { Instagram, CreditCard, Building, User, Phone, AtSign, Package, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import PaymentForm from '../components/PaymentForm';
import ServiceSelection from '../components/ServiceSelection';

const Index = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [instagramId, setInstagramId] = useState('');
  const [service, setService] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
    <div className="min-h-screen bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Instagram className="w-12 h-12 text-[#DD2A7B]" />
              <h1 className="text-3xl font-bold ml-2 text-black">Comico</h1>
            </div>
            <Button
              onClick={() => navigate('/auth')}
              className="bg-[#DD2A7B] hover:bg-[#F58529]"
            >
              Login / Sign Up
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputWithIcon
              icon={<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <InputWithIcon
              icon={<Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <InputWithIcon
              icon={<AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
              type="text"
              placeholder="Instagram ID"
              value={instagramId}
              onChange={(e) => setInstagramId(e.target.value)}
              required
            />
            <ServiceSelection
              service={service}
              setService={setService}
              setAmount={setAmount}
              setQuantity={setQuantity}
            />
            <PaymentForm
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />
            <Button type="submit" className="w-full bg-[#DD2A7B] hover:bg-[#F58529]">
              {paymentMethod === 'upi' ? 'Pay with UPI' : 'Proceed to Payment'}
            </Button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const InputWithIcon = ({ icon, ...props }) => (
  <div className="relative">
    {icon}
    <Input {...props} className="pl-10" />
  </div>
);

export default Index;
