
import React from 'react';
import { X, Smartphone, CreditCard, ShieldCheck } from 'lucide-react';
import { User, CreatorSubRole } from '../types';

interface PaymentModalProps {
  user: User;
  onClose: () => void;
  onPaid: (updatedUser: User) => void;
}

const SUB_ROLE_FEES: Record<CreatorSubRole, number> = {
  'DJ': 5000,
  'VJ': 10000,
  'Producer': 8000,
  'Music Artist': 3000
};

const PaymentModal: React.FC<PaymentModalProps> = ({ user, onClose, onPaid }) => {
  const isCreatorPending = user.role === 'creator' && !user.subscriptionActive;
  const currentFee = user.subRole ? SUB_ROLE_FEES[user.subRole] : 0;

  const handlePayment = () => {
    // Simulate payment success
    const updatedUser = { 
      ...user, 
      subscriptionActive: true,
      balance: user.balance + 0, // In real app, we'd deduct or check balance
      nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };
    onPaid(updatedUser);
    localStorage.setItem('luohub_user', JSON.stringify(updatedUser));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#0a1120] border border-white/10 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="relative p-8">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
          
          <div className="mb-8">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-1">
              {isCreatorPending ? 'Activate' : 'Refill'} Your <span className="text-blue-600">Wallet</span>
            </h2>
            <p className="text-gray-400 text-sm italic">
              {isCreatorPending 
                ? `Pay UGX ${currentFee.toLocaleString()} to activate your ${user.subRole} account.` 
                : 'Top up your balance for premium content.'}
            </p>
          </div>
          
          <div className="space-y-4">
            <PaymentButton 
              onClick={handlePayment}
              label="MTN Mobile Money" 
              sub="UGX Payments • MTN UG" 
              color="bg-yellow-400 text-black hover:bg-yellow-500"
              icon={<Smartphone />}
            />
            <PaymentButton 
              onClick={handlePayment}
              label="Airtel Money" 
              sub="UGX Payments • Airtel UG" 
              color="bg-red-600 text-white hover:bg-red-700"
              icon={<Smartphone />}
            />
            <PaymentButton 
              onClick={handlePayment}
              label="PayPal" 
              sub="International • USD" 
              color="bg-[#003087] text-white hover:bg-[#002060]"
              icon={<CreditCard />}
            />
          </div>
          
          {user.role === 'creator' && (
            <div className="mt-8 p-6 rounded-2xl bg-blue-600/10 border border-blue-600/20">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-black text-blue-600 uppercase tracking-widest">Subscription: {user.subRole}</p>
                <ShieldCheck size={16} className="text-blue-600" />
              </div>
              <p className="text-2xl font-black">UGX {currentFee.toLocaleString()}<span className="text-xs font-light text-gray-500">/monthly</span></p>
              <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-tighter font-bold">Automatic freeze if not settled by renewal date.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const PaymentButton = ({ label, sub, color, icon, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-5 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg ${color}`}
  >
    <div className="bg-white/20 p-2 rounded-lg">
      {icon}
    </div>
    <div className="text-left">
      <p className="font-black uppercase text-sm tracking-tighter">{label}</p>
      <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">{sub}</p>
    </div>
  </button>
);

export default PaymentModal;
