
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Receipt } from '@/hooks/useReceipts';

interface ReceiptGeneratorProps {
  receipt: Receipt;
  onDownload: () => void;
}

const ReceiptGenerator: React.FC<ReceiptGeneratorProps> = ({ receipt, onDownload }) => {
  const handleDownload = () => {
    const receiptContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Uniride Receipt</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 20px; }
            .details { margin: 20px 0; }
            .row { display: flex; justify-content: space-between; margin: 10px 0; }
            .total { border-top: 2px solid #000; padding-top: 10px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>UNIRIDE</h1>
            <p>Campus Transportation Service</p>
            <p>Receipt #${receipt.receipt_number}</p>
          </div>
          
          <div class="details">
            <div class="row">
              <span>Date:</span>
              <span>${new Date(receipt.generated_at).toLocaleDateString()}</span>
            </div>
            <div class="row">
              <span>Route:</span>
              <span>${receipt.rides?.from_location} → ${receipt.rides?.to_location}</span>
            </div>
            <div class="row">
              <span>Travel Date:</span>
              <span>${receipt.rides?.departure_date} at ${receipt.rides?.departure_time}</span>
            </div>
            <div class="row">
              <span>Payment Method:</span>
              <span>${receipt.payment_method || 'Card'}</span>
            </div>
          </div>

          <div class="details">
            <div class="row">
              <span>Subtotal:</span>
              <span>₦${receipt.amount.toFixed(2)}</span>
            </div>
            <div class="row">
              <span>VAT (7.5%):</span>
              <span>₦${receipt.tax_amount.toFixed(2)}</span>
            </div>
            <div class="row total">
              <span>Total:</span>
              <span>₦${receipt.total_amount.toFixed(2)}</span>
            </div>
          </div>

          <div style="text-align: center; margin-top: 40px; color: #666;">
            <p>Thank you for choosing Uniride!</p>
            <p>Safe travels!</p>
          </div>
        </body>
      </html>
    `;

    const blob = new Blob([receiptContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uniride-receipt-${receipt.receipt_number}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    onDownload();
  };

  return (
    <Button
      onClick={handleDownload}
      size="sm"
      variant="outline"
      className="flex items-center gap-2"
    >
      <Download className="h-4 w-4" />
      Download Receipt
    </Button>
  );
};

export default ReceiptGenerator;
