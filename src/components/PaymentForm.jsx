import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard, Building } from 'lucide-react';

const PaymentForm = ({ paymentMethod, setPaymentMethod }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [ifsc, setIfsc] = useState('');

  return (
    <>
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
        <div className="relative">
          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Debit Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            className="pl-10"
          />
        </div>
      )}
      {paymentMethod === 'bank' && (
        <>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Bank Account Number"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value)}
              required
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="IFSC Code"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
              required
              className="pl-10"
            />
          </div>
        </>
      )}
    </>
  );
};

export default PaymentForm;